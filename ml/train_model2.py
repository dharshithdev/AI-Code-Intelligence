import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_predict
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score, recall_score, f1_score, confusion_matrix

df = pd.read_csv("data/baseline.csv")

X = df.drop(["SHA", "defect"], axis=1)
y = df["defect"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = RandomForestClassifier(
    class_weight="balanced",
    random_state=42
)

param_grid = {
    "n_estimators": [100, 200, 300],
    "max_depth": [None, 10, 20],
    "min_samples_split": [2, 5, 10]
}

grid_search = GridSearchCV(
    model,
    param_grid,
    scoring="f1",
    cv=5,
    n_jobs=-1
)

grid_search.fit(X_train, y_train)

model = grid_search.best_estimator_

cv_probabilities = cross_val_predict(
    model,
    X_train,
    y_train,
    cv=5,
    method="predict_proba",
    n_jobs=-1
)[:, 1]

best_threshold = 0
best_f1 = 0

for threshold in np.arange(0.1, 0.91, 0.05):
    cv_pred = cv_probabilities >= threshold
    f1 = f1_score(y_train, cv_pred)

    print(f"Threshold: {threshold:.2f} | F1: {f1:.3f}")

    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold

print("\nBest CV threshold:", best_threshold)
print("Best CV F1:", best_f1)

model.fit(X_train, y_train)

test_probabilities = model.predict_proba(X_test)[:, 1]
test_pred = test_probabilities >= best_threshold

print("\nFinal Test Precision:", precision_score(y_test, test_pred))
print("Final Test Recall:", recall_score(y_test, test_pred))
print("Final Test F1:", f1_score(y_test, test_pred))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, test_pred))

feature_importance = pd.Series(
    model.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print("\nFeature Importance:")
print(feature_importance)
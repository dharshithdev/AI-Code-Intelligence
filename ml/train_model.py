import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import precision_score, recall_score, f1_score, confusion_matrix
import numpy as np
from sklearn.model_selection import cross_val_predict

df = pd.read_csv("data/kc1.csv")

X = df.drop("defects", axis=1)
y = df["defects"]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

model = Pipeline([
    ("classifier", RandomForestClassifier(
        class_weight="balanced",
        random_state=42
    ))
])

param_grid = {
    "classifier__n_estimators": [100, 200, 300],
    "classifier__max_depth": [None, 5, 10],
    "classifier__min_samples_split": [2, 5, 10]
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

probabilities = model.predict_proba(X_test)[:, 1]

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

    if f1 > best_f1:
        best_f1 = f1
        best_threshold = threshold

print("\nBest CV threshold:", best_threshold)
print("Best CV F1:", best_f1)

test_probabilities = model.predict_proba(X_test)[:, 1]

y_pred = test_probabilities >= best_threshold

test_precision = precision_score(y_test, y_pred)
test_recall = recall_score(y_test, y_pred)
test_f1 = f1_score(y_test, y_pred)

print("\nFinal Test Precision:", test_precision)
print("Final Test Recall:", test_recall)
print("Final Test F1:", test_f1)

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
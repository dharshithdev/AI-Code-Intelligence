import pandas as pd
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import precision_score, recall_score, f1_score, confusion_matrix

df = pd.read_csv("data/baseline.csv")

df["nosi_is_zero"] = (df["nosi"] == 0).astype(int)

X = df.drop(["defect", "SHA"], axis=1)
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
    "n_estimators": [200, 300],
    "max_depth": [8, 10, None],
    "min_samples_split": [5, 10]
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

predictions = model.predict(X_test)

print("Best parameters:")
print(grid_search.best_params_)

print("\nPrecision:", precision_score(y_test, predictions))
print("Recall:", recall_score(y_test, predictions))
print("F1 Score:", f1_score(y_test, predictions))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, predictions))

print("\nFeature Importance:")
importance = pd.Series(
    model.feature_importances_,
    index=X.columns
).sort_values(ascending=False)

print(importance)

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import cross_val_score

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

#print("Training features:", X_train.shape)
#print("Testing features:", X_test.shape)
#print("Training target:", y_train.shape)
#print("Testing target:", y_test.shape)

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

cv_scores = cross_val_score(
    model,
    X_train,
    y_train,
    cv=5,
    scoring="f1"
)

print("\nCross-validation F1 scores:")
print(cv_scores)

print("\nMean CV F1:", cv_scores.mean())

print("\nBest parameters:")
print(grid_search.best_params_)

y_pred = model.predict(X_test)

print("\nPrecision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
print("F1 Score:", f1_score(y_test, y_pred))

cm = confusion_matrix(y_test, y_pred)

print("\nConfusion Matrix:")
print(cm)
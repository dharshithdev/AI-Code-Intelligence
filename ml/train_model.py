import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from xgboost import XGBClassifier
from sklearn.model_selection import GridSearchCV
from sklearn.feature_selection import SelectFromModel


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

selector_model = RandomForestClassifier(
    n_estimators=200,
    class_weight="balanced",
    random_state=42
)

selector_model.fit(X_train, y_train)

selector = SelectFromModel(
    selector_model,
    threshold="mean",
    prefit=True
)

X_train_selected = selector.transform(X_train)
X_test_selected = selector.transform(X_test)

print("Original features:", X_train.shape[1])
print("Selected features:", X_train_selected.shape[1])

model = RandomForestClassifier(
    n_estimators=200,
    class_weight="balanced",
    random_state=42
)

model.fit(X_train_selected, y_train)

y_pred = model.predict(X_test_selected)

precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)

print("\nPrecision:", precision)
print("Recall:", recall)
print("F1 Score:", f1)

cm = confusion_matrix(y_test, y_pred)

print("\nConfusion Matrix:")
print(cm)
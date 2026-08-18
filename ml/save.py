import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("data/baseline.csv")

X = df.drop(["defect", "SHA"], axis=1)
y = df["defect"]

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=10,
    min_samples_split=10,
    class_weight="balanced",
    random_state=42
)

model.fit(X, y)

joblib.dump(model, "defect_model.pkl")

print("Final model trained successfully.")
print("Model saved as defect_model.pkl")
print("Features:", list(X.columns))

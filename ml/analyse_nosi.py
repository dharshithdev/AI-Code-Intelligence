import pandas as pd

df = pd.read_csv("data/baseline.csv")

defective = df[df["defect"] == 1]["nosi"]
non_defective = df[df["defect"] == 0]["nosi"]

print("NOSI statistics:")
print("\nDefective code:")
print(defective.describe())

print("\nNon-defective code:")
print(non_defective.describe())

print("\nAverage NOSI:")
print("Defective:", defective.mean())
print("Non-defective:", non_defective.mean())

print("\nMedian NOSI:")
print("Defective:", defective.median())
print("Non-defective:", non_defective.median())

print("\nNOSI value distribution:")
print(df.groupby("nosi")["defect"].agg(["count", "mean"]).head(30))

import pandas as pd

df = pd.read_csv("data/baseline.csv")

nosi_zero = df[df["nosi"] == 0]
nosi_nonzero = df[df["nosi"] > 0]

print("NOSI = 0")
print("Rows:", len(nosi_zero))
print(nosi_zero["defect"].value_counts())
print("Defect rate:", nosi_zero["defect"].mean())

print("\nNOSI > 0")
print("Rows:", len(nosi_nonzero))
print(nosi_nonzero["defect"].value_counts())
print("Defect rate:", nosi_nonzero["defect"].mean())

print("\nAverage metrics for NOSI = 0:")
print(nosi_zero.drop(columns=["SHA", "defect"]).mean())

print("\nAverage metrics for NOSI > 0:")
print(nosi_nonzero.drop(columns=["SHA", "defect"]).mean())

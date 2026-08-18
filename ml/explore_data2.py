import pandas as pd

df = pd.read_csv("data/baseline.csv")

print("Shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nFirst 5 rows:")
print(df.head())

print("\nMissing values:")
print(df.isnull().sum())

print("\nLabel distribution:")
print(df["defect"].value_counts())


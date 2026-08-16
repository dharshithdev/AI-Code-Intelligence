import pandas as pd

df = pd.read_csv("data/kc1.csv")

print(df.head())
print("\nShape:")
print(df.shape)

print("\nColumns:")
print(df.columns.tolist())
print(df.head())
print(df.shape)
print(df.columns)
import pandas as pd

df = pd.read_csv("data/kc1.csv")

print('Head : ', df.head())
print('Shape : ', df.shape)
print('Columns : ', df.columns.tolist())
print('Columns : ', df.columns)
print("\nMissing values:")
print(df.isnull().sum())

print("\nDefect distribution:")
print(df["defects"].value_counts())

print("\nStatistics:")
print(df.describe())
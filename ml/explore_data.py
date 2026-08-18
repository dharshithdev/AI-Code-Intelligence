import pandas as pd

df = pd.read_csv("data/kc1.csv")

features = df.drop("defects", axis=1)

groups = (
    df.groupby(list(features.columns))["defects"]
    .agg(["count", "nunique"])
)

conflicting = groups[groups["nunique"] > 1]

print("Conflicting feature groups:", len(conflicting))

print("Rows involved in conflicts:", conflicting["count"].sum())

print("Total rows:", len(df))

percentage = (conflicting["count"].sum() / len(df)) * 100

print("Percentage of rows involved in conflicts:", percentage)
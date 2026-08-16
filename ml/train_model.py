import pandas as pd

df = pd.read_csv("data/kc1.csv")

X = df.drop("defects", axis=1)
y = df["defects"]

print("Features:")
print(X.shape)

print("\nTarget:")
print(y.shape)
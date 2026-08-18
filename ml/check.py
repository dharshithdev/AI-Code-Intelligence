import pandas as pd

df = pd.read_csv("data/baseline.csv")

result = (
    df.groupby("nosi")["defect"]
    .agg(["count", "sum", "mean"])
    .reset_index()
)

result["defect_percentage"] = result["mean"] * 100

print(result.to_string(index=False))

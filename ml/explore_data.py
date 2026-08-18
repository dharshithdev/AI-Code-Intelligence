import pandas as pd

df = pd.read_csv("data/kc1.csv")
'''
print('Head : ', df.head())
print('Shape : ', df.shape)
print('Columns : ', df.columns.tolist())
print('Columns : ', df.columns)
print("\nMissing values:")
print(df.isnull().sum())
'''
print("\nDuplicate rows:")
print(df.duplicated().sum())

print("\nDuplicate feature rows:")
print(df.drop("defects", axis=1).duplicated().sum())

feature_columns = df.drop("defects", axis=1).columns

conflicting_groups = (
    df.groupby(list(feature_columns))["defects"]
    .nunique()
)

print("\nConflicting feature groups:")
print((conflicting_groups > 1).sum())

#print("\nFeature correlations:")
#print(df.drop("defects", axis=1).corr().round(2))

print("\nCorrelation with defects:")
print(
    df.corr(numeric_only=True)["defects"]
    .sort_values(ascending=False)
)
'''
print("\nDefect distribution:")
print(df["defects"].value_counts())


print("\nStatistics:")
print(df.describe()) '''
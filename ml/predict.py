import sys
import joblib
import pandas as pd
from extract import extract_metrics

if len(sys.argv) != 2:
    print("Usage: python predict.py <cpp_file>")
    sys.exit(1)

file_path = sys.argv[1]

try:
    with open(file_path, "r", encoding="utf-8") as file:
        code = file.read()
except FileNotFoundError:
    print(f"File not found: {file_path}")
    sys.exit(1)

model = joblib.load("defect_model.pkl")

metrics = extract_metrics(code)

features = [
    "cbo", "wmc", "dit", "rfc", "lcom",
    "totalMethods", "totalFields", "nosi", "loc",
    "returnQty", "loopQty", "comparisonsQty", "tryCatchQty",
    "parenthesizedExpsQty", "stringLiteralsQty", "numbersQty",
    "assignmentsQty", "mathOperationsQty", "variablesQty",
    "maxNestedBlocks", "uniqueWordsQty"
]

input_data = pd.DataFrame([[metrics[feature] for feature in features]], columns=features)

probability = model.predict_proba(input_data)[0][1]

if probability >= 0.45:
    prediction = "DEFECTIVE"
else:
    prediction = "NON-DEFECTIVE"

print(f"Defect Probability: {probability * 100:.2f}%")
print(f"Prediction: {prediction}")
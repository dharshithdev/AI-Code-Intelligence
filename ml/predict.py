import joblib
import pandas as pd

model = joblib.load("defect_model.pkl")

sample = pd.DataFrame([{
    "cbo": 20,
    "wmc": 50,
    "dit": 2,
    "rfc": 60,
    "lcom": 500,
    "totalMethods": 25,
    "totalFields": 10,
    "nosi": 5,
    "loc": 200,
    "returnQty": 10,
    "loopQty": 3,
    "comparisonsQty": 8,
    "tryCatchQty": 1,
    "parenthesizedExpsQty": 5,
    "stringLiteralsQty": 15,
    "numbersQty": 10,
    "assignmentsQty": 25,
    "mathOperationsQty": 8,
    "variablesQty": 30,
    "maxNestedBlocks": 3,
    "uniqueWordsQty": 100
}])

probability = model.predict_proba(sample)[0][1]

threshold = 0.45

prediction = probability >= threshold

print("Defect Probability:", round(probability * 100, 2), "%")

if prediction:
    print("Prediction: DEFECTIVE")
else:
    print("Prediction: NON-DEFECTIVE")

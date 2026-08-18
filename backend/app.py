from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os
import joblib
import pandas as pd

ML_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "ml"))
sys.path.insert(0, ML_FOLDER)

from extract import extract_metrics

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(ML_FOLDER, "defect_model.pkl")

model = joblib.load(MODEL_PATH)

FEATURES = [
    "cbo", "wmc", "dit", "rfc", "lcom",
    "totalMethods", "totalFields", "nosi", "loc",
    "returnQty", "loopQty", "comparisonsQty",
    "tryCatchQty", "parenthesizedExpsQty",
    "stringLiteralsQty", "numbersQty",
    "assignmentsQty", "mathOperationsQty",
    "variablesQty", "maxNestedBlocks",
    "uniqueWordsQty"
]

@app.route("/")
def home():
    return "AI Code Intelligence API is running!"

@app.route("/analyze", methods=["POST"])
def analyze():
    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    if not file.filename.endswith((".cpp", ".cc", ".cxx")):
        return jsonify({"error": "Only C++ files are supported"}), 400

    code = file.read().decode("utf-8")

    metrics = extract_metrics(code)

    input_data = pd.DataFrame(
        [[metrics[feature] for feature in FEATURES]],
        columns=FEATURES
    )

    probability = model.predict_proba(input_data)[0][1]

    prediction = (
        "DEFECTIVE"
        if probability >= 0.45
        else "NON-DEFECTIVE"
    )

    return jsonify({
        "filename": file.filename,
        "probability": round(probability * 100, 2),
        "prediction": prediction,
        "metrics": metrics
    })

if __name__ == "__main__":
    app.run()
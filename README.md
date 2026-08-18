# AI Code Intelligence

AI Code Intelligence is a machine-learning-based web application that analyzes C++ source code and predicts whether the code is likely to contain defects.

The application extracts software engineering metrics from uploaded C++ source files using Tree-sitter and passes those metrics to a trained Random Forest classification model.

## Features

* Upload C++ source files through a web interface
* Parse C++ code using Tree-sitter
* Extract 21 software metrics
* Predict defect probability using a trained ML model
* Display `DEFECTIVE` or `NON-DEFECTIVE` prediction
* Display extracted code metrics
* REST API built with Flask
* CORS-enabled frontend/backend communication
* Deployed frontend and backend

## Architecture

```text
                User
                 │
                 ▼
        Vercel Frontend
        HTML / CSS / JS
                 │
                 │ POST /analyze
                 ▼
         Render Backend
            Flask API
                 │
                 ▼
          Tree-sitter C++
                 │
                 ▼
        Metric Extraction
                 │
                 ▼
       Random Forest Model
        defect_model.pkl
                 │
                 ▼
      Prediction + Probability
                 │
                 ▼
         Frontend Results
```

## Machine Learning Pipeline

```text
C++ Source Code
       ↓
Tree-sitter Parser
       ↓
21 Software Metrics
       ↓
Random Forest Classifier
       ↓
Defect Probability
       ↓
Prediction
```

The model was trained using a dataset containing C++ code metrics and defect labels.

The final model uses the following features:

```text
cbo
wmc
dit
rfc
lcom
totalMethods
totalFields
nosi
loc
returnQty
loopQty
comparisonsQty
tryCatchQty
parenthesizedExpsQty
stringLiteralsQty
numbersQty
assignmentsQty
mathOperationsQty
variablesQty
maxNestedBlocks
uniqueWordsQty
```

## Model

The final classifier is a Random Forest model.

During experimentation, model hyperparameters and the classification threshold were tuned to improve F1 score.

The selected prediction threshold is:

```text
0.45
```

The model achieved an F1 score of approximately:

```text
0.77
```

on the final test evaluation.

The trained model is stored as:

```text
ml/defect_model.pkl
```

## Code Metrics

The application extracts metrics such as:

| Metric            | Description                               |
| ----------------- | ----------------------------------------- |
| LOC               | Lines of code                             |
| WMC               | Weighted methods per class                |
| DIT               | Depth of inheritance                      |
| RFC               | Response for a class                      |
| CBO               | Coupling between objects                  |
| LCOM              | Lack of cohesion                          |
| NOSI              | Number of statements/operations indicator |
| Total Methods     | Number of functions/methods               |
| Total Fields      | Number of fields                          |
| Loops             | Number of loops                           |
| Comparisons       | Number of conditional statements          |
| Return Qty        | Number of return statements               |
| Assignments       | Number of assignments                     |
| Variables         | Number of identifiers                     |
| Unique Words      | Number of unique identifiers              |
| Max Nested Blocks | Maximum syntax-tree nesting depth         |

## Project Structure

```text
AI-Code-Intelligence/
│
├── ml/
│   ├── defect_model.pkl
│   ├── extract.py
│   ├── train_model2.py
│   ├── train_nosi.py
│   ├── analyse_nosi.py
│   ├── save_model.py
│   ├── predict.py
│   └── ...
│
├── backend/
│   └── app.py
│
├── frontend/
│   └── index.html
│
├── requirements.txt
└── .gitignore
```

## Backend API

The backend is built using Flask.

### Analyze Code

```text
POST /analyze
```

The endpoint accepts a C++ source file using multipart form data.

Example request:

```text
file = test.cpp
```

Example response:

```json
{
  "filename": "test.cpp",
  "probability": 34.41,
  "prediction": "NON-DEFECTIVE",
  "metrics": {
    "loc": 13,
    "totalMethods": 1,
    "loopQty": 1
  }
}
```

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/dharshithdev/AI-Code-Intelligence.git
cd AI-Code-Intelligence
```

### 2. Create the Python environment

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Start the Flask backend

```bash
cd backend
python app.py
```

The API will run locally on:

```text
http://127.0.0.1:5000
```

### 5. Open the frontend

Open `frontend/index.html` using a local development server.

The frontend sends uploaded files to the Flask `/analyze` endpoint.

## Deployment

### Frontend

The frontend is deployed using Vercel.

```text
Frontend → Vercel
```

### Backend

The Flask API and ML model are deployed using Render.

```text
Backend + ML Model → Render
```

The frontend communicates with the deployed Flask API through the `/analyze` endpoint.

## Technologies Used

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib
* Random Forest

### Code Analysis

* Tree-sitter
* tree-sitter-cpp

### Backend

* Flask
* Flask-CORS
* Gunicorn

### Frontend

* HTML
* CSS
* JavaScript

### Deployment

* GitHub
* Vercel
* Render

## Limitations

* The current model is trained specifically for C++ code.
* Predictions are based on software metrics extracted from the source code.
* A defect probability is a machine-learning prediction, not a guarantee that the code contains or does not contain a real defect.
* Model performance depends on the quality and characteristics of the training dataset.

## Future Improvements

Possible future improvements include:

* Support for additional programming languages
* More advanced software metrics
* Larger and more diverse training datasets
* Explainable ML predictions
* Code-level defect explanations
* Visualization of code quality metrics
* Improved model calibration

## License

This project is intended for educational and portfolio purposes.

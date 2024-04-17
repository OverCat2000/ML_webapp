from flask import Flask, request, jsonify, current_app
from flask_cors import CORS
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.preprocessing import OneHotEncoder
import joblib

model = joblib.load("forest_cla.pkl")


app = Flask(__name__)
CORS(app)

print("hello")


@app.route("/predict", methods=["POST"])
def predict():
    # data = request.form.get('predictor1')
    data = request.json

    BounceRates = float(data["BounceRates"])
    ExitRates = float(data["ExitRates"])
    PageValues = float(data["PageValues"])
    Administrative_Duration_Page = float(data["Administrative_Duration_Page"])
    Informational_Duration_Page = float(data["Informational_Duration_Page"])
    ProductRelated_Duration_Page = float(data["ProductRelated_Duration_Page"])

    Weekend_Yes = 1 if data["Weekend"] == "Yes" else 0
    Month_Mar = 1 if data["Month"] == "Mar" else 0
    Month_May = 1 if data["Month"] == "May" else 0
    Month_Nov = 1 if data["Month"] == "Nov" else 0
    Month_Rest = 1 if data["Month"] not in ["Mar", "May", "Nov", "Dec"] else 0
    VisitorType_Other = 1 if data["VisitorType"] == "Other" else 0
    VisitorType_Returning_Visitor = (
        1 if data["VisitorType"] == "Returning Visitor" else 0
    )
    OperatingSystems_Other = 1 if data["OperatingSystems"] == "Other" else 0
    OperatingSystems_Windows = 1 if data["OperatingSystems"] == "Windows" else 0
    OperatingSystems_iOS = 1 if data["OperatingSystems"] == "iOS" else 0
    Browser_Other = 1 if data["Browser"] == "Other" else 0
    Browser_Safari = 1 if data["Browser"] == "Safari" else 0
    TrafficType_Other = 1 if data["TrafficType"] == "Other" else 0
    TrafficType_Paid = 1 if data["TrafficType"] == "Paid" else 0
    TrafficType_ReferringSites = 1 if data["TrafficType"] == "Referring Sites" else 0
    TrafficType_SearchEngine = 1 if data["TrafficType"] == "Search Engine" else 0
    TrafficType_Social = 1 if data["TrafficType"] == "Social" else 0

    new = {
        "BounceRates": BounceRates,
        "ExitRates": ExitRates,
        "PageValues": PageValues,
        "Administrative_Duration_Page": Administrative_Duration_Page,
        "Informational_Duration_Page": Informational_Duration_Page,
        "ProductRelated_Duration_Page": ProductRelated_Duration_Page,
        "Weekend_Yes": Weekend_Yes,
        "Month_Mar": Month_Mar,
        "Month_May": Month_May,
        "Month_Nov": Month_Nov,
        "Month_Rest": Month_Rest,
        "VisitorType_Other": VisitorType_Other,
        "VisitorType_Returning_Visitor": VisitorType_Returning_Visitor,
        "OperatingSystems_Other": OperatingSystems_Other,
        "OperatingSystems_Windows": OperatingSystems_Windows,
        "OperatingSystems_iOS": OperatingSystems_iOS,
        "Browser_Other": Browser_Other,
        "Browser_Safari": Browser_Safari,
        "TrafficType_Other": TrafficType_Other,
        "TrafficType_Paid": TrafficType_Paid,
        "TrafficType_ReferringSites": TrafficType_ReferringSites,
        "TrafficType_SearchEngine": TrafficType_SearchEngine,
        "TrafficType_Social": TrafficType_Social,
    }

    New = pd.DataFrame([new])
    model = joblib.load("forest_cla.pkl")
    prediction = model.predict(New)
    return str(prediction)


if __name__ == "__main__":
    app.run(debug=True)

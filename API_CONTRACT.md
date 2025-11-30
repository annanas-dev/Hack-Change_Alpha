# API Contract v1.0

## POST /api/predict
Request (по существующему UI, потом поменяем):
{
  "age": number,
  "accountAgeYears": number, 
  "monthlyIncome": number,
  "region": string,
  "balance": number
}

Response:
{
  "prediction": {
    "predictedIncomeCategory": "low" | "medium" | "high",
    "predictedIncomeValue": number,
    "confidence": number
  },
  "shapExplanation": {
    "featureNames": string[],
    "shapValues": number[],
    "baseValue": number
  },
  "recommendations": ProductRecommendation[]
}

## GET /api/model/metrics
Response:
{
  "accuracy": number,
  "precision": number, 
  "recall": number,
  "lastUpdated": string
}
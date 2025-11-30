namespace Hack_Change_Alpha.API.Models
{
    public class MlPredictionResponse
    {
        public bool Success { get; set; }
        public double PredictedIncome { get; set; }
        public Dictionary<string, double> FeatureImportance { get; set; } = new();
        public string Error { get; set; } = string.Empty;
    }
}
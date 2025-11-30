namespace Hack_Change_Alpha.API.Models;

public class PredictionResult
{
    public decimal PredictedIncomeValue { get; set; }
    public string PredictedIncomeCategory { get; set; } = "medium";
    public double Confidence { get; set; }
}
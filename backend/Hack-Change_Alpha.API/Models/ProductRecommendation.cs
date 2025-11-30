// Models/ProductRecommendation.cs
namespace Hack_Change_Alpha.API.Models;

public class ProductRecommendation
{
    public string ProductId { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string? Cashback { get; set; }
    public string? InterestRate { get; set; }
    public string? Limit { get; set; }
    public string? AdditionalInfo { get; set; }
    // Убедитесь, что ExpectedRevenue имеет правильный тип
    public decimal ExpectedRevenue { get; set; }
}
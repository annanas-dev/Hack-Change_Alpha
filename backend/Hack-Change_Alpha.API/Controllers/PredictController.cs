using Microsoft.AspNetCore.Mvc;

namespace Hack_Change_Alpha.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PredictController : ControllerBase
{
    [HttpPost]
    public IActionResult Predict([FromBody] object request)
    {
        Console.WriteLine("Получен запрос: " + request);

        // Простейший ответ для теста
        return Ok(new
        {
            prediction = new
            {
                predictedIncomeCategory = "high",
                predictedIncomeValue = 120000,
                confidence = 0.85
            },
            shapExplanation = new
            {
                featureNames = new[] { "monthlyIncome", "age", "balance", "accountAgeYears", "region" },
                shapValues = new[] { 0.75, 0.1, 0.08, 0.05, 0.02 },
                baseValue = 50000
            },
            recommendations = new[] {
                new {
                    productName = "Карта Alfa Travel",
                    productId = "alfa_travel_001",
                    reason = "Стабильный доход",
                    cashback = "30%",
                    limit = "до 100 000 ₽"
                }
            }
        });
    }

    [HttpGet("health")]
    public IActionResult HealthCheck()
    {
        return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
    }
}
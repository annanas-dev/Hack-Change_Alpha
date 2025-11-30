using Hack_Change_Alpha.API.Models;

namespace Hack_Change_Alpha.API.Services;

public class RecommendationService : IRecommendationService
{
    public List<ProductRecommendation> GenerateRecommendations(PredictionResult prediction, ClientDataRequest clientData)
    {
        var recommendations = new List<ProductRecommendation>();

        // 1. Карта Alfa Travel (для клиентов со стабильным доходом и балансом)
        if (clientData.MonthlyIncome >= 60000 && clientData.Balance >= 50000)
        {
            recommendations.Add(new ProductRecommendation
            {
                ProductName = "Карта Alfa Travel",
                ProductId = "alfa_travel_001",
                Reason = "Стабильный доход и хороший баланс на счете",
                Cashback = "30%",
                Limit = "до 100 000 ₽"
            });
        }

        // 2. Карта Alpha Only (для клиентов с высокой активностью и стажем)
        if (clientData.AccountAgeYears >= 3 && clientData.MonthlyIncome >= 80000)
        {
            recommendations.Add(new ProductRecommendation
            {
                ProductName = "Карта Alpha Only",
                ProductId = "alpha_only_002",
                Reason = "Стабильная активность на счете и длительное сотрудничество",
                InterestRate = "7.0%",
                Limit = "до 15 000 000 ₽"
            });
        }

        // 3. Дебетовая Альфа-Карта (базовое предложение для всех)
        recommendations.Add(new ProductRecommendation
        {
            ProductName = "Дебетовая Альфа-Карта",
            ProductId = "debit_alfa_003",
            Reason = "Высокий долгосрочный кредитный потенциал",
            Limit = "до 1 000 000 ₽"
        });

        // 4. Премиум карта (для клиентов с высоким прогнозируемым доходом)
        if (prediction.PredictedIncomeCategory == "high" && prediction.PredictedIncomeValue >= 100000)
        {
            recommendations.Add(new ProductRecommendation
            {
                ProductName = "Премиум Альфа-Карта",
                ProductId = "premium_alfa_004",
                Reason = "Высокий прогнозируемый доход и отличные финансовые показатели",
                Cashback = "25%",
                Limit = "до 500 000 ₽",
                AdditionalInfo = $"Прогнозируемый доход: {prediction.PredictedIncomeValue:C0}"
            });
        }

        // 5. Инвестиционная карта (для клиентов с большим балансом)
        if (clientData.Balance >= 200000)
        {
            recommendations.Add(new ProductRecommendation
            {
                ProductName = "Инвестиционная Альфа-Карта",
                ProductId = "investment_alfa_005",
                Reason = "Значительный баланс на счете позволяет получать премиальные условия",
                InterestRate = "5.5%",
                Limit = "до 2 000 000 ₽"
            });
        }

        return recommendations;
    }
}
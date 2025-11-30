using Hack_Change_Alpha.API.Models;

namespace Hack_Change_Alpha.API.Services
{
    public interface IRecommendationService
    {
        List<ProductRecommendation> GenerateRecommendations(PredictionResult predictionResult, ClientDataRequest clientData);
    }
}
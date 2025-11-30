using Hack_Change_Alpha.API.Models;

namespace Hack_Change_Alpha.API.Services
{
    public interface IMlService
    {
        Task<MlPredictionResponse> PredictIncomeAsync(MlPredictionRequest request);
    }
}
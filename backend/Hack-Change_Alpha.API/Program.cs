using Hack_Change_Alpha.API.Services;
using Hack_Change_Alpha.API.Models;
using CsvHelper;
using CsvHelper.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddHttpClient();

builder.Services.AddScoped<IMlService, MlService>();
//builder.Services.AddScoped<Hack_Change_Alpha.API.Services.IMlService, Hack_Change_Alpha.API.Services.MockMlService>();
builder.Services.AddScoped<Hack_Change_Alpha.API.Services.IRecommendationService, Hack_Change_Alpha.API.Services.RecommendationService>();
builder.Services.AddSingleton<CsvDataService>();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapPost("/api/clients/search", (Dictionary<string, string> request, CsvDataService csvService) =>
{
    try
    {
        if (!request.ContainsKey("clientId"))
        {
            return Results.BadRequest(new { success = false, message = "Отсутствует clientId" });
        }

        var clientId = request["clientId"];
        var results = csvService.SearchById(clientId);

        if (results.Count == 0)
        {
            return Results.NotFound(new { success = false, message = "Клиент не найден" });
        }

        return Results.Ok(new
        {
            success = true,
            data = results.First()
        });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Ошибка: {ex.Message}");
    }
});

app.MapPost("/api/ml/predict", async (MlPredictionRequest request, IMlService mlService) =>
{
    try
    {
        var prediction = await mlService.PredictIncomeAsync(request);

        if (!prediction.Success)
        {
            return Results.BadRequest(new { success = false, error = prediction.Error });
        }

        return Results.Ok(new
        {
            success = true,
            predictedIncome = prediction.PredictedIncome,
            featureImportance = prediction.FeatureImportance
        });
    }
    catch (Exception ex)
    {
        return Results.Problem($"Prediction error: {ex.Message}");
    }
});

app.MapControllers();

app.Run();
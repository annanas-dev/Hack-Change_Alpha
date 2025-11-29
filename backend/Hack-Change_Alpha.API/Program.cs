var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddScoped<Hack_Change_Alpha.API.Services.IMlService, Hack_Change_Alpha.API.Services.MockMlService>();
builder.Services.AddScoped<Hack_Change_Alpha.API.Services.IRecommendationService, Hack_Change_Alpha.API.Services.RecommendationService>();

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

app.MapControllers();

app.Run();
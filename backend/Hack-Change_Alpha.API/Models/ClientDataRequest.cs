namespace Hack_Change_Alpha.API.Services;

public class ClientDataRequest
{
    public int Age { get; set; }
    public int AccountAgeYears { get; set; }
    public decimal MonthlyIncome { get; set; }
    public string Region { get; set; } = string.Empty;
    public decimal Balance { get; set; }
}
using System.Text;
using System.Text.Json;
using Hack_Change_Alpha.API.Models;

namespace Hack_Change_Alpha.API.Services
{
	public class MlService : IMlService
	{
		private readonly HttpClient _httpClient;
		private readonly string _mlServiceUrl = "http://localhost:8000";

		public MlService(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<MlPredictionResponse> PredictIncomeAsync(MlPredictionRequest request)
		{
			try
			{
				var requestData = new Dictionary<string, object>
				{
					["salary6To12mAvg"] = request.Salary6To12mAvg,
					["turnCurCrAvgActV2"] = request.TurnCurCrAvgActV2,
					["firstSalaryIncome"] = request.FirstSalaryIncome,
					["turnCurDbAvgActV2"] = request.TurnCurDbAvgActV2,
					["avgCurCrTurn"] = request.AvgCurCrTurn,
					["hdbOutstandSum"] = request.HdbOutstandSum,
					["hdbBkiActiveCcMaxLimit"] = request.HdbBkiActiveCcMaxLimit,
					["dpIlsPaymentssumAvg12m"] = request.DpIlsPaymentssumAvg12m,
					["turnCurDbAvgV2"] = request.TurnCurDbAvgV2,
					["gender"] = request.Gender,
					["turnCurCrAvgV2"] = request.TurnCurCrAvgV2,
					["incomeValue"] = request.IncomeValue,
					["byCategoryAmountSumEoperationTypeNameIshodjaschijBystryjPlatezhSbp"] = request.ByCategoryAmountSumEoperationTypeNameIshodjaschijBystryjPlatezhSbp,
					["incomeValueCategory"] = request.IncomeValueCategory,
					["dpIlsAvgSalary1y"] = request.DpIlsAvgSalary1y,
					["age"] = request.Age,
					["adminArea"] = request.AdminArea,

					["hdbBkiTotalCcMaxLimit"] = request.HdbBkiTotalCcMaxLimit,
					["turnCurCrMaxV2"] = request.TurnCurCrMaxV2,
					["hdbBkiTotalPilMaxLimit"] = request.HdbBkiTotalPilMaxLimit,
					["turnCurCrSumV2"] = request.TurnCurCrSumV2,
					["turnCurDbSumV2"] = request.TurnCurDbSumV2,
					["dpIlsAvgSalary2y"] = request.DpIlsAvgSalary2y,
					["currRurAmtCmAvg"] = request.CurrRurAmtCmAvg,
					["byCategoryAmountSumEoperationTypeNameVhodjaschijBystryjPlatezhSbp"] = request.ByCategoryAmountSumEoperationTypeNameVhodjaschijBystryjPlatezhSbp,
					["dpIlsPaymentssumAvg6m"] = request.DpIlsPaymentssumAvg6m,
					["avgCurDbTurn"] = request.AvgCurDbTurn,
					["avgCreditTurnRur"] = request.AvgCreditTurnRur,
					["byCategoryAmountSumEoperationTypeNamePerevodPoNomeruTelefona"] = request.ByCategoryAmountSumEoperationTypeNamePerevodPoNomeruTelefona,
					["turnCurCr7avgAvgV2"] = request.TurnCurCr7avgAvgV2,
					["dpIlsAccpaymentAvg12m"] = request.DpIlsAccpaymentAvg12m,
					["curbalUsdAmtCmAvg"] = request.CurbalUsdAmtCmAvg,
					["turnCurDbMaxV2"] = request.TurnCurDbMaxV2,
					["turnOtherDbMaxV2"] = request.TurnOtherDbMaxV2,
					["turnCurCrMinV2"] = request.TurnCurCrMinV2,
					["turnCurDbMinV2"] = request.TurnCurDbMinV2,
					["perCapitaIncomeRurAmt"] = request.PerCapitaIncomeRurAmt,
					["avgDebetTurnRur"] = request.AvgDebetTurnRur,
					["hdbRelendActiveMaxPsk"] = request.HdbRelendActiveMaxPsk,
					["ddaRurAmtCurrV2"] = request.DdaRurAmtCurrV2,
					["avg6mMoneyTransactions"] = request.Avg6mMoneyTransactions,
					["pil"] = request.Pil,
					["avgByCategoryAmountSumCashflowcategoryNameElektronnyeDengi"] = request.AvgByCategoryAmountSumCashflowcategoryNameElektronnyeDengi,
					["dpPayoutincomedataPayoutAvg3Month"] = request.DpPayoutincomedataPayoutAvg3Month,
					["hdbRelendOutstandSum"] = request.HdbRelendOutstandSum,
					["totalRurAmtCmAvg"] = request.TotalRurAmtCmAvg,
					["mobCoverDays"] = request.MobCoverDays,
					["currRurAmt3mAvg"] = request.CurrRurAmt3mAvg,
					["turnCurDb7avgAvgV2"] = request.TurnCurDb7avgAvgV2,
					["amountByCategory90dSummarurAmtSumCashflowcategoryNameVydachaNalichnyhVBankomate"] = request.AmountByCategory90dSummarurAmtSumCashflowcategoryNameVydachaNalichnyhVBankomate,
					["dpIlsPaymentssumAvg6mCurrent"] = request.DpIlsPaymentssumAvg6mCurrent,
					["hdbBkiTotalIpCnt"] = request.HdbBkiTotalIpCnt,
					["hdbOtherOutstandSum"] = request.HdbOtherOutstandSum,
					["turnSaveDbMinV2"] = request.TurnSaveDbMinV2,
					["avgByCategoryAmountSumCashflowcategoryNameOdezhda"] = request.AvgByCategoryAmountSumCashflowcategoryNameOdezhda,
					["ddaRurAmt3mAvg"] = request.DdaRurAmt3mAvg,
					["avgAmountDailyTransactions90d"] = request.AvgAmountDailyTransactions90d,
					["avg6mAll"] = request.Avg6mAll,
					["diffAvgCrDbTurn"] = request.DiffAvgCrDbTurn,
					["dpPayoutincomedataPayoutAvg6Month"] = request.DpPayoutincomedataPayoutAvg6Month,
					["byCategoryAmountSumEoperationTypeNamePerevodMezhduSvoimiSchetami"] = request.ByCategoryAmountSumEoperationTypeNamePerevodMezhduSvoimiSchetami,
					["bkiActiveAutoCnt"] = request.BkiActiveAutoCnt,
					["avgByCategoryAmountSumCashflowcategoryNameKosmetika"] = request.AvgByCategoryAmountSumCashflowcategoryNameKosmetika,
					["dpIlsAvgSalary3y"] = request.DpIlsAvgSalary3y,
					["avg3mAll"] = request.Avg3mAll,
					["totalRurAmtCmAvgPeriodDaysAgoV2"] = request.TotalRurAmtCmAvgPeriodDaysAgoV2,
					["avgByCategoryAmountSumCashflowcategoryNameGipermarkety"] = request.AvgByCategoryAmountSumCashflowcategoryNameGipermarkety,
					["citySmartName"] = request.CitySmartName,
					["avgByCategoryAmountSumCashflowcategoryNameVydachaNalichnyhVBankomate"] = request.AvgByCategoryAmountSumCashflowcategoryNameVydachaNalichnyhVBankomate,
					["currRurAmtCmAvgPeriodDaysAgoV2"] = request.CurrRurAmtCmAvgPeriodDaysAgoV2
				};

				var json = JsonSerializer.Serialize(requestData);
				var content = new StringContent(json, Encoding.UTF8, "application/json");

				var response = await _httpClient.PostAsync($"{_mlServiceUrl}/predict", content);

				if (!response.IsSuccessStatusCode)
				{
					return new MlPredictionResponse
					{
						Success = false,
						Error = $"ML service error: {response.StatusCode}"
					};
				}

				var responseContent = await response.Content.ReadAsStringAsync();
				var result = JsonSerializer.Deserialize<MlServiceResponse>(responseContent);

				if (result == null || !result.Success)
				{
					return new MlPredictionResponse
					{
						Success = false,
						Error = result?.Error ?? "Unknown error"
					};
				}

				return new MlPredictionResponse
				{
					Success = true,
					PredictedIncome = result.PredictedIncome,
					FeatureImportance = result.FeatureImportance ?? new Dictionary<string, double>()
				};
			}
			catch (Exception ex)
			{
				return new MlPredictionResponse
				{
					Success = false,
					Error = $"ML service communication error: {ex.Message}"
				};
			}
		}

		private class MlServiceResponse
		{
			public bool Success { get; set; }
			public double PredictedIncome { get; set; }
			public Dictionary<string, double> FeatureImportance { get; set; } = new();
			public string Error { get; set; } = string.Empty;
		}
	}
}
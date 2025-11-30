using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;
using System.Reflection;

namespace Hack_Change_Alpha.API.Services
{
    public class CsvDataService
    {
        private readonly List<dynamic> _records;
        private readonly string[] _targetHeaders =
        {
            "id",
            "age",
            "salary_6to12m_avg",
            "turn_cur_cr_avg_act_v2",
            "first_salary_income",
            "turn_cur_db_avg_act_v2",
            "avg_cur_cr_turn",
            "hdb_outstand_sum",
            "hdb_bki_active_cc_max_limit",
            "dp_ils_paymentssum_avg_12m",
            "turn_cur_db_avg_v2",
            "gender",
            "turn_cur_cr_avg_v2",
            "incomeValue",
            "by_category__amount__sum__eoperation_type_name__ishodjaschij_bystryj_platezh_sbp",
            "incomeValueCategory",
            "dp_ils_avg_salary_1y",

             "hdb_bki_total_cc_max_limit",
             "turn_cur_cr_max_v2",
            "hdb_bki_total_pil_max_limit",
            "turn_cur_cr_sum_v2",
            "turn_cur_db_sum_v2",
            "dp_ils_avg_salary_2y",
            "curr_rur_amt_cm_avg",
            "by_category__amount__sum__eoperation_type_name__vhodjaschij_bystryj_platezh_sbp",
            "dp_ils_paymentssum_avg_6m",
            "avg_cur_db_turn",
            "avg_credit_turn_rur",
            "by_category__amount__sum__eoperation_type_name__perevod_po_nomeru_telefona",
            "turn_cur_cr_7avg_avg_v2",
            "dp_ils_accpayment_avg_12m",
            "curbal_usd_amt_cm_avg",
            "turn_cur_db_max_v2",
            "turn_other_db_max_v2",
            "turn_cur_cr_min_v2",
            "turn_cur_db_min_v2",
            "per_capita_income_rur_amt",
            "avg_debet_turn_rur",
            "hdb_relend_active_max_psk",
            "dda_rur_amt_curr_v2",
            "avg_6m_money_transactions",
            "pil",
            "avg_by_category__amount__sum__cashflowcategory_name__elektronnye_dengi",
            "dp_payoutincomedata_payout_avg_3_month",
            "hdb_relend_outstand_sum",
            "total_rur_amt_cm_avg",
            "mob_cover_days",
            "curr_rur_amt_3m_avg",
            "turn_cur_db_7avg_avg_v2",
            "amount_by_category_90d__summarur_amt__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate",
            "dp_ils_paymentssum_avg_6m_current",
            "hdb_bki_total_ip_cnt",
            "hdb_other_outstand_sum",
            "turn_save_db_min_v2",
            "avg_by_category__amount__sum__cashflowcategory_name__odezhda",
            "dda_rur_amt_3m_avg",
            "avg_amount_daily_transactions_90d",
            "avg_6m_all",
            "diff_avg_cr_db_turn",
            "dp_payoutincomedata_payout_avg_6_month",
            "by_category__amount__sum__eoperation_type_name__perevod_mezhdu_svoimi_schetami",
            "bki_active_auto_cnt",
            "avg_by_category__amount__sum__cashflowcategory_name__kosmetika",
            "dp_ils_avg_salary_3y",
            "avg_3m_all",
            "total_rur_amt_cm_avg_period_days_ago_v2",
            "avg_by_category__amount__sum__cashflowcategory_name__gipermarkety",
            "city_smart_name",
            "avg_by_category__amount__sum__cashflowcategory_name__vydacha_nalichnyh_v_bankomate",
            "curr_rur_amt_cm_avg_period_days_ago_v2"
        };

        public CsvDataService()
        {
            try
            {
                // Поиск CSV файла в нескольких возможных местах
                var csvPath = FindCsvFile();

                Console.WriteLine($"Loading CSV from: {csvPath}");
                Console.WriteLine($"File exists: {File.Exists(csvPath)}");
                Console.WriteLine($"File size: {new FileInfo(csvPath).Length} bytes");

                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    Delimiter = ";",
                    HasHeaderRecord = true,
                    MissingFieldFound = null,
                    BadDataFound = null
                };

                using var reader = new StreamReader(csvPath);
                using var csv = new CsvReader(reader, config);

                _records = csv.GetRecords<dynamic>().ToList();
                Console.WriteLine($"Successfully loaded {_records.Count} records");

                // Проверим структуру первой записи
                if (_records.Count > 0)
                {
                    Console.WriteLine("\nFirst record actual fields (первые 5):");
                    var firstRecord = (IDictionary<string, object>)_records[0];
                    int fieldCount = 0;
                    foreach (var key in firstRecord.Keys)
                    {
                        if (fieldCount >= 5) break;
                        Console.WriteLine($"  - '{key}': '{firstRecord[key]}'");
                        fieldCount++;
                    }
                }

                // Проверим наличие целевых полей
                Console.WriteLine("\nTarget fields presence check:");
                if (_records.Count > 0)
                {
                    var firstRecord = (IDictionary<string, object>)_records[0];
                    foreach (var header in _targetHeaders)
                    {
                        bool exists = firstRecord.ContainsKey(header);
                        Console.WriteLine($"  - '{header}': {(exists ? "FOUND ✓" : "NOT FOUND ✗")}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading CSV: {ex.Message}");
                throw;
            }
        }

        private string FindCsvFile()
        {
            var possiblePaths = new[]
            {
                // При разработке
                Path.Combine(Directory.GetCurrentDirectory(), "Data", "TestDatabase.csv"),
                // После публикации
                Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), "Data", "TestDatabase.csv"),
                // В корне проекта
                Path.Combine(Directory.GetCurrentDirectory(), "TestDatabase.csv"),
                // Родительская директория
                Path.Combine(Directory.GetCurrentDirectory(), "..", "Data", "TestDatabase.csv")
            };

            foreach (var path in possiblePaths)
            {
                if (File.Exists(path))
                {
                    return Path.GetFullPath(path);
                }
                Console.WriteLine($"Tried: {path} - Not found");
            }

            throw new FileNotFoundException(
                $"CSV file not found. Tried locations:\n{string.Join("\n", possiblePaths)}\n" +
                $"Please ensure 'TestDatabase.csv' is in the 'Data' folder.");
        }

        // Метод для фильтрации только нужных полей
        private Dictionary<string, object> FilterTargetFields(IDictionary<string, object> recordDict)
        {
            var filteredRecord = new Dictionary<string, object>();

            foreach (var header in _targetHeaders)
            {
                if (recordDict.ContainsKey(header))
                {
                    filteredRecord[header] = recordDict[header];
                }
            }

            return filteredRecord;
        }

        public List<Dictionary<string, object>> SearchById(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return new List<Dictionary<string, object>>();

            var results = _records
                .Where(record =>
                {
                    var recordDict = (IDictionary<string, object>)record;
                    return recordDict.ContainsKey("id") &&
                           recordDict["id"]?.ToString()?.Equals(id, StringComparison.OrdinalIgnoreCase) == true;
                })
                .Take(10)
                .Select(record => FilterTargetFields((IDictionary<string, object>)record))
                .ToList();

            Console.WriteLine($"Search by ID '{id}' found {results.Count} records");

            // Выводим результаты в консоль
            if (results.Count > 0)
            {
                PrintTable(results);
            }

            return results;
        }

        public List<Dictionary<string, object>> SearchByField(string fieldName, string searchValue)
        {
            if (string.IsNullOrWhiteSpace(searchValue) || searchValue.Length < 2)
                return new List<Dictionary<string, object>>();

            if (!_targetHeaders.Contains(fieldName))
                throw new ArgumentException($"Field '{fieldName}' is not in target headers. Available: {string.Join(", ", _targetHeaders)}");

            var results = _records
                .Where(record =>
                {
                    var recordDict = (IDictionary<string, object>)record;
                    return recordDict.ContainsKey(fieldName) &&
                           recordDict[fieldName]?.ToString()?.Contains(searchValue, StringComparison.OrdinalIgnoreCase) == true;
                })
                .Take(10)
                .Select(record => FilterTargetFields((IDictionary<string, object>)record))
                .ToList();

            Console.WriteLine($"Search by field '{fieldName}' for '{searchValue}' found {results.Count} records");

            // Выводим результаты в консоль
            if (results.Count > 0)
            {
                PrintTable(results);
            }

            return results;
        }

        public string[] GetTargetHeaders() => _targetHeaders;

        public List<string> GetAllIds()
        {
            var ids = _records
                .Select(record =>
                {
                    var recordDict = (IDictionary<string, object>)record;
                    return recordDict.ContainsKey("id") ? recordDict["id"]?.ToString() : null;
                })
                .Where(id => !string.IsNullOrEmpty(id))
                .Distinct()
                .ToList();

            Console.WriteLine($"Found {ids.Count} unique IDs");
            return ids;
        }

        // Метод для просмотра всех ID
        public void PrintAllIds()
        {
            var ids = GetAllIds();
            Console.WriteLine($"\nAll IDs in dataset ({ids.Count} total):");
            foreach (var id in ids.Take(20)) // Показываем первые 20
            {
                Console.WriteLine($"  {id}");
            }
            if (ids.Count > 20)
            {
                Console.WriteLine($"  ... and {ids.Count - 20} more");
            }
        }

        // Метод для получения всех данных (только целевые поля)
        public List<Dictionary<string, object>> GetAllData()
        {
            var allData = _records
                .Select(record => FilterTargetFields((IDictionary<string, object>)record))
                .ToList();

            Console.WriteLine($"Returning all {allData.Count} records (target fields only)");
            return allData;
        }

        // Метод для получения первой записи (для тестирования)
        public Dictionary<string, object> GetFirstRecord()
        {
            if (_records.Count == 0)
                return new Dictionary<string, object>();

            var firstRecord = FilterTargetFields((IDictionary<string, object>)_records[0]);
            Console.WriteLine("Returning first record with target fields");

            // Выводим первую запись в консоль
            PrintRecord(firstRecord);

            return firstRecord;
        }

        // Метод для проверки доступности сервиса
        public bool IsReady()
        {
            return _records != null && _records.Count > 0;
        }

        // Метод для получения статистики
        public object GetStats()
        {
            return new
            {
                TotalRecords = _records?.Count ?? 0,
                TargetFields = _targetHeaders.Length,
                AvailableIds = GetAllIds().Count,
                IsReady = IsReady()
            };
        }

        // Метод для красивого вывода одной записи в консоль
        public void PrintRecord(Dictionary<string, object> record)
        {
            if (record == null || record.Count == 0)
            {
                Console.WriteLine("No data to display");
                return;
            }

            Console.WriteLine("\n" + new string('═', 60));
            Console.WriteLine("📋 RECORD DATA");
            Console.WriteLine(new string('═', 60));

            foreach (var field in record)
            {
                Console.WriteLine($"  {field.Key.PadRight(50)} : {field.Value}");
            }

            Console.WriteLine(new string('═', 60));
            Console.WriteLine($"Total fields: {record.Count}");
        }

        // Метод для табличного вывода данных в консоль
        public void PrintTable(List<Dictionary<string, object>> records, int maxRecords = 5)
        {
            if (records == null || records.Count == 0)
            {
                Console.WriteLine("No data to display");
                return;
            }

            var displayRecords = records.Take(maxRecords).ToList();
            var headers = _targetHeaders;

            // Вычисляем ширину колонок
            var columnWidths = new Dictionary<string, int>();
            foreach (var header in headers)
            {
                int maxWidth = header.Length;
                foreach (var record in displayRecords)
                {
                    if (record.ContainsKey(header))
                    {
                        string value = record[header]?.ToString() ?? "null";
                        maxWidth = Math.Max(maxWidth, Math.Min(value.Length, 30));
                    }
                }
                columnWidths[header] = maxWidth + 2;
            }

            // Печатаем заголовок
            PrintTableLine(columnWidths.Values.ToArray());
            PrintTableRow(headers, columnWidths);
            PrintTableLine(columnWidths.Values.ToArray());

            // Печатаем данные
            foreach (var record in displayRecords)
            {
                var values = headers.Select(header =>
                    record.ContainsKey(header) ? (record[header]?.ToString() ?? "null") : "N/A").ToList();
                PrintTableRow(values, columnWidths);
            }

            PrintTableLine(columnWidths.Values.ToArray());

            if (records.Count > maxRecords)
            {
                Console.WriteLine($"... and {records.Count - maxRecords} more records");
            }
        }

        private void PrintTableLine(int[] widths)
        {
            Console.Write("┌");
            for (int i = 0; i < widths.Length; i++)
            {
                Console.Write(new string('─', widths[i]));
                if (i < widths.Length - 1) Console.Write("┬");
            }
            Console.WriteLine("┐");
        }

        private void PrintTableRow(IList<string> values, Dictionary<string, int> widths)
        {
            Console.Write("│");
            for (int i = 0; i < values.Count; i++)
            {
                string value = values[i];
                int maxWidth = widths.Values.ElementAt(i) - 2;

                if (value.Length > maxWidth)
                    value = value.Substring(0, maxWidth - 3) + "...";

                Console.Write(" " + value.PadRight(maxWidth) + " │");
            }
            Console.WriteLine();
        }
    }
}
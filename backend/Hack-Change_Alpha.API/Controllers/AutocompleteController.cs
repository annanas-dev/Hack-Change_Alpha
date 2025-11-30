using Microsoft.AspNetCore.Mvc;
using Hack_Change_Alpha.API.Services;


namespace Hack_Change_Alpha.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutocompleteController : ControllerBase
    {
        private readonly CsvDataService _csvService;

        public AutocompleteController(CsvDataService csvService)
        {
            _csvService = csvService;
        }

        [HttpGet("search/by-id/{id}")]
        public IActionResult SearchById(string id)
        {
            try
            {
                Console.WriteLine($"🔍 API Request: Search by ID '{id}'");
                Console.WriteLine($"   Time: {DateTime.Now:HH:mm:ss}");

                var results = _csvService.SearchById(id);

                if (results.Count == 0)
                {
                    Console.WriteLine($"❌ No records found for ID: {id}");
                    return NotFound(new { message = $"No records found for ID: {id}" });
                }

                Console.WriteLine($"✅ Found {results.Count} record(s) for ID: {id}");
                return Ok(results);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 ERROR: {ex.Message}");
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "API is working!", timestamp = DateTime.Now });
        }
    }
}
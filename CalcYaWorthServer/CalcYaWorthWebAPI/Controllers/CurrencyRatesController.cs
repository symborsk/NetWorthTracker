using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using CalcYaWorthWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;

namespace CalcYaWorthWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrencyRatesController : ControllerBase
    {
        private readonly IContext _context;
        private readonly IConfiguration _config;
        private readonly HttpClient _client;

        public CurrencyRatesController(IContext context, IConfiguration config, HttpClient client)
        {
            _context = context;
            _config = config;
            _client = client;
        }

        [HttpGet("{defaultCurrency}")]
        public async Task<IActionResult> GetAppSetting(string defaultCurrency)
        {
            string currencyApiUrl = _config["CurrencyApi"];
            HttpResponseMessage response = await _client.GetAsync($"{currencyApiUrl}&base={defaultCurrency}");

            if(response.IsSuccessStatusCode)
            {
                return Ok(await response.Content.ReadAsAsync<JObject>());
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
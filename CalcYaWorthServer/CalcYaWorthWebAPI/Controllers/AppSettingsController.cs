using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CalcYaWorthWebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CalcYaWorthWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppSettingsController : ControllerBase
    {
        private readonly IContext _context;

        public AppSettingsController(IContext context)
        {
            _context = context;
        }

        [HttpGet("{settingName}")]
        public async Task<ActionResult<string>> GetAppSetting(string settingName)
        {
            var setting = await _context.AppSettings.FirstOrDefaultAsync(x => x.SettingName == settingName);

            if (setting == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(setting.SettingValue);
            }
        }
    }
}
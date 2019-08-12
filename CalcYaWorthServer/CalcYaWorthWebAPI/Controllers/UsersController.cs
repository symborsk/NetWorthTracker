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
    public class UsersController : ControllerBase
    {
        private readonly IContext _context;

        public UsersController(IContext context)
        {
            _context = context;
        }

        [HttpGet("GetCurrencySelected/{userId}")]
        public async Task<ActionResult<string>> GetCurrencySelected(int userId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserId == userId);

            if (user == null)
            {
                return NotFound();
            }
            else
            {
                if (string.IsNullOrEmpty(user.CurrencyIsoCode))
                {
                    return NoContent();
                }

                return Ok(user.CurrencyIsoCode);
            }
        }

    }
}
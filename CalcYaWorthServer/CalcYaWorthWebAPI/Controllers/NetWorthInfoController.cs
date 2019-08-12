using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CalcYaWorthWebAPI.Models;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;

namespace CalcYaWorthWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetWorthInfoController : ControllerBase
    {
        private readonly IContext _context;

        public NetWorthInfoController(IContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<JObject>> GetCostItems(int userId)
        {
            var assets =  await _context.Assets.Where(x => x.UserId == userId).ToListAsync();
            var liablities = await _context.Liabilities.Where(x => x.UserId == userId).ToListAsync();

            // return anonymous class for simplicity 
            return Ok(new {assets, liablities});
        }

        [HttpPost("Asset")]
        public async Task<ActionResult<int>> PostAssetAsync([FromBody]Asset asset)
        {
            await _context.Assets.AddAsync(asset);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest("Unexpected conflict encountered while saving asset");
            }

            return Ok(asset.Identifier);
        }

        [HttpPost("Liability")]
        public async Task<ActionResult<int>> PostLiability([FromBody]Liability liability)
        {
            _context.Liabilities.Add(liability);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                return BadRequest("Unexpected conflict encountered while saving liability");
            }

            return Ok(liability.Identifier);
        }

        [HttpPut("Asset")]
        public async Task<ActionResult> PutAsset([FromBody]Asset asset)
        {
            _context.Assets.Update(asset);

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch(DbUpdateConcurrencyException)
            {
                return NotFound("Cannot find asset with that id to update");
            }
            catch
            {
                return BadRequest("Unexpected error while updating asset");
            }
        }

        [HttpPut("Liability")]
        public async Task<ActionResult> PutLiability([FromBody]Liability liability)
        {
            _context.Liabilities.Update(liability);

            try
            {
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound("Cannot find liability with that id to update");
            }
            catch
            {
                return BadRequest("Unexpected error while updating liability");
            }
        }

        [HttpDelete("Asset/{assetId}")]
        public async Task<ActionResult> DeleteAsset(int assetId)
        {
            var foundAsset = await _context.Assets.FirstOrDefaultAsync(x => x.Identifier == assetId);
            if(foundAsset != null)
            {
                _context.Assets.Remove(foundAsset);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                catch
                {
                    return BadRequest("Unexpected error while deleting asset");
                }
            }
            else
            {
                return NotFound("Cannot find asset with that id to delete");
            }
        }

        [HttpDelete("Liability/{liabilityId}")]
        public async Task<ActionResult> DeleteLiability(int liabilityId)
        {
            var foundLiability = await _context.Liabilities.FirstOrDefaultAsync(x => x.Identifier == liabilityId);
            if (foundLiability != null)
            {
                _context.Liabilities.Remove(foundLiability);
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                catch
                {
                    return BadRequest("Unexpected error while deleting asset");
                }
            }
            else
            {
                return NotFound("Cannot find asset with that id to delete");
            }
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTestD.Data;
using ProjectTestD.DTOs;
using ProjectTestD.Models;
using System.Linq;
using System.Threading.Tasks;
using ProjectTestD.Data;
using ProjectTestD.Dtos;
using ProjectTestD.Models;

namespace ProjectTestD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "FleetManager")]
    public class VehiclesController : ControllerBase
    {
        private readonly TestDbContext _db;
        public VehiclesController(TestDbContext db) => _db = db;

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> Create(VehicleDto dto)
        {
            var v = new Vehicle { VehicleNumber = dto.VehicleNumber };
            _db.Vehicles.Add(v);
            await _db.SaveChangesAsync();

            dto.Id = v.Id;
            return CreatedAtAction(nameof(Get), new { id = v.Id }, dto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VehicleDto>> Get(int id)
        {
            var v = await _db.Vehicles.FindAsync(id);
            if (v == null) return NotFound();
            return new VehicleDto { Id = v.Id, VehicleNumber = v.VehicleNumber };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> List()
        {
            return await _db.Vehicles
              .Select(x => new VehicleDto { Id = x.Id, VehicleNumber = x.VehicleNumber })
              .ToListAsync();
        }
    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectTestD.Data;
using ProjectTestD.DTOs;
using ProjectTestD.Models;
using System;
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
    public class TripsController : ControllerBase
    {
        private readonly TestDbContext _db;
        public TripsController(TestDbContext db) => _db = db;

        [HttpPost]
        public async Task<ActionResult<TripReadDto>> Create(TripAddDto dto)
        {
            if (dto.TripEnd <= dto.TripStart) return BadRequest("Invalid dates");

            bool conflict = await _db.Trips.AnyAsync(t =>
              (t.DriverId == dto.DriverId || t.VehicleId == dto.VehicleId) &&
              t.TripStart < dto.TripEnd && dto.TripStart < t.TripEnd
            );

            if (conflict) return Conflict("Trip overlap detected");

            var trip = new Trip
            {
                DriverId = dto.DriverId,
                VehicleId = dto.VehicleId,
                Origin = dto.Origin,
                Destination = dto.Destination,
                TripStart = dto.TripStart,
                TripEnd = dto.TripEnd,
                SubmissionDate = DateTime.UtcNow
            };

            _db.Trips.Add(trip);
            await _db.SaveChangesAsync();

            var read = new TripReadDto
            {
                Id = trip.Id,
                DriverId = trip.DriverId,
                VehicleId = trip.VehicleId,
                Origin = trip.Origin,
                Destination = trip.Destination,
                TripStart = trip.TripStart,
                TripEnd = trip.TripEnd,
                SubmissionDate = trip.SubmissionDate
            };

            return CreatedAtAction(nameof(GetById), new { id = trip.Id }, read);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TripReadDto>> GetById(int id)
        {
            var t = await _db.Trips.FindAsync(id);
            if (t == null) return NotFound();
            return new TripReadDto
            {
                Id = t.Id,
                DriverId = t.DriverId,
                VehicleId = t.VehicleId,
                Origin = t.Origin,
                Destination = t.Destination,
                TripStart = t.TripStart,
                TripEnd = t.TripEnd,
                SubmissionDate = t.SubmissionDate
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TripReadDto>>> GetAll(
            [FromQuery] string driverId = null,
            [FromQuery] int? vehicleId = null)
        {
            var q = _db.Trips.AsQueryable();
            if (driverId != null) q = q.Where(x => x.DriverId == driverId);
            if (vehicleId != null) q = q.Where(x => x.VehicleId == vehicleId);

            return await q.Select(t => new TripReadDto
            {
                Id = t.Id,
                DriverId = t.DriverId,
                VehicleId = t.VehicleId,
                Origin = t.Origin,
                Destination = t.Destination,
                TripStart = t.TripStart,
                TripEnd = t.TripEnd,
                SubmissionDate = t.SubmissionDate
            }).ToListAsync();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TripAddDto dto)
        {
            var t = await _db.Trips.FindAsync(id);
            if (t == null) return NotFound();
            if (dto.TripEnd <= dto.TripStart) return BadRequest("Invalid dates");

            bool conflict = await _db.Trips.AnyAsync(x =>
              x.Id != id &&
              (x.DriverId == dto.DriverId || x.VehicleId == dto.VehicleId) &&
              x.TripStart < dto.TripEnd && dto.TripStart < x.TripEnd
            );

            if (conflict) return Conflict("Trip overlap detected");

            t.DriverId = dto.DriverId;
            t.VehicleId = dto.VehicleId;
            t.Origin = dto.Origin;
            t.Destination = dto.Destination;
            t.TripStart = dto.TripStart;
            t.TripEnd = dto.TripEnd;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var t = await _db.Trips.FindAsync(id);
            if (t == null) return NotFound();
            _db.Trips.Remove(t);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<TripReadDto>>> GetTripsByDriverOrVehicle(
    [FromQuery] string driverName = null,
    [FromQuery] string vehicleNumber = null)
        {
            var query = _db.Trips
                .Include(t => t.Driver)
                .Include(t => t.Vehicle)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(driverName))
            {
                query = query.Where(t => t.Driver.UserName.Contains(driverName));
            }

            if (!string.IsNullOrWhiteSpace(vehicleNumber))
            {
                query = query.Where(t => t.Vehicle.VehicleNumber.Contains(vehicleNumber));
            }

            var trips = await query.Select(t => new TripReadDto
            {
                Id = t.Id,
                DriverId = t.DriverId,
                VehicleId = t.VehicleId,
                Origin = t.Origin,
                Destination = t.Destination,
                TripStart = t.TripStart,
                TripEnd = t.TripEnd,
                SubmissionDate = t.SubmissionDate
            }).ToListAsync();

            return Ok(trips);
        }

    }
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ProjectTestD.Models;


namespace ProjectTestD.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[Authorize(Roles = "FleetManager")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UsersController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("drivers")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllDrivers()
        {
            var users = await _userManager.GetUsersInRoleAsync("Driver");
            return Ok(users.Select(u => new {
                u.Id,
                u.UserName,
                u.Email
            }));
        }

        [HttpGet("fleetmanagers")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllFleetManagers()
        {
            var users = await _userManager.GetUsersInRoleAsync("FleetManager");
            return Ok(users.Select(u => new {
                u.Id,
                u.UserName,
                u.Email
            }));
        }
    }
}

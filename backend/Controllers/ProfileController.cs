using LibraryManagementApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfileController:ControllerBase
    {
        private readonly LibDbcontext _libDbContext;
     
        public ProfileController(LibDbcontext libDbContext)
        {
            _libDbContext = libDbContext;
          
        }
        [HttpGet("profile/{id}")]
        public async Task<IActionResult> GetProfile(int id)
        {
            try
            {
              
                var user = await _libDbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
                if (user == null) return NotFound("User not found");
                return Ok(user);
            }
            catch (Exception ex)
            {
              
                return StatusCode(500, "Internal server error");
            }
        }
    }
}

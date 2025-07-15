using LibraryManagementApp.Data;
using LibraryManagementApp.DTOs;
using LibraryManagementApp.Models;
using LibraryManagementApp.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserAuthController : Controller
    {
        private readonly LibDbcontext _dbcontext;
        private readonly IJWTService _jwtService;
       

        public UserAuthController(LibDbcontext dbcontext,IJWTService jWTService)
        {
            _dbcontext = dbcontext;
            _jwtService = jWTService;
          
        }


        [HttpPost("register")]
        public async Task<ActionResult> CreateUser(RegisterDto registerDto)
        {
            try
            {
                if (await _dbcontext.Users.AnyAsync(u => u.Email == registerDto.Email))
                {
                    return BadRequest("Email is already Registered.");
                }
                if(registerDto.Role == "librarian")
                {
                    const string adminKey = "Admin@2001";
                    if(registerDto.SecretKey != adminKey)
                    {
                        return Unauthorized("Invalid Secret Key");
                    }

                }
                var user = new User
                {
                    Username = registerDto.Username,
                    Email = registerDto.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                    Phone = registerDto.Phone,
                    Address = registerDto.Address,
                    Role = registerDto.Role
                };
                _dbcontext.Users.Add(user);
                await _dbcontext.SaveChangesAsync();
                return Ok(user);

            }
            catch (Exception ex)
            {
                
                return StatusCode(500,"Internal Server error");
            }
            //var user = new User
            //{
            //    Username = registerDto.Username,
            //    Email = registerDto.Email,
            //    Password = registerDto.Password,
            //    Phone = registerDto.Phone,
            //    Address = registerDto.Address,
            //    Role = registerDto.Role
            //};
            //_dbcontext.Users.Add(user);
            //await _dbcontext.SaveChangesAsync();
            //return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                var user = await _dbcontext.Users.SingleOrDefaultAsync(u => u.Email == loginDto.Email);
                if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
                {
                    return Unauthorized("Invalid Credentials");
                }
                var token = _jwtService.GenerateToken(user);
                return Ok(new { Token = token, User = user });
            }
            catch (Exception ex)
            {
             
                return StatusCode(500, "Internal Server error.");
            }
        }



        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _dbcontext.Users.Include(u=>u.BorrowedBooks).ToListAsync();
            return Ok(users);
        }

        [HttpGet("searchUser")]
        public async Task<IActionResult> searchUserByName(string username)
        {
            var users = await _dbcontext.Users.Where(u =>u.Role=="user" && u.Username.Contains(username)).Include(b => b.BorrowedBooks).ToListAsync();
            return Ok(users);
        }


        [HttpGet("search-all")]
        public async Task<IActionResult> SearchAll(string query)
        {
            var authors = await _dbcontext.Authors.Where(a=>a.Name.Contains(query)).ToListAsync();

            var books = await _dbcontext.Books.Where(b => b.Title.Contains(query)).Include(b => b.Author).ToListAsync();

            var users = await _dbcontext.Users.Where(u => u.Role == "user" && u.Username.Contains(query)).Include(b => b.BorrowedBooks).ToListAsync();

            var result = new SearchResultDto
            {
                AuthorS = authors,
                BookS = books,
                UserS = users
            };
            return Ok(result);

        }


    }
}

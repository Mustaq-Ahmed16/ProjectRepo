using LibraryManagementApp.Data;
using LibraryManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController:ControllerBase
    {
        private readonly LibDbcontext _libraryContext;

        public AuthorController(LibDbcontext libraryContext)
        {
            _libraryContext = libraryContext;
        }

        [Authorize(Roles ="librarian")]
        [HttpPost]
        public async Task<IActionResult> CreateAuthor(Author author)
        {
            _libraryContext.Authors.Add(author);
            await _libraryContext.SaveChangesAsync();
            return Ok(author);
        }

        [HttpGet("allAuthors")]
        public async Task<IActionResult> GetAllAuthors()
        {
            var authors =await (_libraryContext.Authors.Include(a => a.Books).ToListAsync());
            return Ok(authors);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuthorById(int id)
        {
            var author =await _libraryContext.Authors.Include(a => a.Books).FirstOrDefaultAsync(a => a.Id == id);
            return Ok(author);

        }

        [HttpGet]
        public async Task<IActionResult> GetBooksByAuthorId(int authorId)
        {
            var books = await _libraryContext.Books.Where(b => b.AuthorId == authorId).ToListAsync();
            return Ok(books);
        }

        [HttpGet("searchAuthor")]
        public async Task<IActionResult> searchAuthorByName(string authorName)
        {
            var authors = await _libraryContext.Authors.Where(b=>b.Name.Contains(authorName)).ToListAsync();
            return Ok(authors);
        }
       


    }
}




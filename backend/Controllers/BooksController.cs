using LibraryManagementApp.Data;
using LibraryManagementApp.DTOs;
using LibraryManagementApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly LibDbcontext _db;

        public BooksController(LibDbcontext db)
        {
            _db = db;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _db.Books.Include(b=>b.Author).ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _db.Books.Where(b => b.Id == id).Include(b=>b.Author).FirstOrDefaultAsync();
            if (book == null) return NotFound();
            return Ok(book);
        }
        [Authorize(Roles = "librarian")]
        [HttpPost]
        public async Task<ActionResult<Book>> CreateBook(BookDto bookdto)
        {
            var book = new Book
            {
                Title = bookdto.Title,
                ISBN = bookdto.ISBN,
                Genre = bookdto.Genre,
                Publishers = bookdto.Publishers,
                Stock = bookdto.Stock,
                AuthorId=bookdto.AuthorId,

            };
            _db.Books.Add(book);
            await _db.SaveChangesAsync();
            return Ok(book);
        }

        [Authorize(Roles ="librarian")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id,BookDto bookDto)
        {
            var book = await _db.Books.FindAsync(id);
            if(book == null) return NotFound();

            book.Title = bookDto.Title;
            book.ISBN = bookDto.ISBN;
            book.Publishers = bookDto.Publishers;
            book.Stock = bookDto.Stock;
            

            await _db.SaveChangesAsync();
            return Ok(book);

        }

        [Authorize(Roles ="librarian")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _db.Books.FindAsync(id);
            if(book == null) return NotFound(); 

            _db.Books.Remove(book);
            await _db.SaveChangesAsync();
            return Ok(book);
        }


        [HttpGet("searchBook")]
        public async Task<IActionResult> searchAuthorByName(string bookTitle)
        {
            var books = await _db.Books.Where(b => b.Title.Contains(bookTitle)).Include(b=>b.Author).ToListAsync();
            return Ok(books);
        }

    }
}

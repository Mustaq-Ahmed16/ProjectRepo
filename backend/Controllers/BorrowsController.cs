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
    public class BorrowsController : Controller
    {
        private readonly LibDbcontext _dbcontext;

        public BorrowsController(LibDbcontext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        [Authorize(Roles = "librarian")]
        [HttpPost]
        public async Task<ActionResult<BorrowBook>> BorrowBook(BorrowBookDto borrowBookdto)
        {
            var book = await _dbcontext.Books.FindAsync(borrowBookdto.BookId);
            if (book == null || book.Stock == 0) return BadRequest("Book Not Available");
            var borrow = new BorrowBook
            {
                UserId = borrowBookdto.UserId,
                BookId = borrowBookdto.BookId,
                BorrowDate = borrowBookdto.BorrowDate,
                ReturnDate = borrowBookdto.ReturnDate,
            };
            _dbcontext.BorrowBooks.Add(borrow);
            book.Stock--;
            await _dbcontext.SaveChangesAsync();

            return Ok(book);

        }

        [Authorize(Roles = "librarian")]
        [HttpPut("return/{id}")]
        public async Task<IActionResult> ReturnBook(ReturnBookDto returnBookDto)
        {
            var borrow = await _dbcontext.BorrowBooks.FindAsync(returnBookDto.BorrowBookId);
            if (borrow == null) return NotFound();

            borrow.ReturnDate = returnBookDto.ReturnDate;
            int overdueDays = (returnBookDto.ReturnDate - borrow.BorrowDate).Days - 7;  // 7 days limit
            borrow.Fine = overdueDays > 0 ? overdueDays * 1 : 0;
            var book = await _dbcontext.Books.FindAsync(borrow.BookId);
            if (book != null) book.Stock++;

            await _dbcontext.SaveChangesAsync();
            return Ok(borrow);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BorrowBook>>> GetBorrows()
        {
            var borrows = await _dbcontext.BorrowBooks.Include(bb => bb.Book).Include(bb => bb.User).ToListAsync();
            return Ok(borrows);

        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetMyBorrowedBooks(int userId)
        {
            var borrowedBooks = await _dbcontext.BorrowBooks.Where(b => b.UserId == userId).ToListAsync();
            if(borrowedBooks.Count ==0)
            {
                return NotFound("No borrowed Books found for this user");
            }
            return Ok(borrowedBooks);
        }
    }
}

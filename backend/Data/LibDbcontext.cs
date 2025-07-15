using LibraryManagementApp.Models;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagementApp.Data
{
    public class LibDbcontext:DbContext
    {
        public LibDbcontext(DbContextOptions<LibDbcontext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Author> Authors { get; set; }

        public DbSet<Book> Books { get; set; }
        public DbSet<BorrowBook> BorrowBooks { get; set; }

        public DbSet<Reservation> Reservations { get; set; }

    }
}

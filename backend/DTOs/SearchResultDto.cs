using LibraryManagementApp.Models;

namespace LibraryManagementApp.DTOs
{
    public class SearchResultDto
    {
        public List<Author> AuthorS { get; set; }

        public List<Book> BookS { get; set; }

        public List<User> UserS { get; set; }
    }
}

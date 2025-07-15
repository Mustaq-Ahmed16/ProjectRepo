namespace LibraryManagementApp.DTOs
{
    public class BookDto
    {
        public string Title { get; set; }
  

        public string ISBN { get; set; }

        public string Genre { get; set; }

        public string Publishers { get; set; }
        public int Stock { get; set; }
        public int AuthorId { get; set; }
    }
}

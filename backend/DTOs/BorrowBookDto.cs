namespace LibraryManagementApp.DTOs
{
    public class BorrowBookDto
    {
        public int UserId { get; set; }

        public int BookId { get; set; }

        public DateTime BorrowDate { get; set; }

        public DateTime ReturnDate {  get; set;}
    }
}

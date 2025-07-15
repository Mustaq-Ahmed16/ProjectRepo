namespace LibraryManagementApp.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public User User { get; set; }

        public int BookId { get; set; }
        public Book Book { get; set; }

        public DateTime ReservedDate { get; set; }
        public DateTime ReservedUntill { get; set; }

    }
}

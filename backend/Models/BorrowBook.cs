using System.Net.NetworkInformation;
using System.Text.Json.Serialization;

namespace LibraryManagementApp.Models
{
    public class BorrowBook
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }

        public int BookId { get; set; }
        public Book Book {  get; set; }

        public DateTime BorrowDate { get; set; }

        public DateTime? ReturnDate { get; set; }

        public double Fine {  get; set; }

    }
}

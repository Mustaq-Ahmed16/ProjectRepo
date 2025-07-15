using LibraryManagementApp.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace LibraryManagementApp.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        [ForeignKey("Author")]
        public int AuthorId { get; set; }
        [JsonIgnore]
        public Author Author { get; set; }

        public string ISBN { get; set; }

        public string Genre { get; set; }

        public string Publishers { get; set; }

        public int Stock {  get; set; }
    }
}

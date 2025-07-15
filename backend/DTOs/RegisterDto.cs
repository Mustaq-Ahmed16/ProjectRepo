using System.Globalization;

namespace LibraryManagementApp.DTOs
{
    public class RegisterDto
    {
        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }    

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Role { get; set; }

        public string? SecretKey { get; set; }=string.Empty;
    }
}

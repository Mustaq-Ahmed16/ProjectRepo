using Microsoft.AspNetCore.Identity;

namespace ProjectTestD.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Role { get; set; }
    }
}

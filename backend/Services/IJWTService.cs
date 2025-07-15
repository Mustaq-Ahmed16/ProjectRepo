using LibraryManagementApp.Models;

namespace LibraryManagementApp.Services
{
    public interface IJWTService
    {
        string GenerateToken(User user);
    }
}

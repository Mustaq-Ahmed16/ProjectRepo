using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProjectTestD.Data;
using ProjectTestD.Models;
using System.Text;
using ProjectTestD.Data;
using ProjectTestD.Models;

var builder = WebApplication.CreateBuilder(args);

// DbContext & Identity
builder.Services.AddDbContext<TestDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<TestDbContext>()
    .AddDefaultTokenProviders();

// JWT
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]);
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Ensure DB and default manager
using (var scope = app.Services.CreateScope())
{
    var scopeSvc = scope.ServiceProvider;
    var db = scopeSvc.GetRequiredService<TestDbContext>();
    db.Database.Migrate();

    var userMgr = scopeSvc.GetRequiredService<UserManager<ApplicationUser>>();
    var roleMgr = scopeSvc.GetRequiredService<RoleManager<IdentityRole>>();
    if (!roleMgr.RoleExistsAsync("FleetManager").Result)
    {
        roleMgr.CreateAsync(new IdentityRole("FleetManager")).Wait();
        roleMgr.CreateAsync(new IdentityRole("Driver")).Wait();
    }
    if (userMgr.FindByNameAsync("admin@fleet.com").Result == null)
    {
        var user = new ApplicationUser
        {
            UserName = "admin@fleet.com",
            Email = "admin@fleet.com",
            Role = "FleetManager",
            EmailConfirmed = true
        };
        userMgr.CreateAsync(user, "Admin!234").Wait();
        userMgr.AddToRoleAsync(user, "FleetManager").Wait();
    }
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

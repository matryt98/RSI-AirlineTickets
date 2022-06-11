using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Database;

namespace WebAPI.Models.Database
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<City> Cities { get; set; } = null!;
        public DbSet<Flight> Flights { get; set; } = null!;
        public DbSet<Reservation> Reservations { get; set; } = null!;
        public DbSet<WebAPI.Models.Database.User>? User { get; set; }
    }
}

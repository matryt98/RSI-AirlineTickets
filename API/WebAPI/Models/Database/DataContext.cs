using Microsoft.EntityFrameworkCore;

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
    }
}

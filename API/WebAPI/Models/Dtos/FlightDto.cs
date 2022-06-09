using WebAPI.Models.Database;

namespace WebAPI.Models.Dtos
{
    public class FlightDto
    {
        public int Id { get; set; }
        public string CityFrom { get; set; } = null!;
        public string CityTo { get; set; } = null!;
        public DateTime Departure { get; set; }
        public DateTime Arrival { get; set; }
        public TimeSpan TimeSpan { get; set; }
        public decimal Price { get; set; }
    }
}

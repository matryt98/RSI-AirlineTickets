namespace WebAPI.Models.Database
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Flight>? Flights { get; set; }
    }
}

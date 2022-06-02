namespace WebAPI.Models.Database
{
    public class Flight
    {
        public int Id { get; set; }
        public int CityFromId { get; set; }
        public virtual City? CityFrom { get; set; }
        public int CityToId { get; set; }
        public virtual City? CityTo { get; set; }
        public DateTime Departure { get; set; }
        public DateTime Arrival { get; set; }
        public virtual List<Reservation>? Reservations { get; set; }
    }
}

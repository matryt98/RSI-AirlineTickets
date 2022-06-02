namespace WebAPI.Models.Database
{
    public class Reservation
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public virtual Flight? Flight { get; set; }
        public virtual List<Ticket>? Tickets { get; set; }
    }
}

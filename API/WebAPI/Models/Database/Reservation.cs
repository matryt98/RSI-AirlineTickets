namespace WebAPI.Models.Database
{
    public class Reservation
    {
        public int Id { get; set; }
        public int FlightId { get; set; }
        public virtual Flight? Flight { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string Email { get; set; } = null!;
        public int Tickets { get; set; }
    }
}

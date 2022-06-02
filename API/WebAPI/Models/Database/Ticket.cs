namespace WebAPI.Models.Database
{
    public class Ticket
    {
        public int Id { get; set; }
        public int ReservationId { get; set; }
        public virtual Reservation? Reservation { get; set; }
        public string Name { get; set; } = null!;
        public string Surname { get; set; } = null!;
        public string PESEL { get; set; } = null!;
    }
}

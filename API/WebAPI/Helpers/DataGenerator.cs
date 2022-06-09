using WebAPI.Models;
using WebAPI.Models.Database;

namespace WebAPI.Helpers
{
    public static class DataGenerator
    {
        public static void Initialize(DataContext context)
        {
            context.Cities.Add(new City { Id = 1, Name = "Berlin"});
            context.Cities.Add(new City { Id = 2, Name = "Warszawa" });
            context.Cities.Add(new City { Id = 3, Name = "Białystok" });
            context.Flights.Add(new Flight { Id = 1, Arrival = DateTime.Now.AddHours(10), Departure = DateTime.Now.AddHours(3), CityFromId = 1, CityToId = 2, Price = 122});
            context.Flights.Add(new Flight { Id = 2, Arrival = DateTime.Now, Departure = DateTime.Now.AddDays(-1), CityFromId = 3, CityToId = 2, Price = 145 });
            context.Flights.Add(new Flight { Id = 3, Arrival = DateTime.Now.AddDays(2), Departure = DateTime.Now.AddDays(1), CityFromId = 3, CityToId = 1, Price = 100 });
            context.Reservations.Add(new Reservation { Id = 1, FlightId = 1 });
            context.Reservations.Add(new Reservation { Id = 2, FlightId = 1 });
            context.Tickets.Add(new Ticket { Id = 1, Name = "Piotr", Surname = "Rytwiński", ReservationId = 1, PESEL = "99911184181" });
            context.Tickets.Add(new Ticket { Id = 2, Name = "Mateusz", Surname = "Sapieszko", ReservationId = 2, PESEL = "99911184182" });
            context.Tickets.Add(new Ticket { Id = 3, Name = "Romeo", Surname = "Romowski", ReservationId = 1, PESEL = "99911184183" });
            context.SaveChanges();
        }
    }
}

using WebAPI.Models;
using WebAPI.Models.Database;

namespace WebAPI.Helpers
{
    public static class DataGenerator
    {
        public static void Initialize(DataContext context)
        {
            context.Cities.Add(new City { Id = 1, Name = "Berlin"});
            context.Cities.Add(new City { Id = 2, Name = "Warsaw" });
            context.Cities.Add(new City { Id = 3, Name = "Białystok" });
            context.Cities.Add(new City { Id = 4, Name = "London" });
            context.Cities.Add(new City { Id = 5, Name = "Barcelona" });
            context.Cities.Add(new City { Id = 6, Name = "Paris" });
            context.Cities.Add(new City { Id = 7, Name = "Moscow" });
            context.Flights.Add(new Flight { Id = 1, Departure = DateTime.Now, Arrival = DateTime.Now.AddHours(3), CityFromId = 1, CityToId = 2, Price = 120});
            context.Flights.Add(new Flight { Id = 2, Departure = DateTime.Now.AddHours(6), Arrival = DateTime.Now.AddHours(9), CityFromId = 1, CityToId = 2, Price = 120});
            context.Flights.Add(new Flight { Id = 3, Departure = DateTime.Now.AddHours(12), Arrival = DateTime.Now.AddHours(15), CityFromId = 1, CityToId = 2, Price = 120});
            context.Flights.Add(new Flight { Id = 4, Departure = DateTime.Now.AddDays(1), Arrival = DateTime.Now.AddHours(1).AddMinutes(140), CityFromId = 4, CityToId = 5, Price = 240});
            context.Flights.Add(new Flight { Id = 5, Departure = DateTime.Now.AddDays(1).AddHours(4), Arrival = DateTime.Now.AddHours(1).AddHours(4).AddMinutes(140), CityFromId = 4, CityToId = 5, Price = 240});
            context.Flights.Add(new Flight { Id = 6, Departure = DateTime.Now.AddDays(1).AddHours(8), Arrival = DateTime.Now.AddHours(1).AddHours(8).AddMinutes(140), CityFromId = 4, CityToId = 5, Price = 240});
            context.Flights.Add(new Flight { Id = 7, Departure = DateTime.Now.AddDays(1).AddHours(8), Arrival = DateTime.Now.AddHours(1).AddHours(8).AddMinutes(140), CityFromId = 4, CityToId = 5, Price = 220});
            context.Flights.Add(new Flight { Id = 8, Departure = DateTime.Now, Arrival = DateTime.Now.AddHours(3), CityFromId = 6, CityToId = 7, Price = 350 });
            context.Flights.Add(new Flight { Id = 9, Departure = DateTime.Now.AddHours(8), Arrival = DateTime.Now.AddHours(8).AddHours(3), CityFromId = 6, CityToId = 7, Price = 350 });
            context.Flights.Add(new Flight { Id = 10, Departure = DateTime.Now.AddHours(16), Arrival = DateTime.Now.AddHours(16).AddHours(3), CityFromId = 6, CityToId = 7, Price = 350 });
            context.Flights.Add(new Flight { Id = 11, Departure = DateTime.Now.AddHours(24), Arrival = DateTime.Now.AddHours(24).AddHours(3), CityFromId = 6, CityToId = 7, Price = 350 });
            context.Reservations.Add(new Reservation { Id = 1, FlightId = 1, Email = "a@a.pl", Name = "Mateusz", Surname = "Sapieszko", Tickets = 3 });
            context.Reservations.Add(new Reservation { Id = 2, FlightId = 1, Email = "b@b.pl", Name = "Piotr", Surname = "Rytwiński", Tickets = 5 });
            context.User.Add(new User { Id = 1, Login = "aaa", Password = "bbb" });
            context.User.Add(new User { Id = 2, Login = "admin", Password = "admin123" });
            context.SaveChanges();
        }
    }
}

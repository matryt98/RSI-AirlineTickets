﻿using WebAPI.Models;
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
            context.Flights.Add(new Flight { Id = 1, Arrival = DateTime.Now.AddHours(10), Departure = DateTime.Now.AddHours(3), CityFromId = 1, CityToId = 2});
            context.Flights.Add(new Flight { Id = 2, Arrival = DateTime.Now, Departure = DateTime.Now.AddDays(-1), CityFromId = 3, CityToId = 2 });
            context.Flights.Add(new Flight { Id = 3, Arrival = DateTime.Now.AddDays(2), Departure = DateTime.Now.AddDays(1), CityFromId = 3, CityToId = 1 });
            context.SaveChanges();
        }
    }
}

using AutoMapper;
using WebAPI.Models.Database;
using WebAPI.Models.Dtos;

namespace WebAPI.AutoMapper
{
    public class ToDtoProfile : Profile
    {
        public ToDtoProfile()
        {
            CreateMap<Flight, FlightDto>()
                .ForMember(x => x.Id, y => y.MapFrom(src => src.Id))
                .ForMember(x => x.CityFrom, y => y.MapFrom(src => src.CityFrom.Name))
                .ForMember(x => x.CityTo, y => y.MapFrom(src => src.CityTo.Name))
                .ForMember(x => x.Arrival, y => y.MapFrom(src => src.Arrival))
                .ForMember(x => x.Departure, y => y.MapFrom(src => src.Departure))
                .ForMember(x => x.TimeSpan, y => y.MapFrom(src =>
                    (new DateTime(
                        src.Arrival.Year,
                        src.Arrival.Month,
                        src.Arrival.Day,
                        src.Arrival.Hour,
                        src.Arrival.Minute,
                        0))
                        .Subtract(new DateTime(
                        src.Departure.Year,
                        src.Departure.Month,
                        src.Departure.Day,
                        src.Departure.Hour,
                        src.Departure.Minute,
                        0))))
                .ForMember(x => x.Price, y => y.MapFrom(src => src.Price));
        }
    }
}

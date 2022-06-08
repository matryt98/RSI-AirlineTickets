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
                .ForMember(x => x.TimeSpan, y => y.MapFrom(src => src.Arrival.Subtract(src.Departure)));
        }
    }
}

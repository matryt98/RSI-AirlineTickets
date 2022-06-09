using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Database;
using WebAPI.Models.Dtos;

namespace WebAPI.Controllers
{
    public class FlightsController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public FlightsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
          if (_context.Flights == null)
          {
              return NotFound();
          }
            return await _context.Flights.ToListAsync();
        }

        // GET: api/Flights/City?city=Berlin&from=true
        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<IEnumerable<FlightDto>>> GetFlights(string? cityFrom, string? cityTo, string date)
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }

            var cityIdsFrom = await _context.Cities.Where(c => c.Name == cityFrom).Select(c => c.Id).ToListAsync();
            var cityIdsTo = await _context.Cities.Where(c => c.Name == cityTo).Select(c => c.Id).ToListAsync();
            var flightsList = new List<Flight>();

            if (cityFrom != null && cityTo != null)
            {
                flightsList = await _context.Flights
                    .Where(f => cityIdsFrom.Contains(f.CityFromId) 
                        && cityIdsTo.Contains(f.CityToId) 
                        && f.Departure >= DateTime.Parse(date)
                        && f.Departure <= DateTime.Parse(date).AddHours(12))
                    .Include(x => x.CityFrom)
                    .Include(x => x.CityTo)
                    .ToListAsync();
                var result = _mapper.Map<List<FlightDto>>(flightsList);
                return result;
            }
            else if (cityFrom != null && cityTo == null)
            {
                flightsList = await _context.Flights
                    .Where(f => cityIdsFrom.Contains(f.CityFromId) 
                        && f.Departure >= DateTime.Parse(date)
                        && f.Departure <= DateTime.Parse(date).AddHours(12))
                    .Include(x => x.CityFrom)
                    .Include(x => x.CityTo)
                    .ToListAsync();
                var result = _mapper.Map<List<FlightDto>>(flightsList);
                return result;
            }
            else if (cityFrom == null && cityTo != null)
            {
                flightsList = await _context.Flights
                    .Where(f => cityIdsTo.Contains(f.CityToId) 
                        && f.Departure >= DateTime.Parse(date)
                        && f.Departure <= DateTime.Parse(date).AddHours(12))
                    .Include(x => x.CityFrom)
                    .Include(x => x.CityTo).ToListAsync();
                var result = _mapper.Map<List<FlightDto>>(flightsList);
                return result;
            }
            else
            {
                return BadRequest("City From and City To are both empty");
            }
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Flight>> GetFlight(int id)
        {
          if (_context.Flights == null)
          {
              return NotFound();
          }
            var flight = await _context.Flights.FindAsync(id);

            if (flight == null)
            {
                return NotFound();
            }

            return flight;
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, Flight flight)
        {
            if (id != flight.Id)
            {
                return BadRequest();
            }

            _context.Entry(flight).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Flights
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Flight>> PostFlight(Flight flight)
        {
          if (_context.Flights == null)
          {
              return Problem("Entity set 'DataContext.Flights'  is null.");
          }
            _context.Flights.Add(flight);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlight", new { id = flight.Id }, flight);
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFlight(int id)
        {
            if (_context.Flights == null)
            {
                return NotFound();
            }
            var flight = await _context.Flights.FindAsync(id);
            if (flight == null)
            {
                return NotFound();
            }

            _context.Flights.Remove(flight);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool FlightExists(int id)
        {
            return (_context.Flights?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

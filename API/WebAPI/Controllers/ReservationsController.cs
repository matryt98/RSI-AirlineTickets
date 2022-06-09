using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models.Database;
using PdfSharpCore.Pdf;
using PdfSharpCore.Drawing;
using MigraDocCore.DocumentObjectModel;
using MigraDocCore.DocumentObjectModel.Shapes;
using MigraDocCore.DocumentObjectModel.Tables;
using System.Xml.XPath;
using MigraDocCore.Rendering;
using PdfSharpCore.Drawing.Layout;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    public class ReservationsController : BaseApiController
    {
        private readonly DataContext _context;

        public ReservationsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Reservations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Reservation>>> GetReservations()
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            return await _context.Reservations.ToListAsync();
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Reservation>> GetReservation(int id)
        {
          if (_context.Reservations == null)
          {
              return NotFound();
          }
            var reservation = await _context.Reservations.FindAsync(id);

            if (reservation == null)
            {
                return NotFound();
            }

            return reservation;
        }

        // PUT: api/Reservations/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation(int id, Reservation reservation)
        {
            if (id != reservation.Id)
            {
                return BadRequest();
            }

            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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

        [HttpPost]
        public async Task<IActionResult> MakeReservation(Reservation reservation)
        {
            if (String.IsNullOrEmpty(reservation.Surname) || String.IsNullOrEmpty(reservation.Name) || reservation.Tickets < 1 || String.IsNullOrEmpty(reservation.Email))
            {
                return BadRequest("One or more of the necessarry reservation fields are empty");
            }

            _context.Reservations.Add(reservation);

            await _context.SaveChangesAsync();

            var bytes = PdfHelper.GeneratePdf(reservation);

            return File(bytes, "application/octet-stream", $"Reservation-{reservation.Id}.pdf");
        }

        [HttpPost]
        [Route("GeneratePDF")]
        public async Task<IActionResult> GeneratePDFAsync(int reservationId)
        {
            var reservation = await _context.Reservations
                .Where(r => r.Id == reservationId)
                .Include(x => x.Flight.CityFrom)
                .Include(x => x.Flight.CityTo)
                .FirstOrDefaultAsync();

            if (reservation == null)
                return NotFound();
            var bytes = PdfHelper.GeneratePdf(reservation);

            return File(bytes, "application/octet-stream", $"Reservation-{reservationId}.pdf");

        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            if (_context.Reservations == null)
            {
                return NotFound();
            }
            var reservation = await _context.Reservations.FindAsync(id);
            if (reservation == null)
            {
                return NotFound();
            }

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReservationExists(int id)
        {
            return (_context.Reservations?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

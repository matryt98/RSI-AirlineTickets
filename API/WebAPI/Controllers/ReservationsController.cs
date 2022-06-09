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
        public async Task<ActionResult<Reservation>> MakeReservation(Reservation reservation)
        {
            if (_context.Reservations == null)
            {
                return Problem("Entity set 'DataContext.Reservations'  is null.");
            }
            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation);
        }

        [HttpPost]
        [Route("GeneratePDF")]
        public async Task GeneratePDFAsync(int reservationId)
        {
            var reservation = await _context.Reservations.Where(r => r.Id == reservationId).Include(x => x.Flight).ToListAsync();

            PdfDocument document = new PdfDocument();
            document.Info.Title = "Bought tickets";

            for (int p = 0; p < 1; p++)
            {
                // Page Options
                PdfPage pdfPage = document.AddPage();
                pdfPage.Height = 842;//842
                pdfPage.Width = 590;

                // Get an XGraphics object for drawing
                XGraphics graph = XGraphics.FromPdfPage(pdfPage);

                // Text format
                XStringFormat format = new XStringFormat();
                format.LineAlignment = XLineAlignment.Near;
                format.Alignment = XStringAlignment.Near;
                var tf = new XTextFormatter(graph);

                XFont fontParagraph = new XFont("Verdana", 8, XFontStyle.Regular);

                // Row elements
                int el1_width = 80;
                int el2_width = 100;

                // page structure options
                double lineHeight = 20;
                int marginLeft = 20;
                int marginTop = 20;

                int el_height = 30;
                int rect_height = 17;

                int interLine_X_1 = 2;
                int interLine_X_2 = 2 * interLine_X_1;
                int interLine_X_3 = 2 * interLine_X_2;

                int offSetX_1 = el1_width;
                int offSetX_2 = el1_width + el2_width;
                int offSetX_3 = el1_width + el2_width + el2_width;

                XSolidBrush rect_style1 = new XSolidBrush(XColors.LightGray);
                XSolidBrush rect_style2 = new XSolidBrush(XColors.DarkGreen);
                XSolidBrush rect_style3 = new XSolidBrush(XColors.Red);

                for (int i = 0; i < 2; i++)
                {
                    double dist_Y = lineHeight * (i + 1);
                    double dist_Y2 = dist_Y - 2;

                    // header della G
                    if (i == 0)
                    {
                        graph.DrawRectangle(rect_style2, marginLeft, marginTop, pdfPage.Width - 2 * marginLeft, rect_height);

                        tf.DrawString("Ticket", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft, marginTop, el1_width, el_height), format);

                        tf.DrawString("Name", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_1 + interLine_X_1, marginTop, el2_width, el_height), format);

                        tf.DrawString("Flight", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_2 + 2 * interLine_X_2, marginTop, el1_width, el_height), format);

                        tf.DrawString("Price", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_3 + 2 * interLine_X_3, marginTop, el1_width, el_height), format);

                        graph.DrawRectangle(rect_style1, marginLeft, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString("text1", fontParagraph, XBrushes.Black,
                                      new XRect(marginLeft, dist_Y + marginTop, el1_width, el_height), format);

                        //ELEMENT 2 - BIG 380
                        graph.DrawRectangle(rect_style1, marginLeft + offSetX_1 + interLine_X_1, dist_Y2 + marginTop, el2_width, rect_height);
                        tf.DrawString(
                            "text1",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_1 + interLine_X_1, dist_Y + marginTop, el2_width, el_height),
                            format);


                        //ELEMENT 3 - SMALL 80

                        graph.DrawRectangle(rect_style1, marginLeft + offSetX_2 + interLine_X_2, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString(
                            "text3",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_2 + 2 * interLine_X_2, dist_Y + marginTop, el1_width, el_height),
                            format);

                        graph.DrawRectangle(rect_style1, marginLeft + offSetX_3 + interLine_X_3, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString(
                            "text4",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_3 + 2 * interLine_X_3, dist_Y + marginTop, el1_width, el_height),
                            format);


                    }
                    else
                    {

                        //if (i % 2 == 1)
                        //{
                        //  graph.DrawRectangle(TextBackgroundBrush, marginLeft, lineY - 2 + marginTop, pdfPage.Width - marginLeft - marginRight, lineHeight - 2);
                        //}

                        //ELEMENT 1 - SMALL 80
                        graph.DrawRectangle(rect_style1, marginLeft, marginTop + dist_Y2, el1_width, rect_height);
                        tf.DrawString(

                            "text1",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft, marginTop + dist_Y, el1_width, el_height),
                            format);

                        //ELEMENT 2 - BIG 380
                        graph.DrawRectangle(rect_style1, marginLeft + offSetX_1 + interLine_X_1, dist_Y2 + marginTop, el2_width, rect_height);
                        tf.DrawString(
                            "text2",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_1 + interLine_X_1, marginTop + dist_Y, el2_width, el_height),
                            format);


                        //ELEMENT 3 - SMALL 80

                        graph.DrawRectangle(rect_style1, marginLeft + offSetX_2 + interLine_X_2, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString(
                            "text3",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_2 + 2 * interLine_X_2, marginTop + dist_Y, el1_width, el_height),
                            format);

                    }

                }


            }


            const string filename = "HelloWorld.pdf";
            document.Save(filename);

            //byte[] bytes = null;
            //using (MemoryStream stream = new MemoryStream())
            //{
            //    document.Save(stream, true);
            //    bytes = stream.ToArray();
            //}

            //SendFileToResponse(bytes, "HelloWorld_test.pdf");

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

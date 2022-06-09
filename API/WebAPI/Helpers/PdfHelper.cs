using PdfSharpCore.Drawing;
using PdfSharpCore.Drawing.Layout;
using PdfSharpCore.Pdf;
using WebAPI.Models.Database;

namespace WebAPI.Helpers
{
    public static class PdfHelper
    {
        public static byte[] GeneratePdf(Reservation reservation)
        {

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
                int el1_width = 60;
                int el2_width = 130;
                int el3_width = 130;
                int el4_width = 130;
                int el5_width = 50;
                int el6_width = 50;

                // page structure options
                double lineHeight = 20;
                int marginLeft = 20;
                int marginTop = 20;

                int el_height = 30;
                int rect_height = 17;

                int interLine_X_1 = 2;
                int interLine_X_2 = 2 * interLine_X_1;

                int offSetX_1 = el1_width;
                int offSetX_2 = offSetX_1 + el2_width;
                int offSetX_3 = offSetX_2 + el3_width;
                int offSetX_4 = offSetX_3 + el4_width;
                int offSetX_5 = offSetX_4 + el5_width;
                int offSetX_6 = offSetX_5 + el6_width;

                XSolidBrush rect_style1 = new XSolidBrush(XColors.LightGray);
                XSolidBrush rect_style2 = new XSolidBrush(XColors.LightBlue);
                XSolidBrush rect_style3 = new XSolidBrush(XColors.Red);

                //for (int i = 0; i < 1; i++)
                //{
                    double dist_Y = lineHeight;
                    double dist_Y2 = dist_Y - 2;

                //    // header della G
                //    if (i == 0)
                //    {
                        graph.DrawRectangle(rect_style2, marginLeft, marginTop, pdfPage.Width - 2 * marginLeft, rect_height);

                        tf.DrawString("Reservation", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft, marginTop, el1_width, el_height), format);

                        tf.DrawString("Dest-Arr", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_1, marginTop, el1_width, el_height), format);

                        tf.DrawString("Name", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_2, marginTop, el2_width, el_height), format);

                        tf.DrawString("Email", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_3, marginTop, el1_width, el_height), format);

                        tf.DrawString("Tickets", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_4, marginTop, el1_width, el_height), format);

                        tf.DrawString("Price", fontParagraph, XBrushes.White,
                                      new XRect(marginLeft + offSetX_5, marginTop, el1_width, el_height), format);

                        // stampo il primo elemento insieme all'header
                        //graph.DrawRectangle(rect_style1, marginLeft, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString(
                            reservation.Id.ToString(), 
                            fontParagraph, 
                            XBrushes.Black,
                            new XRect(marginLeft, dist_Y + marginTop, el1_width, el_height), format);

                        //ELEMENT 2 - BIG 380
                        //graph.DrawRectangle(rect_style1, marginLeft + offSetX_1 + interLine_X_1, dist_Y2 + marginTop, el2_width, rect_height);
                        tf.DrawString(
                            reservation.Flight.CityFrom.Name + "-" + reservation.Flight.CityTo.Name,
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_1, marginTop + dist_Y, el1_width, el_height), format);


                        //ELEMENT 3 - SMALL 80

                        //graph.DrawRectangle(rect_style1, marginLeft + offSetX_2 + interLine_X_1, dist_Y2 + marginTop, el1_width, rect_height);
                        tf.DrawString(
                            reservation.Name + " " + reservation.Surname,
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_2, dist_Y + marginTop, el2_width, el_height), format);

                        tf.DrawString(
                            reservation.Email,
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_3, dist_Y + marginTop, el1_width, el_height), format);

                        tf.DrawString(
                            reservation.Tickets.ToString(),
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_4, dist_Y + marginTop, el1_width, el_height), format);

                        tf.DrawString(
                            (reservation.Flight.Price * reservation.Tickets).ToString() + "PLN",
                            fontParagraph,
                            XBrushes.Black,
                            new XRect(marginLeft + offSetX_5, dist_Y + marginTop, el1_width, el_height), format);
                    //}
                    //else
                    //{

                    //    //if (i % 2 == 1)
                    //    //{
                    //    //  graph.DrawRectangle(TextBackgroundBrush, marginLeft, lineY - 2 + marginTop, pdfPage.Width - marginLeft - marginRight, lineHeight - 2);
                    //    //}

                    //    //ELEMENT 1 - SMALL 80
                    //    //graph.DrawRectangle(rect_style1, marginLeft, marginTop + dist_Y2, el1_width, rect_height);
                    //    tf.DrawString(

                    //        "text1",
                    //        fontParagraph,
                    //        XBrushes.Black,
                    //        new XRect(marginLeft, marginTop + dist_Y, el1_width, el_height),
                    //        format);

                    //    //ELEMENT 2 - BIG 380
                    //    //graph.DrawRectangle(rect_style1, marginLeft + offSetX_1 + interLine_X_1, dist_Y2 + marginTop, el2_width, rect_height);
                    //    tf.DrawString(
                    //        "text2",
                    //        fontParagraph,
                    //        XBrushes.Black,
                    //        new XRect(marginLeft + offSetX_1, marginTop + dist_Y, el2_width, el_height),
                    //        format);


                    //    //ELEMENT 3 - SMALL 80

                    //    //graph.DrawRectangle(rect_style1, marginLeft + offSetX_2 + interLine_X_2, dist_Y2 + marginTop, el1_width, rect_height);
                    //    tf.DrawString(
                    //        "text3",
                    //        fontParagraph,
                    //        XBrushes.Black,
                    //        new XRect(marginLeft + offSetX_2, marginTop + dist_Y, el1_width, el_height),
                    //        format);

                    //}
            //    }
            }


            //const string filename = "HelloWorld.pdf";
            //document.Save(filename);

            byte[] bytes = null;
            using (MemoryStream stream = new MemoryStream())
            {
                document.Save(stream, true);
                bytes = stream.ToArray();
            }
            return bytes;

        }
    }
}

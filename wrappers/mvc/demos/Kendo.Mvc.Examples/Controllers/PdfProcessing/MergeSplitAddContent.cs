using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Export;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Streaming;
using Telerik.Windows.Documents.Fixed.Model;
using Telerik.Windows.Documents.Fixed.Model.InteractiveForms;
using System.Diagnostics;
using System.IO;
using System.Reflection;
using System.Windows;
using Telerik.Windows.Documents.Fixed.Exceptions;
using Telerik.Windows.Documents.Fixed.FormatProviders.Pdf.Streaming;
using Telerik.Windows.Documents.Fixed.Model;
using Telerik.Windows.Documents.Fixed.Model.ColorSpaces;
using Telerik.Windows.Documents.Fixed.Model.Editing;
using Telerik.Windows.Zip;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PdfProcessingController : Controller
    {
        [Demo]
        public ActionResult Merge_Split_Add_Content()
        {
            return View();
        }

        public ActionResult Merge_Split_Add_Append_Prepend(HttpPostedFileBase firstDocument, HttpPostedFileBase secondDocument, string rb)
        {

            string fileDownloadName = "test.pdf";
            string mimeType = "application/pdf";

            if(rb == "1" && firstDocument != null && secondDocument != null)
            {
                mimeType = "application/pdf";
                fileDownloadName = "merge.pdf";
                byte[] renderedBytes = null;
                short filesToMurge = 2;
                MemoryStream ms = new MemoryStream();

                using (PdfStreamWriter fileWriter = new PdfStreamWriter(ms, true))
                {
                    for (int i = 0; i < filesToMurge; i++)
                    {
                        if(i == 0)
                        {
                            using (PdfFileSource fileSource = new PdfFileSource(firstDocument.InputStream))
                            {
                                foreach (PdfPageSource pageSource in fileSource.Pages)
                                {
                                    fileWriter.WritePage(pageSource);
                                }
                            }
                        }

                        if( i == 1)
                        {
                            using (PdfFileSource fileSource = new PdfFileSource(secondDocument.InputStream))
                            {
                                foreach (PdfPageSource pageSource in fileSource.Pages)
                                {
                                    fileWriter.WritePage(pageSource);
                                }
                            }
                        }
                        
                    }
                }

                renderedBytes = ms.ToArray();
                return File(renderedBytes, mimeType, fileDownloadName);

            }

            if (rb == "2" && firstDocument != null)
            {
                mimeType = "application/octet-stream";
                fileDownloadName = "split.zip";
                byte[] renderedBytes = null;
                MemoryStream ms = new MemoryStream();
                MemoryStream ms1 = new MemoryStream();


                using (PdfFileSource fileSource = new PdfFileSource(firstDocument.InputStream))
                {
                    using (Stream stream = ms1)
                    {
                        using (ZipArchive archive = new ZipArchive(stream, ZipArchiveMode.Create, false, null))
                        {
                            for (int i = 0; i < fileSource.Pages.Length; i++)
                            {
                                using (PdfStreamWriter fileWriter = new PdfStreamWriter(ms, true))
                                {
                                    using (ZipArchiveEntry entry = archive.CreateEntry(i+1 + "page.pdf"))
                                    {
                                        PdfStreamWriter writer = new PdfStreamWriter(entry.Open());
                                        PdfPageSource pageSource = fileSource.Pages[i];
                                        writer.WritePage(pageSource);
                                        writer.Dispose();
 
                                    }                                                                   
                                }
                            }
                        }
                        


                    }

                    renderedBytes = ms1.ToArray();
                    return File(renderedBytes, mimeType, fileDownloadName);
                }


            }

            if (rb == "3" && firstDocument != null)
            {
                RadFixedPage foregroundContentOwner = GenerateForegroundTextContent("STAMP");
                MemoryStream ms = new MemoryStream();
                byte[] renderedBytes = null;
                using (PdfFileSource fileSource = new PdfFileSource(firstDocument.InputStream))
                {
                    using (PdfStreamWriter fileWriter = new PdfStreamWriter(ms, true))
                    {
                        foreach (PdfPageSource pageSource in fileSource.Pages)
                        {
                            using (PdfPageStreamWriter pageWriter = fileWriter.BeginPage(pageSource.Size, pageSource.Rotation))
                            {
                                pageWriter.WriteContent(pageSource);

                                using (pageWriter.SaveContentPosition())
                                {
                                    double xCenteringTranslation = (pageSource.Size.Width - foregroundContentOwner.Size.Width) / 2;
                                    double yCenteringTranslation = (pageSource.Size.Height - foregroundContentOwner.Size.Height) / 2;
                                    pageWriter.ContentPosition.Translate(xCenteringTranslation, yCenteringTranslation);
                                    pageWriter.WriteContent(foregroundContentOwner);
                                }
                            }
                        }
                    }
                }
                renderedBytes = ms.ToArray();
                return File(renderedBytes, mimeType, fileDownloadName);
            }

            if(rb == "4" && firstDocument != null)
            {
                mimeType = "application/pdf";
                fileDownloadName = "prepend.pdf";
                byte[] renderedBytes = null;
                short filesToMurge = 2;
                MemoryStream ms = new MemoryStream();
                string fileName = Server.MapPath("~/Content/web/pdfprocessing/template.pdf");
                FileStream input = new FileStream(fileName, FileMode.Open);

                using (PdfStreamWriter fileWriter = new PdfStreamWriter(ms,true))
                {
                    using (PdfFileSource fileSource = new PdfFileSource(firstDocument.InputStream))
                    {
                        using (PdfFileSource templateSource = new PdfFileSource(input,true))
                        {
                            PdfPageSource backgroundTemplate = templateSource.Pages[0];

                            foreach (PdfPageSource pageSource in fileSource.Pages)
                            {
                                using (PdfPageStreamWriter pageWriter = fileWriter.BeginPage(pageSource.Size, pageSource.Rotation))
                                {
                                    using (pageWriter.SaveContentPosition())
                                    {
                                        double scaleX = pageSource.Size.Width / backgroundTemplate.Size.Width;
                                        double scaleY = pageSource.Size.Height / backgroundTemplate.Size.Height;
                                        double scale = Math.Min(scaleX, scaleY);
                                        double xCenteringTranslation = (pageSource.Size.Width - scale * backgroundTemplate.Size.Width) / 2;
                                        double yCenteringTranslation = (pageSource.Size.Height - scale * backgroundTemplate.Size.Height) / 2;
                                        pageWriter.ContentPosition.Translate(xCenteringTranslation, yCenteringTranslation);
                                        pageWriter.ContentPosition.Scale(scale, scale);
                                        pageWriter.WriteContent(backgroundTemplate);
                                    }

                                    pageWriter.WriteContent(pageSource);
                                }
                            }
                        }
                    }
                }

                renderedBytes = ms.ToArray();
                return File(renderedBytes, mimeType, fileDownloadName);

            }

            return View();

        }

        private static RadFixedPage GenerateForegroundTextContent(string text)
        {
            Block block = new Block();
            block.BackgroundColor = new RgbColor(50, 0, 0, 0);
            block.GraphicProperties.FillColor = new RgbColor(255, 0, 0);
            block.TextProperties.FontSize = 120;
            block.InsertText(text);
            Size horizontalTextSize = block.Measure();
            double rotatedTextSquareSize = (horizontalTextSize.Width + horizontalTextSize.Height) / Math.Sqrt(2);

            RadFixedPage foregroundContentOwner = new RadFixedPage();
            foregroundContentOwner.Size = new Size(rotatedTextSquareSize, rotatedTextSquareSize);
            FixedContentEditor foregroundEditor = new FixedContentEditor(foregroundContentOwner);
            foregroundEditor.Position.Translate(horizontalTextSize.Height / Math.Sqrt(2), 0);
            foregroundEditor.Position.Rotate(45);
            foregroundEditor.DrawBlock(block);

            return foregroundContentOwner;
        }

        private static Stream GetResourceFile(string resourceFileName)
        {
            string resourcePath = "~/Content/web/pdfprocessing/" + resourceFileName;
            Uri resourceUri = new Uri(resourcePath, UriKind.Relative);

            return Application.GetResourceStream(resourceUri).Stream;
        }
    }
}
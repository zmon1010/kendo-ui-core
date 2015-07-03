using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;
using Telerik.Windows.Documents.Spreadsheet.Model;
using IOFile = System.IO.File;

namespace Host.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Import()
        {
            string fileName = Server.MapPath("~/App_Data/Sample.xlsx");
            if (!IOFile.Exists(fileName))
            {
                throw new FileNotFoundException(String.Format("File {0} was not found!", fileName));
            }

            Workbook workbook;
            var formatProvider = new XlsxFormatProvider();

            using (FileStream input = new FileStream(fileName, FileMode.Open))
            {
                workbook = formatProvider.Import(input);
            }

            string json;

            var jsonFormatProvider = new JsonFormatProvider();
            using (var stream = new MemoryStream())
            using (var reader = new StreamReader(stream))
            {
                jsonFormatProvider.Export(workbook, stream);

                stream.Seek(0, SeekOrigin.Begin);
                json = reader.ReadToEnd();                    
            }

            return Content(json, "application/json");
        }
	}
}
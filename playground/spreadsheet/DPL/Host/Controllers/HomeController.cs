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

        //[OutputCache(Duration = 60, VaryByParam = "none")]
        public ActionResult Load(string file)
        {
            string fileName = Path.Combine(Server.MapPath("~/App_Data"), file);
            if (!IOFile.Exists(fileName))
            {
                throw new FileNotFoundException(String.Format("File {0} was not found!", fileName));
            }

            Workbook workbook;
            var xlsxProvider = new XlsxFormatProvider();
            using (FileStream input = new FileStream(fileName, FileMode.Open))
            {
                workbook = xlsxProvider.Import(input);
            }

            string json;

            var jsonProvider = new JsonFormatProvider();
            using (var stream = new MemoryStream())
            using (var reader = new StreamReader(stream))
            {
                jsonProvider.Export(workbook, stream);

                stream.Seek(0, SeekOrigin.Begin);
                json = reader.ReadToEnd();                    
            }

            return Content(json, "application/json");
        }

        [HttpPost]
        public ActionResult Download(string data)
        {
            var dtoWorkbook = JsonConvert.DeserializeObject<DTO.Workbook>(data);
            var jsonProvider = new JsonFormatProvider();
            var workbook = jsonProvider.Import(dtoWorkbook);

            var xlsxProvider = new XlsxFormatProvider();
            var xlsxFile = xlsxProvider.Export(workbook);
            return File(xlsxFile, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Sheet.xlsx");
        }

        [HttpPost]
        public ActionResult Save(DTO.Workbook workbook)
        {
            var jsonProvider = new JsonFormatProvider();
            var document = jsonProvider.Import(workbook);

            var xlsxProvider = new XlsxFormatProvider();
            var xlsxFile = xlsxProvider.Export(document);

            // ...

            return new EmptyResult();
        }

        [HttpPost]
        public ActionResult Upload(HttpPostedFileBase file)
        {
            Workbook workbook;
            var xlsxProvider = new XlsxFormatProvider();
            using (var input = file.InputStream)
            {
                workbook = xlsxProvider.Import(input);
            }

            string json;

            var jsonProvider = new JsonFormatProvider();
            using (var stream = new MemoryStream())
            using (var reader = new StreamReader(stream))
            {
                jsonProvider.Export(workbook, stream);

                stream.Seek(0, SeekOrigin.Begin);
                json = reader.ReadToEnd();
            }

            return Content(json, "application/json");

        }
	}
}
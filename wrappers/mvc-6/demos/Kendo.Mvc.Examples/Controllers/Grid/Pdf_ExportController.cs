using System;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;
using System.Linq;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
        public ActionResult Pdf_Export()
        {
            return View();
        }

        public ActionResult Pdf_Export_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var northwind = new SampleEntitiesDataContext())
            {
                return Json(northwind.Employees.ToList().ToDataSourceResult(request, e => new EmployeeViewModel
                    {
                        EmployeeID = e.EmployeeID,
                        Country = e.Country,
                        Title = e.Title,
                        FirstName = e.FirstName,
                        LastName = e.LastName
                    }));
            }
        }

        [HttpPost]
        public ActionResult Pdf_Export_Save(string contentType, string base64, string fileName)
        {
            var fileContents = Convert.FromBase64String(base64);

            return File(fileContents, contentType, fileName);
        }
    }
}

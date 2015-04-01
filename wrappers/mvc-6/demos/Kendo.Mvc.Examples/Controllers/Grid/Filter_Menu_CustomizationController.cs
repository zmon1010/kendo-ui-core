using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult Filter_Menu_Customization()
        {            
            return View();
        }

        public ActionResult FilterMenuCustomization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetEmployees().ToDataSourceResult(request));
        }

        public ActionResult FilterMenuCustomization_Cities()
        {
            var db = new SampleEntitiesDataContext();
            return Json(db.Employees.Select(e => e.City).Distinct());
        }

        public ActionResult FilterMenuCustomization_Titles()
        {
            var db = new SampleEntitiesDataContext();
            return Json(db.Employees.Select(e => e.Title).Distinct());
        } 
    }
}

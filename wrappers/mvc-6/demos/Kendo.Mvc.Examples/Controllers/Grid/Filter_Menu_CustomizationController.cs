using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : BaseController
    {
        [Demo]
        public ActionResult Filter_Menu_Customization()
        {            
            return View();
        }

        public ActionResult FilterMenuCustomization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetEmployees().ToList().ToDataSourceResult(request));
        }

        public ActionResult FilterMenuCustomization_Cities()
        {
            using (var db = new SampleEntitiesDataContext())
            {
                return Json(db.Employees.Select(e => e.City).Distinct().ToList());
            }
        }

        public ActionResult FilterMenuCustomization_Titles()
        {
            using (var db = new SampleEntitiesDataContext())
            {
                return Json(db.Employees.Select(e => e.Title).Distinct().ToList());
            }
        } 
    }
}

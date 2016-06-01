using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {
            return View();
        }

        public JsonResult Employees(int? id)
        {
            var dataContext = new SampleEntitiesDataContext();

            var employees = from e in dataContext.Employees
                            where (id.HasValue ? e.ReportsTo == id : e.ReportsTo == null)
                            select new
                            {
                                id = e.EmployeeID,
                                Name = e.FirstName + " " + e.LastName,
                                hasChildren = (from q in dataContext.Employees
                                               where (q.ReportsTo == e.EmployeeID)
                                               select q
                                               ).Count() > 0
                            };
            return Json(employees);
        }

    }
}

using System.Collections.Generic;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public class ListBoxController : Controller
    {
        [Demo]
        public ActionResult Index()
        {
            ViewBag.Attendees = new List<string>
            {
                "Steven White",
                "Nancy King",
                "Nancy Davolio",
                "Robert Davolio",
                "Michael Leverling",
                "Andrew Callahan",
                "Michael Suyama"
            };

            return View();
        }
    }
}

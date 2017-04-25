using System.Collections.Generic;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListBoxController : Controller
    {
        [Demo]
        public ActionResult Right_To_Left_Support()
        {
            ViewBag.Countries = new List<string>
            {
                "Argentina",
                "Australia",
                "Brazil",
                "Canada",
                "Chile",
                "China",
                "Egypt",
                "England",
                "France",
                "Germany",
                "India",
                "Indonesia",
                "Kenya",
                "Mexico",
                "New Zealand",
                "South Africa",
                "USA"
            };

            return View();
        }
    }
}

using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListBoxController : BaseController
    {
        [Demo]
        public IActionResult Right_To_Left_Support()
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

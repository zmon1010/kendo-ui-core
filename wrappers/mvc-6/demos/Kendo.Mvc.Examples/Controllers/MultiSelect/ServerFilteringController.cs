using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MultiSelectController : Controller
    {
        [Demo]
        public ActionResult ServerFiltering()
        {
            return View();
        }
    }
}
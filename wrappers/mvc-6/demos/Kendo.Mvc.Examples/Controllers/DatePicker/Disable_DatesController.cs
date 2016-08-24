using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DatePickerController : Controller
    {
        [Demo]
        public ActionResult Disable_Dates()
        {
            return View();
        }
    }
}
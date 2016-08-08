using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DropDownListController : Controller
    {
        [Demo]
        public ActionResult Template()
        {
            return View();
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
        [Demo]
        public ActionResult Copy_To_Excel()
        {
            return View();
        }
    }
}
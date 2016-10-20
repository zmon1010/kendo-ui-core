using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : BaseController
    {
        [Demo]
        public ActionResult Filter_Row()
        {
            ViewData["initial"] = productService.Read();
            return View();
        }
    }
}
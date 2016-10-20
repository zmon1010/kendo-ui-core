using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : BaseController
    {
        [Demo]
        public ActionResult Keyboard_Navigation()
        {
            return View(productService.Read());
        }
    }
}
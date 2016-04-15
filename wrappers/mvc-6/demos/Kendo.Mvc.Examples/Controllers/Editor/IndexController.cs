using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class EditorController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ImageBrowser()
        {
            return View();
        }
    }
}
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Chart_ApiController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}
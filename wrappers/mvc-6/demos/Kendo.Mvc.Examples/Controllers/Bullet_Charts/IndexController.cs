using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Bullet_ChartsController : Controller
    {
        [Demo]
        public IActionResult Index()
        {
            return View();
        }
    }
}
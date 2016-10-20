using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MapController : BaseController
    {
        [Demo]
        public IActionResult Events()
        {
            return View();
        }
    }
}
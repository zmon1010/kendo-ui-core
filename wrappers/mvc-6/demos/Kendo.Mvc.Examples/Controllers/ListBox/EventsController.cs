using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListBoxController : BaseController
    {
        [Demo]
        public IActionResult Events()
        {
            return View();
        }
    }
}

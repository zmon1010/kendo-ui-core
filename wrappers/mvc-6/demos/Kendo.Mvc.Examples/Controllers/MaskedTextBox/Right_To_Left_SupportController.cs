using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MaskedTextBoxController : Controller
    {
        [Demo]
        public IActionResult Right_To_Left_Support()
        {
            return View();
        }
    }
}
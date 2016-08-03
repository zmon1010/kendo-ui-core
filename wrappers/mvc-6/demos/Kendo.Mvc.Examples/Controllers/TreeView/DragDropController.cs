using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : Controller
    {
        [Demo]
        public ActionResult DragDrop()
        {
            return View();
        }
    }
}
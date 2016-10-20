using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class TreeViewController : BaseController
    {
        [Demo]
        public ActionResult Animation(string animation, bool? opacity)
        {
            ViewBag.animation = animation ?? "toggle";
            ViewBag.opacity = opacity ?? true;
            
            return View();
        }
    }
}

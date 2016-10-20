using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : BaseController
    {
        [Demo]
        public ActionResult Orientation(string orientation)
        {
            MenuOrientation value = MenuOrientation.Horizontal;

            if (orientation == "vertical")
            {
                value = MenuOrientation.Vertical;
            }

            return View(value);
        }
    }
}

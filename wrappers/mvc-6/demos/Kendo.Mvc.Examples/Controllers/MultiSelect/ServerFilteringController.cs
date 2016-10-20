using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MultiSelectController : BaseController
    {
        [Demo]
        public ActionResult ServerFiltering()
        {
            return View();
        }
    }
}
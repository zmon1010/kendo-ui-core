using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MultiSelectController : Controller
    {
        public ActionResult ClientFiltering()
        {
            return View();
        }
    }
}
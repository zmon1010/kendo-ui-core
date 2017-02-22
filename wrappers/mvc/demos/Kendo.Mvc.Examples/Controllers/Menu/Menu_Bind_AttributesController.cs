using Kendo.Mvc.Examples.Models;
using System.Web.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : Controller
    {
        [Demo]
        public ActionResult Menu_Bind_Attributes()
        {
            SampleEntities northwind = new SampleEntities();
            return View(northwind.Categories);
        }
    }
}

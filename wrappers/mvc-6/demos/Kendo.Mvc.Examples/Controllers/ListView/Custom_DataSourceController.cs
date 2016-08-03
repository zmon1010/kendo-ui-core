using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{ 

    public partial class ListViewController : Controller
    {
        [Demo]
        public ActionResult Custom_DataSource()
        {
            return View();
        }
    }
}

using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : Controller
    {
        public ActionResult Selection()
        {
            return View(GetProducts());
        }        
    }
}
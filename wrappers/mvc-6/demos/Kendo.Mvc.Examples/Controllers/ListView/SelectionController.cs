using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : BaseController
    {
        [Demo]
        public ActionResult Selection()
        {
            return View(GetProducts());
        }        
    }
}
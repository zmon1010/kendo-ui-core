using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListViewController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {
            return View(GetProducts());
        }
    }
}
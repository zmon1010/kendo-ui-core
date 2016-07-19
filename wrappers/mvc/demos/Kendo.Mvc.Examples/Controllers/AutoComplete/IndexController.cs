namespace Kendo.Mvc.Examples.Controllers
{
    using ActionFilters;
    using System.Web.Mvc;

    public partial class AutoCompleteController : Controller
    {
        [Demo]
        public ActionResult Index()
        {
            return View();
        }
    }
}
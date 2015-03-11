using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public class GridController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

		public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
		{
			var db = new SampleEntitiesDataContext();

			return Json(db.Customers.ToDataSourceResult(request));
		}
	}
}

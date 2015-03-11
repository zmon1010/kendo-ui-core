using System.Collections;
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
            return View(GetProducts());
        }

		public IActionResult Products([DataSourceRequest] DataSourceRequest request)
		{			
			return Json(GetProducts().ToDataSourceResult(request));
		}

		private static IEnumerable GetProducts()
		{
			return new SampleEntitiesDataContext().Products;			
		}
	}
}

using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
		private ProductService productService;

		public GridController()
		{
			productService = new ProductService(new SampleEntitiesDataContext());
		}

		protected override void Dispose(bool disposing)
		{
			productService.Dispose();

			base.Dispose(disposing);
		}

		public IActionResult Index()
        {
            return View();
        }

		public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
		{
			return Json(GetCustomers().ToDataSourceResult(request));
		}

		private static IEnumerable<CustomerViewModel> GetCustomers()
		{
			var northwind = new SampleEntitiesDataContext();
			return northwind.Customers.Select(customer => new CustomerViewModel
			{
				CustomerID = customer.CustomerID,
				CompanyName = customer.CompanyName,
				ContactName = customer.ContactName,
				ContactTitle = customer.ContactTitle,
				Address = customer.Address,
				City = customer.City,
				Region = customer.Region,
				PostalCode = customer.PostalCode,
				Country = customer.Country,
				Phone = customer.Phone,
				Fax = customer.Fax,
				Bool = customer.Bool
			});
		}
	}
}

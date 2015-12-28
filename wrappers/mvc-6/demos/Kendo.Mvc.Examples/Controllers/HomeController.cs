using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public class HomeController : Controller
    {
        [FromServices]
        public IHostingEnvironment HostingEnvironment { get; set; }

        public IActionResult Index()
        {
            var widgets = NavigationProvider.SuiteWidgets(HostingEnvironment.WebRootFileProvider)
                                            .Where(widget => widget.ShouldInclude);

            ViewBag.Navigation = widgets;

            return View();
        }

        public IEnumerable<ProductViewModel> GetProducts(string text)
        {
            var northwind = new SampleEntitiesDataContext();

            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
            });

            if (!string.IsNullOrEmpty(text))
            {
                products = products.Where(p => p.ProductName.Contains(text));
            }

            return products;
        }

        public IEnumerable<CustomerViewModel> GetCustomers()
        {
            var customers = new SampleEntitiesDataContext().Customers.Select(customer => new CustomerViewModel
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

            return customers;
        }
    }
}
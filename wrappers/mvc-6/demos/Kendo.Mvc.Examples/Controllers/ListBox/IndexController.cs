using System;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListBoxController : BaseController
    {
        private IProductService productService;

        public ListBoxController(
            IProductService service)
        {
            productService = service;
        }


        [Demo]
        public IActionResult Index()
        {
            ViewBag.Attendees = new List<string>
            {
                "Steven White",
                "Nancy King",
                "Nancy Davolio",
                "Robert Davolio",
                "Michael Leverling",
                "Andrew Callahan",
                "Michael Suyama"
            };

            return View();
        }

        public IActionResult GetCustomers()
        {
            var customers = Enumerable.Empty<CustomerViewModel>();

            using (var northwind = GetContext())
            {
                customers = northwind.Customers.Select(customer => new CustomerViewModel
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
                }).ToList();
            }

            return Json(customers);
        }

        public ActionResult GetProducts()
        {
            var products = Enumerable.Empty<ProductViewModel>();

            using (var northwind = GetContext())
            {
                products = northwind.Products.Select(product => new ProductViewModel
                {
                    ProductID = product.ProductID,
                    ProductName = product.ProductName,
                    UnitPrice = product.UnitPrice.HasValue ? product.UnitPrice.Value : default(decimal),
                    UnitsInStock = product.UnitsInStock.HasValue ? product.UnitsInStock.Value : default(int),
                    UnitsOnOrder = product.UnitsOnOrder.HasValue ? product.UnitsOnOrder.Value : default(int),
                    Discontinued = product.Discontinued,
                    LastSupply = DateTime.Today
                }).ToList();
            }

            return Json(products);
        }
    }
}

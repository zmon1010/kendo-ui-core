using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ListBoxController : Controller
    {
        [Demo]
        public ActionResult Index()
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

        public JsonResult GetCustomers()
        {
            var customers = new SampleEntities().Customers.Select(customer => new CustomerViewModel
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

            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetProducts()
        {
            var northwind = new SampleEntities();

            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued,
                LastSupply = DateTime.Today
            });

            return Json(products, JsonRequestBehavior.AllowGet);
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ComboBoxController : Controller
    {
        public ActionResult Grouping()
        {
            return View();
        }

        public ActionResult Customers_Read(string text)
        {
            var result = GetCustomers();

            if (text != null)
            {
                result = result.Where(c => c.ContactName.Contains(text)).ToList();
            }

            return Json(result);
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

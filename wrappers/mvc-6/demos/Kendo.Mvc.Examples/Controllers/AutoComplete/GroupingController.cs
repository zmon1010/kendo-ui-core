using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class AutoCompleteController : Controller
    {
        [Demo]
        public IActionResult Grouping()
        {
            return View();
        }

        public IEnumerable<CustomerViewModel> Customers_Read(string text)
        {
            return GetCustomers().Where(c => c.ContactName.Contains(text));
        }

        private IEnumerable<CustomerViewModel> GetCustomers()
        {
            using (var northwind = new SampleEntitiesDataContext())
            {
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
                }).ToList();
            }
        }
    }
}
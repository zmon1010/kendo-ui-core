using Microsoft.AspNet.Mvc;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DropDownListController : Controller
    {
        public ActionResult Virtualization()
        {
            return View();
        }

        public ActionResult Virtualization_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(GetOrders().ToDataSourceResult(request));
        }

        public ActionResult Orders_ValueMapper(int[] values)
        {
            var indices = new List<int>();

            if (values != null && values.Any())
            {
                var index = 0;

                foreach (var order in GetOrders())
                {
                    if (values.Contains(order.OrderID))
                    {
                        indices.Add(index);
                    }

                    index += 1;
                }
            }

            return Json(indices);
        }

        private static IEnumerable<OrderViewModel> GetOrders()
        {
            var northwind = new SampleEntitiesDataContext();

            return northwind.Orders.Select(order => new OrderViewModel
            {
                ContactName = order.Customer.ContactName,
                Freight = order.Freight,
                OrderDate = order.OrderDate,
                ShippedDate = order.ShippedDate,
                OrderID = order.OrderID,
                ShipAddress = order.ShipAddress,
                ShipCountry = order.ShipCountry,
                ShipName = order.ShipName,
                ShipCity = order.ShipCity,
                EmployeeID = order.EmployeeID,
                CustomerID = order.CustomerID
            });
        }
    }
}

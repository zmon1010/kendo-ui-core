using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DateInputController : Controller
    {
        [Demo]
        public ActionResult Tag_Helper()
        {
            return View(GetFirstOrder());
        }

        private static OrderViewModel GetFirstOrder()
        {
            using (var northwind = new SampleEntitiesDataContext())
            {
                return northwind.Orders.Select(order => new OrderViewModel
                {
                    OrderDate = order.OrderDate,
                }).First();
            }
        }

    }

}
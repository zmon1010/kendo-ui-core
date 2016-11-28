using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DateTimePickerController : Controller
    {
        [Demo]
        public IActionResult Tag_Helper()
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

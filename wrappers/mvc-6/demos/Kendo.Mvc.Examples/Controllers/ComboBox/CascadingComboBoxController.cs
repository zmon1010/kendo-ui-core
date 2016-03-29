using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class ComboBoxController : Controller
    {
        public ActionResult CascadingComboBox()
        {
            return View();
        }

        public JsonResult GetCascadeCategories()
        {
            var northwind = new SampleEntitiesDataContext();

            return Json(northwind.Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }));
        }

        public JsonResult GetCascadeProducts(int? categories, string productFilter)
        {
            var northwind = new SampleEntitiesDataContext();
            var products = northwind.Products.AsQueryable();

            if (categories != null)
            {
                products = products.Where(p => p.CategoryID == categories);
            }

            if (!string.IsNullOrEmpty(productFilter))
            {
                products = products.Where(p => p.ProductName.Contains(productFilter));
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }));
        }

        public JsonResult GetCascadeOrders(int? products, string orderFilter)
        {
            var northwind = new SampleEntitiesDataContext();
            var orders = northwind.OrderDetails.AsQueryable();

            if (products != null)
            {
                orders = orders.Where(o => o.ProductID == products);
            }

            if (!string.IsNullOrEmpty(orderFilter))
            {
                orders = orders.Where(o => o.Order.ShipCity.Contains(orderFilter));
            }

            return Json(orders.Select(o => new { OrderID = o.OrderID, ShipCity = o.Order.ShipCity }));
        }
    }
}
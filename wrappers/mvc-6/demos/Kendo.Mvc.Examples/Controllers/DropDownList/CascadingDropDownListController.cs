using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DropDownListController : Controller
    {
        public ActionResult CascadingDropDownList()
        {
            return View();
        }

        public JsonResult GetCascadeCategories()
        {
            var northwind = new SampleEntitiesDataContext();

            return Json(northwind.Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }));
        }

        public JsonResult GetCascadeProducts(int? categories)
        {
            var northwind = new SampleEntitiesDataContext();
            var products = northwind.Products.AsQueryable();

            if (categories != null)
            {
                products = products.Where(p => p.CategoryID == categories);
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }));
        }

        public JsonResult GetCascadeOrders(int? products)
        {
            var northwind = new SampleEntitiesDataContext();
            var orders = northwind.OrderDetails.AsQueryable();

            if (products != null)
            {
                orders = orders.Where(o => o.ProductID == products);
            }

            return Json(orders.Select(o => new { OrderID = o.OrderID, ShipCity = o.Order.ShipCity }));
        }
    }
}
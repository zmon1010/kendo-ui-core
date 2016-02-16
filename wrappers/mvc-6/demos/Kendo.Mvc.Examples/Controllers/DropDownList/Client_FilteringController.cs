using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class DropDownListController : Controller
    {
        public ActionResult Client_Filtering()
        {
            return View();
        }

        public JsonResult GetProducts()
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

            return Json(products);
        }
    }
}
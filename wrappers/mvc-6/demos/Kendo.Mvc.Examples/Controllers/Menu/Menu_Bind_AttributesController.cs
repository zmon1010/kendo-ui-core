using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MenuController : BaseController
    {
        [Demo]
        public ActionResult Menu_Bind_Attributes()
        {
            using (var northwind = GetContext())
            {
                var categories = northwind.Categories.ToList();
                categories.ForEach(c =>
                                   c.Products = northwind.Products
                                    .Where(p => p.CategoryID == c.CategoryID)
                                    .ToList());

                return View(categories);
            }
        }
    }
}

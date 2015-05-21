using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class GridController : Controller
    {
        public ActionResult ForeignKeyColumn()
        {            
            PopulateCategories();
            return View();
        }

        public ActionResult ForeignKeyColumn_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }

        [HttpPost]
        public ActionResult ForeignKeyColumn_Update([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Update(product);                    
                }
            }

            return Json(products.ToDataSourceResult(request,ModelState));
        }

        [HttpPost]
        public ActionResult ForeignKeyColumn_Create([DataSourceRequest] DataSourceRequest request, 
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            var results = new List<ProductViewModel>();
            if (products != null && ModelState.IsValid)
            {
                foreach (var product in products)
                {
                    productService.Create(product);
                    results.Add(product);
                }
            }

            return Json(results.ToDataSourceResult(request, ModelState));
        }

        [HttpPost]
        public ActionResult ForeignKeyColumn_Destroy([DataSourceRequest] DataSourceRequest request,
            [Bind(Prefix = "models")]IEnumerable<ProductViewModel> products)
        {
            foreach (var product in products)
            {
                productService.Destroy(product);
            }

            return Json(products.ToDataSourceResult(request, ModelState));
        }

        private void PopulateCategories()
        {
            var dataContext = new SampleEntitiesDataContext();
            var categories = dataContext.Categories
                        .Select(c => new CategoryViewModel
                        {
                            CategoryID = c.CategoryID,
                            CategoryName = c.CategoryName
                        })
                        .OrderBy(e => e.CategoryName);

            ViewData["categories"] = categories;
            ViewData["defaultCategory"] = categories.First();
        }
    }
}

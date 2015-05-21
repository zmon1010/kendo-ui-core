using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
        public ActionResult Editing_Inline()
        {
            return View();
        }

        public ActionResult EditingInline_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }

		[AcceptVerbs("Post")]
		public ActionResult EditingInline_Create([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {         
                productService.Create(product);                                 
            }
            
            return Json(new [] { product }.ToDataSourceResult(request, ModelState));
        }

		[AcceptVerbs("Post")]
		public ActionResult EditingInline_Update([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {
            if (product != null && ModelState.IsValid)
            {
                productService.Update(product);
            }            

            return Json(new[]{product}.ToDataSourceResult(request,ModelState));
        }

		[AcceptVerbs("Post")]
		public ActionResult EditingInline_Destroy([DataSourceRequest] DataSourceRequest request, ProductViewModel product)
        {            
            if (product != null)
            {                
                productService.Destroy(product);                
            }

            return Json(new[] { product }.ToDataSourceResult(request, ModelState));
        }
    }
}

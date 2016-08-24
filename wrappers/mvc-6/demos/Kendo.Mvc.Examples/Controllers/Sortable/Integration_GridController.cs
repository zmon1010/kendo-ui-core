using Microsoft.AspNetCore.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SortableController : Controller
    {
        private IProductService productService;

        public SortableController(
            IProductService service)
        {
            productService = service;
        }

        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }

        [Demo]
        public IActionResult Integration_Grid()
        {
            var model = productService.Read();

            return View(model);
        }
    }
}

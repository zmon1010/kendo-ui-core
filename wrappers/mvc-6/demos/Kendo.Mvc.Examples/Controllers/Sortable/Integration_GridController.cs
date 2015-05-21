using Microsoft.AspNet.Mvc;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SortableController : Controller
    {
        private ProductService productService;

        public SortableController()
        {
            productService = new ProductService(new SampleEntitiesDataContext());
        }

        protected override void Dispose(bool disposing)
        {
            productService.Dispose();

            base.Dispose(disposing);
        }

        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }

        public IActionResult Integration_Grid()
        {
            var model = productService.Read();

            return View(model);
        }
    }
}

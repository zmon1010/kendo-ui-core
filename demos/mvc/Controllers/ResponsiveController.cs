using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class ProductPageAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);

            var controller = context.Controller as BaseController;
            controller.ViewBag.Product = controller.CurrentProduct();
            controller.ViewBag.ProductName = controller.CurrentProductName();
        }
    }

    [ProductPage]
    public class ResponsiveController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Grid()
        {
            return View();
        }

        public ActionResult Scheduler()
        {
            return View();
        }

        public ActionResult Chart()
        {
            return View();
        }

        public ActionResult ResponsivePanel()
        {
            return View();
        }
    }
}

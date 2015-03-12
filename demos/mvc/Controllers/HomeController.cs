using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            if (IsMobileDevice())
            {
                return Redirect(Url.RouteUrl("MobileDeviceIndex"));
            }

            ViewBag.Product = CurrentProduct();
            ViewBag.NavProduct = CurrentNavProduct();

            ViewBag.Theme = "material";
            ViewBag.MobileTheme = "ios7";
            ViewBag.CommonFile = "common-material";

            LoadNavigation();
            LoadCategories();

            return View();
        }
    }
}

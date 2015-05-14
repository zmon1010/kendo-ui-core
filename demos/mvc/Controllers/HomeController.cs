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
            ViewBag.Product = CurrentProduct();
            ViewBag.NavProduct = CurrentNavProduct();

            ViewBag.Theme = "material";
            ViewBag.CommonFile = "common-material";

            LoadNavigation();
            LoadCategories();

            SetTheme();

            return View();
        }
    }
}

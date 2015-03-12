using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class ResponsiveController : BaseController
    {
        public ActionResult Index()
        {
            ViewBag.PageClassName = "responsive-index";
            return View();
        }
    
        public ActionResult Grid()
        {
            ViewBag.PageClassName = "responsive-grid";
            return View();
        }

        public ActionResult Scheduler()
        {
            ViewBag.PageClassName = "responsive-scheduler";
            return View();
        }

        public ActionResult Chart()
        {
            ViewBag.PageClassName = "responsive-chart";
            return View();
        }

        public ActionResult ResponsivePanel()
        {
            ViewBag.PageClassName = "responsive-panel";
            return View();
        }
    }
}

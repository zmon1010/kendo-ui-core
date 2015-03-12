using System;
using System.Net;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Controllers
{
    public class IntegrationController : BaseController
    {
        public ActionResult Sushi()
        {
            return View();
        }

        public ActionResult Simulator()
        {
            return RedirectPermanent(Url.RouteUrl("MobileApplication", new { app = "sushi" }));
        }

        public ActionResult Bootstrap()
        {
            return View();
        }

        public ActionResult Diagram()
        {
            return View();
        }
    }
}

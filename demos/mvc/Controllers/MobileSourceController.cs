using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;
using Kendo.Models;

namespace Kendo.Controllers
{
    public class MobileSourceController : BaseController
    {
        public ActionResult Index(string path)
        {
            if (String.IsNullOrEmpty(path) || (!path.StartsWith("~/Views")))
            {
                return HttpNotFound();
            }

            var mappedPath = Server.MapPath(path);

            if (!IOFile.Exists(mappedPath))
            {
                return HttpNotFound();
            }

            ViewBag.Mobile = true;
            ViewBag.MobileAngular = false;
            ViewBag.DisableInMobile = false;
            ViewBag.ShowDescription = false;

            var source = ViewResult(path);

            return Content("<pre class='prettyprint'>" + HttpUtility.HtmlEncode(source) + "</pre>", "text/plain");
        }

        private string ViewResult(string path)
        {
            var viewResult = ViewEngines.Engines.FindView(ControllerContext, path, "SourceLayout");

            using (var writer = new StringWriter())
            {
                var viewContext = new ViewContext(ControllerContext, viewResult.View, ViewData, TempData, writer);

                viewResult.View.Render(viewContext, writer);

                return writer.GetStringBuilder().ToString();
            }
        }
    }
}

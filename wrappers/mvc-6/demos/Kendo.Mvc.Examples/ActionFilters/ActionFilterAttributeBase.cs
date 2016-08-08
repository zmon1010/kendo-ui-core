using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using IOFile = System.IO.File;

namespace Kendo.Mvc.Examples.Controllers
{
    public abstract class ActionFilterAttributeBase : ActionFilterAttribute
    {
        private IHostingEnvironment _hostingEnvironment;

        protected List<string> examplesUrl = new List<string>();

        public dynamic ViewBag
        {
            get
            {
                return Controller.ViewBag;
            }
        }

        public Controller Controller { get; set; }

        public string ContentRootPath { get; set; }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            _hostingEnvironment = filterContext.HttpContext.RequestServices.GetRequiredService<IHostingEnvironment>();

            ContentRootPath = _hostingEnvironment.ContentRootPath;

            Controller = filterContext.Controller as Controller;

            ViewBag.ShowCodeStrip = true;
            ViewBag.Product = "aspnet-mvc";
            ViewBag.NavProduct = "mvc";

            ViewBag.Theme = "material";
            ViewBag.CommonFile = "common-material";

            SetTheme();
            LoadNavigation();
            LoadCategories();
        }

        protected void SetTheme()
        {
            var theme = "material";
            var themeParam = Controller.HttpContext.Request.Query["theme"].FirstOrDefault();
            var themeCookie = Controller.HttpContext.Request.Cookies["theme"];

            if (themeParam != null && Regex.IsMatch(themeParam, "[a-z0-9\\-]+", RegexOptions.IgnoreCase))
            {
                theme = themeParam;

                // update cookie
                Controller.ControllerContext.HttpContext.Response.Cookies.Append("theme", theme);
            }
            else if (!string.IsNullOrEmpty(themeCookie))
            {
                theme = themeCookie;
            }

            var CommonFileCookie = Controller.HttpContext.Request.Cookies["commonFile"];

            ViewBag.Theme = theme;
            ViewBag.CommonFile = string.IsNullOrEmpty(CommonFileCookie) ? "common-material" : CommonFileCookie;
        }

        protected void LoadNavigation()
        {
            ViewBag.Navigation = LoadWidgets();
        }

        protected void LoadCategories()
        {
            ViewBag.Categories = LoadWidgets().GroupBy(w => w.Category).ToList();
        }

        protected IEnumerable<NavigationWidget> LoadWidgets()
        {
            var rootPath = _hostingEnvironment.WebRootPath;

            return JsonConvert.DeserializeObject<NavigationWidget[]>(IOFile.ReadAllText(rootPath + "/shared/nav.json"));
        }
    }
}
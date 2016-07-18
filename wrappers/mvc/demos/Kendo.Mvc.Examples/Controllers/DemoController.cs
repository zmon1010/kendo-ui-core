using Kendo.Mvc.Examples.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public abstract class DemoController : BaseController
    {
        private List<string> examplesUrl = new List<string>();

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var product = "aspnet-mvc";

            ViewBag.ShowCodeStrip = true;
            ViewBag.Product = "aspnet-mvc";
            ViewBag.NavProduct = "mvc";

            //ViewBag.Theme = "material";
            //ViewBag.CommonFile = "common-material";
            
            //ViewBag.Section = section;
            //ViewBag.Example = example;

            SetTheme();
            LoadNavigation();
            LoadCategories();

            FindCurrentExample();

            NavigationExample currentExample = ViewBag.CurrentExample;
            NavigationWidget currentWidget = ViewBag.CurrentWidget;

            if (currentWidget == null)
            {
                return;
            }

            ViewBag.Description = Description(ViewBag.Product, currentExample, currentWidget);

            //var exampleFiles = new List<ExampleFile>();
            //exampleFiles.AddRange(SourceCode(product, section, example));
            //exampleFiles.AddRange(AdditionalSources(currentWidget.Sources, product));
            //exampleFiles.AddRange(AdditionalSources(currentExample.Sources, product));
            //ViewBag.ExampleFiles = exampleFiles.Where(file => file.Exists(Server));

            //if (ViewBag.Mobile)
            //{
            //    if (currentExample.Url.StartsWith("adaptive") && IsMobileDevice())
            //    {
            //        return Redirect(Url.RouteUrl("MobileDeviceIndex"));
            //    }
            //}

            //var api = currentExample.Api ?? ViewBag.CurrentWidget.Api;
            //if (!string.IsNullOrEmpty(api))
            //{
            //    if (product == "kendo-ui")
            //    {
            //        ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/" + api;
            //    }
            //    else if (product == "php-ui")
            //    {
            //        ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/php/kendo/ui" + Regex.Replace(api, "(web|dataviz|mobile)", "");
            //    }
            //    else if (product == "jsp-ui")
            //    {
            //        ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/jsp" + Regex.Replace(api, "(web|dataviz|mobile)", "");
            //    }
            //    else if (product == "aspnet-mvc")
            //    {
            //        if (api == "web/validator")
            //        {
            //            ViewBag.Api = "http://docs.telerik.com/kendo-ui/aspnet-mvc/validation";
            //        }
            //        else
            //        {
            //            ViewBag.Api = "http://docs.telerik.com/kendo-ui/api/wrappers/aspnet-mvc/kendo.mvc.ui.fluent" + Regex.Replace(api, "(web|dataviz)", "").Replace("mobile/", "/mobile") + "builder";
            //        }
            //    }
            //}

            if (currentWidget.Documentation != null && currentWidget.Documentation.ContainsKey(product))
            {
                ViewBag.Documentation = "http://docs.telerik.com/kendo-ui/" + currentWidget.Documentation[product];
            }

            if (currentWidget.Forum != null && currentWidget.Forum.ContainsKey(product))
            {
                ViewBag.Forum = "http://www.telerik.com/forums/" + currentWidget.Forum[product];
            }

            if (currentWidget.CodeLibrary != null && currentWidget.CodeLibrary.ContainsKey(product))
            {
                ViewBag.CodeLibrary = "http://www.telerik.com/support/code-library/" + currentWidget.CodeLibrary[product];
            }
        }

        protected void FindCurrentExample()
        {
            var found = false;

            NavigationExample current = null;
            NavigationWidget currentWidget = null;

            foreach (NavigationWidget widget in ViewBag.Navigation)
            {
                foreach (NavigationExample example in widget.Items)
                {
                    if (example.ShouldInclude())
                    {
                        examplesUrl.Add("~/" + example.Url);
                    }

                    if (!found && IsCurrentExample(example.Url))
                    {
                        current = example;
                        currentWidget = widget;
                        found = true;
                    }
                }
            }

            ViewBag.CurrentWidget = currentWidget;

            if (currentWidget == null)
            {
                return;
            }

            //ViewBag.Mobile = (currentWidget.Mobile && !current.DisableInMobile) || current.Mobile;
            //ViewBag.MobileAngular = currentWidget.Mobile && current.Url.IndexOf("angular") > 0;
            ViewBag.CurrentExample = current;

            if (current.Title != null)
            {
                if (current.Title.ContainsKey("aspnet-mvc"))
                {
                    ViewBag.Title = current.Title["aspnet-mvc"];
                }
                else
                {
                    ViewBag.Title = current.Title["kendo-ui"];
                }
            }
            else
            {
                ViewBag.Title = current.Text;
            }

            if (current.Meta != null)
            {
                if (current.Meta.ContainsKey("aspnet-mvc"))
                {
                    ViewBag.Meta = current.Meta["aspnet-mvc"];
                }
                else
                {
                    ViewBag.Meta = current.Meta["kendo-ui"];
                }
            }
        }

        private bool IsCurrentExample(string url)
        {
            var section = ControllerContext.RouteData.GetRequiredString("controller").ToLower();
            var example = ControllerContext.RouteData.GetRequiredString("action").ToLower().Replace("_", "-");

            var components = url.Split('/');

            return (section == components[0] && example == components[1]) || (section == "upload" && example == "result" && components[0] == "upload" && components[1] == "index");
        }

        protected string Description(string product, NavigationExample example, NavigationWidget widget)
        {
            if (example.Description != null && example.Description.ContainsKey(product))
            {
                return example.Description[product];
            }
            else if (widget.Description != null && widget.Description.ContainsKey(product))
            {
                return widget.Description[product];
            }

            return null;
        }
    }
}

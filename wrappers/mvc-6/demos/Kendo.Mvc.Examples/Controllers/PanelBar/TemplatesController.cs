using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.UI;
using Kendo.Mvc.Examples.Models;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class PanelBarController : Controller
    {
        [Demo]
        public ActionResult Templates()
        {
            return View();
        }

        public ActionResult Read_TemplateData(string id)
        {
            IEnumerable<PanelBarItemViewModel> result;
            if (string.IsNullOrEmpty(id))
            {
                result = PanelBarRepository.GetProjectData().Select(o => o.Clone());
            }
            else
            {
                result = PanelBarRepository.GetChildren(id);
            }

            return Json(result);
        }

    }
}

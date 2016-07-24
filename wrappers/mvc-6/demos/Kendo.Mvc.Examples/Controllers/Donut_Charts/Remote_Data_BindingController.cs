using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Donut_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        private Dictionary<int, string> resolutionColors = new Dictionary<int, string>() { 
            {1,"#ccc"},
            {2,"#c00"}
        };

        [HttpPost]
        public ActionResult _WorldScreenResolution()
        {

            var screenResolutions = ChartDataRepository.WorldScreenResolution();
            var viewModel = new List<ScreenResolutionRemoteDataViewModel>();

            for (var i = 0; i < screenResolutions.Count; i++)
            {
                var data = screenResolutions[i];
                var model = new ScreenResolutionRemoteDataViewModel(data);
                if (model.Year == "2005" && model.Resolution == "1024x768")
                {
                    model.Color = resolutionColors[2];
                }
                else if (model.Resolution == "Other")
                {
                    model.Color = resolutionColors[1];
                }

                viewModel.Add(model);
            }

            return Json(viewModel);
        }
    }
}
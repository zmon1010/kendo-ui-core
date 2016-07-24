using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Range_Bar_ChartsController : Controller
    {
        public IActionResult Local_Data_Binding()
        {
            var viewModel = new List<RangeBarChartsLocalDataViewModel>();
            viewModel.Add(new RangeBarChartsLocalDataViewModel(0, 10, 0, 30, "Monday"));
            viewModel.Add(new RangeBarChartsLocalDataViewModel(10, 30, 30, 45, "Tuesday"));
            viewModel.Add(new RangeBarChartsLocalDataViewModel(30, 40, 45, 60, "Wednesday"));
            viewModel.Add(new RangeBarChartsLocalDataViewModel(40, 60, 60, 80, "Thursday"));
            viewModel.Add(new RangeBarChartsLocalDataViewModel(60, 100, 80, 100, "Friday"));

            return View(viewModel);
        }

    }
}

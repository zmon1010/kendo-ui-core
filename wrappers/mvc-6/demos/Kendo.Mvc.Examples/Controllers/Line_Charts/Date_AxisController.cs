

using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Line_ChartsController : Controller
    {
        public IActionResult Date_Axis()
        {
            return View(ChartDataRepository.DatePoints());
        }
    }
}
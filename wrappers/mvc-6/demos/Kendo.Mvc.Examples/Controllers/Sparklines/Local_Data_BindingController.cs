using Kendo.Mvc.Examples.Models;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SparklinesController : Controller
    {
        public IActionResult Local_Data_Binding()
        {
            return View(ChartDataRepository.CompensationData());
        }
    }
}
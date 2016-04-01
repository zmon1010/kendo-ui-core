using Kendo.Mvc.Examples.Models;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class Waterfall_ChartsController : Controller
    {
        public IActionResult Remote_Data_Binding()
        {
            return View();
        }

        [HttpPost]
        public IActionResult _PriceData()
        {
            var data = new PriceData[] {
                new PriceData
                {
                    Name = "List",
                    Value = 100
                },
                new PriceData
                {
                    Name = "List\nDiscount",
                    Value = -5
                },
                new PriceData
                {
                    Name = "Invoice",
                    Summary = "total"
                },
                new PriceData
                {
                    Name = "Invoice\nDiscount",
                    Value = -6
                },
                new PriceData
                {
                    Name = "Rebates",
                    Value = -3
                },
                new PriceData
                {
                    Name = "Errors",
                    Value = -1.10m
                },
                new PriceData
                {
                    Name = "Pocket\nPrice",
                    Summary = "total"
                },
                new PriceData
                {
                    Name = "Cost",
                    Value = -57.10m
                },
                new PriceData
                {
                    Name = "Handling",
                    Value = -0.50m
                },
                new PriceData
                {
                    Name = "Pocket\nMargin",
                    Summary = "total"
                }
            };

            return Json(data);
        }
    }
}
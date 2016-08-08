using System;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SliderController : Controller
    {
        [Demo]
        public IActionResult Right_To_Left_Support()
        {
            return View();
        }
    }
}
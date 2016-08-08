using System;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class SliderController : Controller
    {
        [Demo]
        public IActionResult Api()
        {
            return View();
        }
    }
}
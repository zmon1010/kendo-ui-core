using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class MediaPlayerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

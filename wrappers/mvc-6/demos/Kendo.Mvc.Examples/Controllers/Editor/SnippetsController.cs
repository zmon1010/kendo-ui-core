using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.Examples.Controllers
{


    public partial class EditorController : Controller
    {
        
        [FromServices]
        public IHostingEnvironment HostingEnvironment { get; set; }

        public IActionResult Snippets()
        {
            ViewData["path"] = Path.Combine(HostingEnvironment.WebRootPath, "/Snippets/snippet.html");
            return View();
        }
    }
}
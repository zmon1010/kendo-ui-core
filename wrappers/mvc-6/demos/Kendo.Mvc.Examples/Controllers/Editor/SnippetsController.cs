using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.Examples.Controllers
{


    public partial class EditorController : Controller
    {
        public IHostingEnvironment HostingEnvironment { get; set; }

        public EditorController(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        public IActionResult Snippets()
        {
            ViewData["path"] = Path.Combine(HostingEnvironment.WebRootPath, "/Snippets/snippet.html");
            return View();
        }
    }
}
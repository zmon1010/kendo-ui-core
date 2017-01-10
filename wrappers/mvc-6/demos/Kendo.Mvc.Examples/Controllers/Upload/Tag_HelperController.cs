using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using Kendo.Mvc.Examples.Models.Upload;
using Microsoft.Net.Http.Headers;
using System.IO;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class UploadController: Controller
    {
        public UploadConfigModel Config = new UploadConfigModel("jpeg", "png", "txt");

        [Demo]
        public ActionResult Tag_Helper()
        {
            return View(Config);
        }

        [Demo]
        public ActionResult SubmitFromTagHelper(IEnumerable<IFormFile> files)
        {
            IEnumerable<string> fileInfo = new List<string>();

            if (files != null)
            {
                fileInfo = GetFileInfo(files);
            }

            return View("ResultTagHelper", fileInfo);
        }

        [Demo]
        public ActionResult ResultTagHelper()
        {
            return View();
        }
    }
}

using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;
using Microsoft.Net.Http.Headers;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Kendo.Mvc.Examples.Controllers
{
    public partial class UploadController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

		public ActionResult Submit(IEnumerable<IFormFile> files)
		{
			IEnumerable<string> fileInfo = new List<string>();

            if (files != null)
			{
				fileInfo = GetFileInfo(files);
			}

			return View("Result", fileInfo);
		}

		public ActionResult Result()
		{
			return View();
		}

		private IEnumerable<string> GetFileInfo(IEnumerable<IFormFile> files)
		{
			List<string> fileInfo = new List<string>();

			foreach (var file in files)
			{
				var fileContent = ContentDispositionHeaderValue.Parse(file.ContentDisposition);
				var fileName = Path.GetFileName(fileContent.FileName.Trim('"'));

				fileInfo.Add(string.Format("{0} ({1} bytes)", fileName, file.Length));
			}

			return fileInfo;
		}
	}
}

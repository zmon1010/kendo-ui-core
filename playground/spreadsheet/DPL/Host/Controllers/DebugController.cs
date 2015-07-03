using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IOFile = System.IO.File;

namespace Host.Controllers
{
    public class DebugController : Controller
    {
        static readonly IDictionary<String, String> MimeTypes =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {
                { ".js", "application/x-javascript" },
                { ".json", "application/json" },
                { ".css", "text/css" },
                { ".less", "text/css" },
                { ".jpg", "image/jpg" },
                { ".gif", "image/gif" },
                { ".png", "image/png" },
                { ".svg", "image/svg+xml" },
                { ".eot", "application/vnd.ms-fontobject" },
                { ".ttf", "application/octet-stream" },
                { ".woff", "application/octet-stream" }
            };

        public ActionResult Resource(string url)
        {
            var root = Server.MapPath("~/");
            var path = Path.Combine(root, "..", "..", "..", "..", url);

            return StaticContent(path);
        }

        ActionResult StaticContent(string path)
        {
            var mimeType = MimeTypes[Path.GetExtension(path)];

            if (mimeType == null)
            {
                throw new HttpException(403, "Forbidden");
            }

            if (!IOFile.Exists(path))
            {
                throw new HttpException(404, "File Not Found");
            }

            return File(IOFile.ReadAllBytes(path), mimeType);
        }
	}
}
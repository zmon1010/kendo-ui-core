using Microsoft.AspNet.Http;
using Microsoft.AspNet.Mvc;

namespace Kendo.Mvc.UI
{
    public interface IFileBrowserController
    {
        JsonResult Read(string path);
        ActionResult Destroy(string path, FileBrowserEntry entry);
        ActionResult Create(string path, FileBrowserEntry entry);
        ActionResult Upload(string path, IFormFile file);
    }
}

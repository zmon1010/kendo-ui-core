using System.Collections.Generic;
using Microsoft.AspNet.Hosting;

namespace Kendo.Mvc.UI
{
    public interface IDirectoryBrowser
    {
        IEnumerable<FileBrowserEntry> GetFiles(string path, string filter);
        IEnumerable<FileBrowserEntry> GetDirectories(string path);        
        IHostingEnvironment Server { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNet.Hosting;

namespace Kendo.Mvc.UI
{
    public class DirectoryBrowser : IDirectoryBrowser
    {       
        public virtual IHostingEnvironment Server { get; set; }

        public IEnumerable<FileBrowserEntry> GetFiles(string path, string filter)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));
            var extensions = (filter ?? "*").Split(new string[] { ", ", ",", "; ", ";" }, StringSplitOptions.RemoveEmptyEntries);
            var files = extensions.SelectMany(directory.GetFiles)
                .Select(file => new FileBrowserEntry
                {
                    Name = file.Name,
                    Size = file.Length,
                    EntryType = FileBrowserEntryType.File
                });

            return files;
        }

        public IEnumerable<FileBrowserEntry> GetDirectories(string path)
        {
            var directory = new DirectoryInfo(Server.MapPath(path));

            return directory.GetDirectories()
                .Select(subDirectory => new FileBrowserEntry
                { 
                    Name = subDirectory.Name,
                    EntryType = FileBrowserEntryType.Directory
                });
        }        
    }
}

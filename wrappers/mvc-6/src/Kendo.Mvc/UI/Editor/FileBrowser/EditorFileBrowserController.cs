using System;
using System.IO;
using System.Linq;
using Kendo.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc;
using Microsoft.Data.Entity.Design.Internal;

namespace Kendo.Mvc.UI
{
    public abstract class EditorFileBrowserController : FileBrowserController
    {
        /// <summary>
        /// Gets the valid file extensions by which served files will be filtered.
        /// </summary>
        public override string Filter
        {
            get
            {
                return EditorFileBrowserSettings.DefaultFileTypes;
            }
        }
    }
}

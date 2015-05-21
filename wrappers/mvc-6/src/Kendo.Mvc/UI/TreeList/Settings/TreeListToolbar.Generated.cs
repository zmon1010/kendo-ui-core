using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListToolbar class
    /// </summary>
    public partial class TreeListToolbar<T> where T : class 
    {
        public string Name { get; set; }

        public string Text { get; set; }


        public TreeList<T> TreeList { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Name?.HasValue() == true)
            {
                settings["name"] = Name;
            }

            if (Text?.HasValue() == true)
            {
                settings["text"] = Text;
            }

            return settings;
        }
    }
}

using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBoxToolbarSettings class
    /// </summary>
    public partial class ListBoxToolbarSettings
    {
        public ListBoxToolbarSettings()
        {
            Tools = new List<string>();
        }

        public List<string> Tools { get; private set; }
        
        public Dictionary<string, object> Serialize()
        {
            var settings = SerializeSettings();

            // Do manual serialization here

            if (Tools?.Any() == true)
            {
                settings["tools"] = Tools;
            }

            return settings;
        }
    }
}

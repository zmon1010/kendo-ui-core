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
        public string Position { get; set; }

        public string[] Tools { get; set; }


        public ListBox ListBox { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Position?.HasValue() == true)
            {
                settings["position"] = Position;
            }

            if (Tools?.Any() == true)
            {
                settings["tools"] = Tools;
            }

            return settings;
        }
    }
}

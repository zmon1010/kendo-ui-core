using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBoxMessagesSettings class
    /// </summary>
    public partial class ListBoxMessagesSettings 
    {
        public ListBoxMessagesToolsSettings Tools { get; } = new ListBoxMessagesToolsSettings();


        public ListBox ListBox { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var tools = Tools.Serialize();
            if (tools.Any())
            {
                settings["tools"] = tools;
            }

            return settings;
        }
    }
}

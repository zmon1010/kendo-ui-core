using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBoxDraggableSettings class
    /// </summary>
    public partial class ListBoxDraggableSettings 
    {
        public ClientHandlerDescriptor Hint { get; set; }

        public ClientHandlerDescriptor Placeholder { get; set; }

        public bool? Enabled { get; set; }

        public ListBox ListBox { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Hint?.HasValue() == true)
            {
                settings["hint"] = Hint;
            }

            if (Placeholder?.HasValue() == true)
            {
                settings["placeholder"] = Placeholder;
            }

            return settings;
        }
    }
}

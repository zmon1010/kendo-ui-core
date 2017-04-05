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
    public partial class ListBoxDraggableSettings<T> where T : class 
    {
        public ClientHandlerDescriptor Placeholder { get; set; }

        public bool? Enabled { get; set; }

        public ListBox<T> ListBox { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Placeholder?.HasValue() == true)
            {
                settings["placeholder"] = Placeholder;
            }

            return settings;
        }
    }
}

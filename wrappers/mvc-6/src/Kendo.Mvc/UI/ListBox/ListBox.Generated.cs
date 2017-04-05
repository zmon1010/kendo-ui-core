using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ListBox component
    /// </summary>
    public partial class ListBox<T> where T : class 
    {
        public bool? AutoBind { get; set; }

        public string ConnectWith { get; set; }

        public string DataTextField { get; set; }

        public string DataValueField { get; set; }

        public bool? Disabled { get; set; }

        public ClientHandlerDescriptor Hint { get; set; }

        public ListBoxDraggableSettings<T> Draggable { get; } = new ListBoxDraggableSettings<T>();

        public string[] DropSources { get; set; }

        public double? Height { get; set; }

        public bool? Navigatable { get; set; }

        public bool? Reorderable { get; set; }

        public string Selectable { get; set; }

        public ListBoxToolbarSettings<T> Toolbar { get; } = new ListBoxToolbarSettings<T>();


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (ConnectWith?.HasValue() == true)
            {
                settings["connectWith"] = ConnectWith;
            }

            if (DataTextField?.HasValue() == true)
            {
                settings["dataTextField"] = DataTextField;
            }

            if (DataValueField?.HasValue() == true)
            {
                settings["dataValueField"] = DataValueField;
            }

            if (Disabled.HasValue)
            {
                settings["disabled"] = Disabled;
            }

            if (Hint?.HasValue() == true)
            {
                settings["hint"] = Hint;
            }

            var draggable = Draggable.Serialize();
            if (draggable.Any())
            {
                settings["draggable"] = draggable;
            }
            else if (Draggable.Enabled.HasValue)
            {
                settings["draggable"] = Draggable.Enabled;
            }

            if (DropSources?.Any() == true)
            {
                settings["dropSources"] = DropSources;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            if (Navigatable.HasValue)
            {
                settings["navigatable"] = Navigatable;
            }

            if (Reorderable.HasValue)
            {
                settings["reorderable"] = Reorderable;
            }

            if (Selectable?.HasValue() == true)
            {
                settings["selectable"] = Selectable;
            }

            var toolbar = Toolbar.Serialize();
            if (toolbar.Any())
            {
                settings["toolbar"] = toolbar;
            }

            return settings;
        }
    }
}

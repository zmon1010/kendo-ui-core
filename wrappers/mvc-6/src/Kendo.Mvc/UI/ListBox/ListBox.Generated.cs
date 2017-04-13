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
    public partial class ListBox 
    {
        public bool? AutoBind { get; set; }

        public string ConnectWith { get; set; }

        public string DataTextField { get; set; }

        public string DataValueField { get; set; }

        public ClientHandlerDescriptor Hint { get; set; }

        public ListBoxDraggableSettings Draggable { get; } = new ListBoxDraggableSettings();

        public string[] DropSources { get; set; }

        public double? Height { get; set; }

        public bool? Navigatable { get; set; }

        public ListBoxMessagesSettings Messages { get; } = new ListBoxMessagesSettings();

        public bool? Reorderable { get; set; }

        public ClientHandlerDescriptor Template { get; set; }

        public string TemplateId { get; set; }

        public ListBoxToolbarSettings Toolbar { get; } = new ListBoxToolbarSettings();

        public ListBoxSelectable? Selectable { get; set; }


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

            var messages = Messages.Serialize();
            if (messages.Any())
            {
                settings["messages"] = messages;
            }

            if (Reorderable.HasValue)
            {
                settings["reorderable"] = Reorderable;
            }

            if (TemplateId.HasValue())
            {
                settings["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, TemplateId
                    )
                };
            }
            else if (Template.HasValue())
            {
                settings["template"] = Template;
            }

            var toolbar = Toolbar.Serialize();
            if (toolbar.Any())
            {
                settings["toolbar"] = toolbar;
            }

            if (Selectable.HasValue)
            {
                settings["selectable"] = Selectable?.Serialize();
            }

            return settings;
        }
    }
}

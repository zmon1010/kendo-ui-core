using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI ComboBox component
    /// </summary>
    public partial class ComboBox 
    {
        public bool? AutoBind { get; set; }

        public string CascadeFrom { get; set; }

        public string CascadeFromField { get; set; }

        public string DataTextField { get; set; }

        public string DataValueField { get; set; }

        public double? Delay { get; set; }

        public bool? Enable { get; set; }

        public string FixedGroupTemplate { get; set; }

        public string FixedGroupTemplateId { get; set; }

        public string GroupTemplate { get; set; }

        public string GroupTemplateId { get; set; }

        public double? Height { get; set; }

        public bool? HighlightFirst { get; set; }

        public bool? IgnoreCase { get; set; }

        public double? MinLength { get; set; }

        public string Placeholder { get; set; }

        public ComboBoxPopupSettings Popup { get; } = new ComboBoxPopupSettings();

        public bool? Suggest { get; set; }

        public string HeaderTemplate { get; set; }

        public string HeaderTemplateId { get; set; }

        public string Template { get; set; }

        public string TemplateId { get; set; }

        public string Text { get; set; }

        public string Value { get; set; }

        public bool? ValuePrimitive { get; set; }

        public ComboBoxVirtualSettings Virtual { get; } = new ComboBoxVirtualSettings();

        public FilterType? Filter { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (CascadeFrom?.HasValue() == true)
            {
                settings["cascadeFrom"] = CascadeFrom;
            }

            if (CascadeFromField?.HasValue() == true)
            {
                settings["cascadeFromField"] = CascadeFromField;
            }

            if (DataTextField?.HasValue() == true)
            {
                settings["dataTextField"] = DataTextField;
            }

            if (DataValueField?.HasValue() == true)
            {
                settings["dataValueField"] = DataValueField;
            }

            if (Delay.HasValue)
            {
                settings["delay"] = Delay;
            }

            if (Enable.HasValue)
            {
                settings["enable"] = Enable;
            }

            if (FixedGroupTemplateId.HasValue())
            {
                settings["fixedGroupTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, FixedGroupTemplateId
                    )
                };
            }
            else if (FixedGroupTemplate.HasValue())
            {
                settings["fixedGroupTemplate"] = FixedGroupTemplate;
            }

            if (GroupTemplateId.HasValue())
            {
                settings["groupTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, GroupTemplateId
                    )
                };
            }
            else if (GroupTemplate.HasValue())
            {
                settings["groupTemplate"] = GroupTemplate;
            }

            if (Height.HasValue)
            {
                settings["height"] = Height;
            }

            if (HighlightFirst.HasValue)
            {
                settings["highlightFirst"] = HighlightFirst;
            }

            if (IgnoreCase.HasValue)
            {
                settings["ignoreCase"] = IgnoreCase;
            }

            if (MinLength.HasValue)
            {
                settings["minLength"] = MinLength;
            }

            if (Placeholder?.HasValue() == true)
            {
                settings["placeholder"] = Placeholder;
            }

            var popup = Popup.Serialize();
            if (popup.Any())
            {
                settings["popup"] = popup;
            }

            if (Suggest.HasValue)
            {
                settings["suggest"] = Suggest;
            }

            if (HeaderTemplateId.HasValue())
            {
                settings["headerTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, HeaderTemplateId
                    )
                };
            }
            else if (HeaderTemplate.HasValue())
            {
                settings["headerTemplate"] = HeaderTemplate;
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

            if (Text?.HasValue() == true)
            {
                settings["text"] = Text;
            }

            if (Value?.HasValue() == true)
            {
                settings["value"] = Value;
            }

            if (ValuePrimitive.HasValue)
            {
                settings["valuePrimitive"] = ValuePrimitive;
            }

            var @virtual = Virtual.Serialize();
            if (@virtual.Any())
            {
                settings["virtual"] = @virtual;
            }
            else if (Virtual.Enabled.HasValue)
            {
                settings["virtual"] = Virtual.Enabled;
            }

            if (Filter.HasValue)
            {
                settings["filter"] = Filter?.Serialize();
            }

            return settings;
        }
    }
}

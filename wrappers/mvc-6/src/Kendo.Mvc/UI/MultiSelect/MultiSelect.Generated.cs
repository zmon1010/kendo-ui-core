using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI MultiSelect component
    /// </summary>
    public partial class MultiSelect 
    {
        public bool? AutoBind { get; set; }

        public bool? AutoClose { get; set; }

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

        public double? MaxSelectedItems { get; set; }

        public string Placeholder { get; set; }

        public MultiSelectPopupSettings Popup { get; } = new MultiSelectPopupSettings();

        public string HeaderTemplate { get; set; }

        public string HeaderTemplateId { get; set; }

        public string ItemTemplate { get; set; }

        public string ItemTemplateId { get; set; }

        public string TagTemplate { get; set; }

        public string TagTemplateId { get; set; }

        public MultiSelectTagMode? TagMode { get; set; }

        public bool? ValuePrimitive { get; set; }

        public MultiSelectVirtualSettings Virtual { get; } = new MultiSelectVirtualSettings();

        public FilterType? Filter { get; set; }


        protected override Dictionary<string, object> SerializeSettings()
        {
            var settings = base.SerializeSettings();

            if (AutoBind.HasValue)
            {
                settings["autoBind"] = AutoBind;
            }

            if (AutoClose.HasValue)
            {
                settings["autoClose"] = AutoClose;
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

            if (MaxSelectedItems.HasValue)
            {
                settings["maxSelectedItems"] = MaxSelectedItems;
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

            if (ItemTemplateId.HasValue())
            {
                settings["itemTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, ItemTemplateId
                    )
                };
            }
            else if (ItemTemplate.HasValue())
            {
                settings["itemTemplate"] = ItemTemplate;
            }

            if (TagTemplateId.HasValue())
            {
                settings["tagTemplate"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('{0}{1}').html()", IdPrefix, TagTemplateId
                    )
                };
            }
            else if (TagTemplate.HasValue())
            {
                settings["tagTemplate"] = TagTemplate;
            }

            if (TagMode.HasValue)
            {
                settings["tagMode"] = TagMode?.Serialize();
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
            else if (Virtual.Enabled == true)
            {
                settings["virtual"] = true;
            }

            if (Filter.HasValue)
            {
                settings["filter"] = Filter?.Serialize();
            }

            return settings;
        }
    }
}

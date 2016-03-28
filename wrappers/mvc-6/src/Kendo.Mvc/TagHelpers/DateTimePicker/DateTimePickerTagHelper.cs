using Microsoft.AspNet.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.TagHelpers;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.ComponentModel.DataAnnotations;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI DateTimePicker TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-datetimepicker")]
    public partial class DateTimePickerTagHelper : TagHelperBase
    {
        /// <summary>
        /// An expression to be evaluated against the current model.
        /// </summary>
        public ModelExpression For { get; set; }

        /// <summary>
        /// MonthTemplateId to be used for rendering the cells of the Calendar.
        /// </summary>
        public string MonthTemplateId { get; set; }

        /// <summary>
        /// Templates for the cells rendered in the "month" view.
        /// </summary>
        public string MonthTemplate { get; set; }

        public DateTimePickerTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            ModelMetadata metadata = null;

            if (For != null)
            {
                metadata = For.Metadata;
                Name = For.Name;

                Value = Value ?? For.Model as DateTime?;

                Format = ExtractEditFormat(For.ModelExplorer.Metadata.EditFormatString);

                RangeAttribute rangeAttribute = Generator.GetRangeValidationAttribute(ViewContext, metadata, Name);

                if (rangeAttribute != null)
                {
                    Min = Min ?? (DateTime)Convert.ChangeType(rangeAttribute.Minimum, typeof(DateTime));
                    Max = Max ?? (DateTime)Convert.ChangeType(rangeAttribute.Maximum, typeof(DateTime));
                }
            }

            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            var tagBuilder = Generator.GenerateDateTimeInput(ViewContext, metadata,
                Id, Name, Value, Format, htmlAttributes);

            output.TagName = "input";
            output.TagMode = TagMode.SelfClosing;

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            if (MonthTemplateId?.HasValue() == true)
            {
                settings["month"] = new { content = new ClientHandlerDescriptor {
                    HandlerName = string.Format("jQuery('{0}{1}').html()", IdPrefix, MonthTemplateId) } };
            }
            else if (MonthTemplate?.HasValue() == true)
            {
                settings["month"] = new { content = MonthTemplate };
            }

            var initializationScript = Initializer.Initialize(Selector, "DateTimePicker", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}


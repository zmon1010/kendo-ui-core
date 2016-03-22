using Microsoft.AspNet.Razor.TagHelpers;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.TagHelpers;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc.ModelBinding;
using System;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI TimePicker TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-timepicker")]
    public partial class TimePickerTagHelper : TagHelperBase
    {
        /// <summary>
        /// An expression to be evaluated against the current model.
        /// </summary>
        public ModelExpression For { get; set; }

        public TimePickerTagHelper(IKendoHtmlGenerator generator) : base(generator)
        {
        }

        protected override void WriteHtml(TagHelperOutput output)
        {
            ModelMetadata metadata = null;

            if (For != null)
            {
                metadata = For.Metadata;
                Name = For.Name;

                if (Value == null)
                {
                    Value = For.Model as DateTime?;
                }

                Format = ExtractEditFormat(For.ModelExplorer.Metadata.EditFormatString);
            }

            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            var tagBuilder = Generator.GenerateTimeInput(ViewContext, metadata,
                Id, Name, Value, Format, htmlAttributes);

            output.TagName = "input";
            output.TagMode = TagMode.SelfClosing;

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            var initializationScript = Initializer.Initialize(Selector, "TimePicker", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}


using Microsoft.AspNet.Razor.TagHelpers;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.ModelBinding;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.TagHelpers;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    /// <summary>
    /// Kendo UI NumericTextBox TagHelper
    /// </summary>
    [HtmlTargetElement("kendo-numerictextbox")]
    public partial class NumericTextBoxTagHelper : TagHelperBase
    {
        /// <summary>
        /// An expression to be evaluated against the current model.
        /// </summary>
        public ModelExpression For { get; set; }

        public NumericTextBoxTagHelper(IKendoHtmlGenerator generator) : base(generator)
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
                    Value = For.Model;
                }
            }

            GenerateId(output);

            var htmlAttributes = new Dictionary<string, object>();

            if (!Enable.GetValueOrDefault(true))
            {
                htmlAttributes.Add("disabled", "disabled");
            }

            if (Min != null)
            {
                htmlAttributes.Add("min", "{0}".FormatWith(Min));
            }

            if (Max != null)
            {
                htmlAttributes.Add("max", "{0}".FormatWith(Max));
            }

            if (Step != null)
            {
                htmlAttributes.Add("step", "{0}".FormatWith(Step));
            }

            var tagBuilder = Generator.GenerateNumericInput(ViewContext, metadata,
                Id, Name, Value, string.Empty, htmlAttributes);

            output.TagName = "input";

            output.MergeAttributes(tagBuilder);
        }

        protected override void WriteInitializationScript(TagHelperOutput output)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            var initializationScript = Initializer.Initialize(Selector, "NumericTextBox", settings);

            output.PostElement.SetHtmlContent("<script>" + initializationScript + "</script>");
        }
    }
}


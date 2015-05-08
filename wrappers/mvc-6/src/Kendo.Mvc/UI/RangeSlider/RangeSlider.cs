using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using Microsoft.AspNet.Mvc.Rendering;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI RangeSlider component
    /// </summary>
    public partial class RangeSlider<T> : WidgetBase, IWidget
        where T : struct, IComparable 
    {
        public RangeSlider(ViewContext viewContext) : base(viewContext)
        {
        }

        public string LeftDragHandleTitle { get; set; }

        public string RightDragHandleTitle { get; set; }

        protected override void WriteHtml(TextWriter writer)
        {
            if (!SelectionStart.HasValue)
            {
                SelectionStart = Min;
            }

            if (!SelectionEnd.HasValue)
            {
                SelectionEnd = Max;
            }

            if (!LargeStep.HasValue)
            {
                LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (LargeStep.Value.CompareTo(SmallStep) < 0)
                {
                    LargeStep = SmallStep;
                }
            }

            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider).Metadata;
            var wrapper = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);
            wrapper.MergeAttributes(Generator.GetValidationAttributes(ViewContext, metadata, Name));

            var firstInput = Generator.GenerateTag("input", ViewContext, Id, 
                             string.Format("{0}[0]", Name), HtmlAttributes);
            firstInput.Attributes.Remove(Id);

            if (SelectionStart.HasValue)
            {
                firstInput.MergeAttribute("value", this.GetValue("{0}[0]".FormatWith(Name), SelectionStart));
            }

            var secondInput = Generator.GenerateTag("input", ViewContext, Id,
                              string.Format("{0}[1]", Name), HtmlAttributes);
            secondInput.Attributes.Remove(Id);

            if (SelectionEnd.HasValue)
            {
                secondInput.MergeAttribute("value", this.GetValue("{0}[1]".FormatWith(Name), SelectionEnd));
            }

            var defaultOptions = new Dictionary<string, object>();
            defaultOptions.Add("type", "range");

            if (SmallStep.HasValue)
            {
                defaultOptions.Add("step", SmallStep);
            }

            if (Min.HasValue)
            {
                defaultOptions.Add("min", Min);
            }

            if (Max.HasValue)
            {
                defaultOptions.Add("max", Max);
            }

            firstInput.MergeAttributes(defaultOptions);
            secondInput.MergeAttributes(defaultOptions);

            writer.Write(wrapper.ToString(TagRenderMode.StartTag));

            writer.Write(firstInput.ToString(TagRenderMode.SelfClosing));
            writer.Write(secondInput.ToString(TagRenderMode.SelfClosing));

            writer.Write(wrapper.ToString(TagRenderMode.EndTag));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (LeftDragHandleTitle.HasValue())
            {
                settings["leftDragHandleTitle"] = LeftDragHandleTitle;
            }

            if (RightDragHandleTitle.HasValue())
            {
                settings["rightDragHandleTitle"] = RightDragHandleTitle;
            }

            writer.Write(Initializer.Initialize(Selector, "RangeSlider", settings));
        }
    }
}


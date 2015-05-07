using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System.Globalization;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Slider component
    /// </summary>
    public partial class Slider<T> : WidgetBase, IInputComponent<T>
        where T : struct, IComparable
    {
        public string DragHandleTitle { get; set; }

        public Slider(ViewContext viewContext) : base(viewContext)
        {
        }

        protected override void WriteHtml(TextWriter writer)
        {
            Func<object, T?> converter = val =>
            {
                return ((T)Convert.ChangeType(val, typeof(T)));
            };

            string value = this.GetAttemptedValue();
            if (value == null)
            {
                T? result = this.GetValue(converter);

                if (!result.HasValue)
                {
                    result = Min;
                }
                CultureInfo info = CultureInfo.CurrentCulture;
                value = string.Format(info, "{0}", result);
            }

            if (!LargeStep.HasValue)
            {
                LargeStep = (T)Convert.ChangeType(5, typeof(T));
                if (LargeStep.Value.CompareTo(SmallStep) < 0)
                {
                    LargeStep = SmallStep;
                }
            }

            var explorer = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider);
            var tag = Generator.GenerateRangeInput(ViewContext, explorer.Metadata, Id, Name, Value, HtmlAttributes);

            if (SmallStep.HasValue)
            {
                tag.MergeAttribute("step", SmallStep.ToString());
            }

            if (Min.HasValue)
            {
                tag.MergeAttribute("min", Min.ToString());
            }

            if (Max.HasValue)
            {
                tag.MergeAttribute("max", Max.ToString());
            }

            if (Value.HasValue == false)
            {
                tag.Attributes.Remove("value");
            }

            writer.Write(tag.ToString(TagRenderMode.SelfClosing));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            if (DragHandleTitle.HasValue())
            {
                settings["dragHandleTitle"] = DragHandleTitle;
            }

            writer.Write(Initializer.Initialize(Selector, "Slider", settings));
        }
    }
}


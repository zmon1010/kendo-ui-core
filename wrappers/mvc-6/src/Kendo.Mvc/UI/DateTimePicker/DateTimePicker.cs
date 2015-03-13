using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Rendering.Expressions;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateTimePicker component
    /// </summary>
    public partial class DateTimePicker : WidgetBase, IInputComponent<DateTime>
    {
        public DateTimePicker(ViewContext viewContext) : base(viewContext)
        {
            Enabled = true;
            Value = null;
        }

        public CultureInfo CultureInfo
        {
            get
            {
                CultureInfo info = null;
                if (Culture.HasValue())
                {
                    info = new CultureInfo(Culture);
                }
                else
                {
                    info = CultureInfo.CurrentCulture;
                }

                return info;
            }
        }

        public bool Enabled
        {
            get;
            set;
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var metadata = ExpressionMetadataProvider.FromStringExpression(Name, HtmlHelper.ViewData, HtmlHelper.MetadataProvider);
            var tag = Generator.GenerateDateTimeInput(ViewContext, metadata, Id, Name, Value, Format, HtmlAttributes);

            if (!Enabled)
            {
                tag.MergeAttribute("disabled", "disabled");
            }

            writer.Write(tag.ToString(TagRenderMode.SelfClosing));

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "DateTimePicker", settings));
        }
    }
}


using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Resources;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Internal;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DateInput component
    /// </summary>
    public partial class DateInput : WidgetBase
        
    {
        public DateInput(ViewContext viewContext) : base(viewContext)
        {
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("input", ViewContext, Id, Name, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "DateInput", settings));
        }
    }
}


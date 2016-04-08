using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI Editor component
    /// </summary>
    public partial class Editor : WidgetBase
        
    {
        public Editor(ViewContext viewContext) : base(viewContext)
        {
        }

        public List<string> StyleSheets { get; set; } = new List<string>();

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            if (StyleSheets.Count > 0)
            {
                settings["stylesheets"] = StyleSheets;
            }

            writer.Write(Initializer.Initialize(Selector, "Editor", settings));
        }
    }
}


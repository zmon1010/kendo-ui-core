using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeList component
    /// </summary>
    public partial class TreeList<T> : WidgetBase
        where T : class 
    {
        public TreeList(ViewContext viewContext) : base(viewContext)
        {
        }

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            // Do custom rendering here

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Manually serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "TreeList", settings));
        }
    }
}


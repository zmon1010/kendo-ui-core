using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI PivotConfigurator component
    /// </summary>
    public partial class PivotConfigurator : WidgetBase
        
    {
        public PivotConfigurator(ViewContext viewContext) : base(viewContext)
        {
        }

        public PivotConfiguratorMessages Messages
        {
            get;            
        } = new PivotConfiguratorMessages();

        protected override void WriteHtml(TextWriter writer)
        {
            var tag = Generator.GenerateTag("div", ViewContext, Id, Name, HtmlAttributes);

            writer.Write(tag.ToString());

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            var messages = Messages.ToJson();
            if (messages.Count > 0)
            {
                settings["messages"] = messages;
            }


            writer.Write(Initializer.Initialize(Selector, "PivotConfigurator", settings));
        }
    }
}


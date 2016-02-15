using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.RegularExpressions;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI DropDownList component
    /// </summary>
    public partial class DropDownList : WidgetBase
    {
        private static readonly Regex EscapeRegex = new Regex(@"([;&,\.\+\*~'\:\""\!\^\$\[\]\(\)\|\/])", RegexOptions.Compiled);

        public DataSource DataSource
        {
            get;
            private set;
        }

        public DropDownList(ViewContext viewContext) : base(viewContext)
        {
            DataSource = new DataSource(ModelMetadataProvider);
        }

        protected override void WriteHtml(TextWriter writer)
        {
            if (Enable == false)
            {
                HtmlAttributes.Merge("disabled", "disabled", true);
            }

            var tag = Generator.GenerateTextInput(ViewContext, null, Id, Name, Value, string.Empty, HtmlAttributes);

            tag.WriteTo(writer, HtmlEncoder);

            base.WriteHtml(writer);
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            if (DataSource.ServerFiltering && !DataSource.Transport.Read.Data.HasValue() &&
                DataSource.Type != DataSourceType.Custom && DataSource.Type != DataSourceType.Ajax)
            {
                DataSource.Transport.Read.Data = new ClientHandlerDescriptor
                {
                    HandlerName = "function() { return kendo.ui.DropDownList.requestData(jQuery(\"" + EscapeRegex.Replace(Selector, @"\\$1") + "\")); }"
                };
            }

            var settings = SerializeSettings();

            if (!string.IsNullOrEmpty(DataSource.Transport.Read.Url) ||
                !string.IsNullOrEmpty(DataSource.Transport.Read.ActionName) ||
                DataSource.Type == DataSourceType.Custom)
            {
                settings["dataSource"] = DataSource.ToJson();
            }
            else if (DataSource.Data != null)
            {
                settings["dataSource"] = DataSource.Data;
            }

            writer.Write(Initializer.Initialize(Selector, "DropDownList", settings));
        }
    }
}


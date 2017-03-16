namespace Kendo.Mvc.UI
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;
    using Kendo.Mvc.Extensions;

    public class DateInput : WidgetBase
    {
        private readonly IUrlGenerator urlGenerator;

        public DateInput(ViewContext viewContext, IJavaScriptInitializer initializer, IUrlGenerator urlGenerator)
            : base(viewContext, initializer)
        {
            this.urlGenerator = urlGenerator;
//>> Initialization
        
        //<< Initialization
        }

//>> Fields
        
        public string Format { get; set; }
        
        public DateTime? Max { get; set; }
        
        public DateTime? Min { get; set; }
        
        public DateTime? Value { get; set; }
        
        //<< Fields

        public override void WriteInitializationScript(TextWriter writer)
        {
            var json = new Dictionary<string, object>(Events);

//>> Serialization
        
            if (Format.HasValue())
            {
                json["format"] = Format;
            }
            
            if (Max.HasValue)
            {
                json["max"] = Max;
            }
                
            if (Min.HasValue)
            {
                json["min"] = Min;
            }
                
            if (Value.HasValue)
            {
                json["value"] = Value;
            }
                
        //<< Serialization

            writer.Write(Initializer.Initialize(Selector, "DateInput", json));

            base.WriteInitializationScript(writer);
        }

        protected override void WriteHtml(HtmlTextWriter writer)
        {
            var html = new DateInputHtmlBuilder(this).Build();

            html.WriteTo(writer);

            base.WriteHtml(writer);
        }
    }
}


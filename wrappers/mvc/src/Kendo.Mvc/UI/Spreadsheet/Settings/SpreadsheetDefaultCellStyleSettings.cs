namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class SpreadsheetDefaultCellStyleSettings : JsonObject
    {
        public SpreadsheetDefaultCellStyleSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Background { get; set; }
        
        public string Color { get; set; }
        
        public string FontFamily { get; set; }
        
        public string FontSize { get; set; }
        
        public bool? Italic { get; set; }
        
        public bool? Bold { get; set; }
        
        public bool? Underline { get; set; }
        
        public bool? Wrap { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Background.HasValue())
            {
                json["background"] = Background;
            }
            
            if (Color.HasValue())
            {
                json["color"] = Color;
            }
            
            if (FontFamily.HasValue())
            {
                json["fontFamily"] = FontFamily;
            }
            
            if (FontSize.HasValue())
            {
                json["fontSize"] = FontSize;
            }
            
            if (Italic.HasValue)
            {
                json["Italic"] = Italic;
            }
                
            if (Bold.HasValue)
            {
                json["bold"] = Bold;
            }
                
            if (Underline.HasValue)
            {
                json["underline"] = Underline;
            }
                
            if (Wrap.HasValue)
            {
                json["wrap"] = Wrap;
            }
                
        //<< Serialization
        }
    }
}

namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class SpreadsheetSheetRowCell : JsonObject
    {
        public SpreadsheetSheetRowCell()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Background { get; set; }
        
        public string Color { get; set; }
        
        public string FontFamily { get; set; }
        
        public double? FontSize { get; set; }
        
        public bool? Italic { get; set; }
        
        public bool? Bold { get; set; }
        
        public string Format { get; set; }
        
        public string Formula { get; set; }
        
        public int? Index { get; set; }
        
        public string TextAlign { get; set; }
        
        public bool? Underline { get; set; }
        
        public string VerticalAlign { get; set; }
        
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
            
            if (FontSize.HasValue)
            {
                json["fontSize"] = FontSize;
            }
                
            if (Italic.HasValue)
            {
                json["italic"] = Italic;
            }
                
            if (Bold.HasValue)
            {
                json["bold"] = Bold;
            }
                
            if (Format.HasValue())
            {
                json["format"] = Format;
            }
            
            if (Formula.HasValue())
            {
                json["formula"] = Formula;
            }
            
            if (Index.HasValue)
            {
                json["index"] = Index;
            }
                
            if (TextAlign.HasValue())
            {
                json["textAlign"] = TextAlign;
            }
            
            if (Underline.HasValue)
            {
                json["underline"] = Underline;
            }
                
            if (VerticalAlign.HasValue())
            {
                json["verticalAlign"] = VerticalAlign;
            }
            
            if (Wrap.HasValue)
            {
                json["wrap"] = Wrap;
            }
                
        //<< Serialization
        }
    }
}

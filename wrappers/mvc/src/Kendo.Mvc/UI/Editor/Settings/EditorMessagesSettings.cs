namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    /* 
     * This class inherits the EditorMessages class 
     * in order to utilize server-side localization.
     */
    public class EditorMessagesSettings : EditorMessages
    {
        public EditorMessagesSettings()
            :base()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Style { get; set; }
        
        public string EditAreaTitle { get; set; }
        
        public string ImageWidth { get; set; }
        
        public string ImageHeight { get; set; }
        
        public string FileWebAddress { get; set; }
        
        public string FileTitle { get; set; }
        
        public string CreateTableHint { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Style.HasValue())
            {
                json["style"] = Style;
            }
            
            if (EditAreaTitle.HasValue())
            {
                json["editAreaTitle"] = EditAreaTitle;
            }
            
            if (ImageWidth.HasValue())
            {
                json["imageWidth"] = ImageWidth;
            }
            
            if (ImageHeight.HasValue())
            {
                json["imageHeight"] = ImageHeight;
            }
            
            if (FileWebAddress.HasValue())
            {
                json["fileWebAddress"] = FileWebAddress;
            }
            
            if (FileTitle.HasValue())
            {
                json["fileTitle"] = FileTitle;
            }
            
            if (CreateTableHint.HasValue())
            {
                json["createTableHint"] = CreateTableHint;
            }
            
        //<< Serialization

            base.Serialize(json);
        }
    }
}

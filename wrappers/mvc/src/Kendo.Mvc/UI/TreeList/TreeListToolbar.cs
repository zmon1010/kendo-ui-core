namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class TreeListToolbar : JsonObject
    {
        public TreeListToolbar()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Click { get; set; }
        
        public string Name { get; set; }
        
        public string Text { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Click.HasValue())
            {
                json["click"] = Click;
            }
            
            if (Name.HasValue())
            {
                json["name"] = Name;
            }
            
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
        //<< Serialization
        }
    }
}

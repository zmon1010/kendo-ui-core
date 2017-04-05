namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ListBoxToolbarSettings : JsonObject
    {
        public ListBoxToolbarSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Position { get; set; }
        
        public string[] Tools { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Position.HasValue())
            {
                json["position"] = Position;
            }
            
            if (Tools != null)
            {
                json["tools"] = Tools;
            }
            
        //<< Serialization
        }
    }
}

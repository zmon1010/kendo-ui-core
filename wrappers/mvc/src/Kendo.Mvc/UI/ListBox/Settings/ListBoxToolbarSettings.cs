namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using Fluent;

    public class ListBoxToolbarSettings : JsonObject
    {
        public ListBoxToolbarSettings()
        {
            Tools = new List<string>();

            //>> Initialization
        
        //<< Initialization
        }

        public List<string> Tools { get; set; }

        public ListBoxToolbarPosition? Position { get; set; }

        //>> Fields
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
        //<< Serialization

            if (Position.HasValue)
            {
                json["position"] = Position.Value.Serialize();
            }

            if (Tools != null)
            {
                json["tools"] = Tools;
            }
        }
    }
}

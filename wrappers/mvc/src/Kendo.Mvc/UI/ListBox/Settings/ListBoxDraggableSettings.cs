namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ListBoxDraggableSettings : JsonObject
    {
        public ListBoxDraggableSettings()
        {
            Enabled = false;
        
            //>> Initialization
        
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Placeholder { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Placeholder.HasValue())
            {
                json["placeholder"] = Placeholder;
            }
            
        //<< Serialization
        }
    }
}

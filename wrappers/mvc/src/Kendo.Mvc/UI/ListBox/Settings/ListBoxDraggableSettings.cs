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

        public ClientHandlerDescriptor Placeholder { get; set; }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Hint { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Placeholder != null)
            {
                json["placeholder"] = Placeholder;
            }

            //>> Serialization
        
            if (Hint.HasValue())
            {
                json["hint"] = Hint;
            }
            
        //<< Serialization
        }
    }
}

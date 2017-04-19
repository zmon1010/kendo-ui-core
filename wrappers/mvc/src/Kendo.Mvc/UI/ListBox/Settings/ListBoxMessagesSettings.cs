namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class ListBoxMessagesSettings : JsonObject
    {
        public ListBoxMessagesSettings()
        {
            //>> Initialization
        
            Tools = new ListBoxMessagesToolsSettings();
                
        //<< Initialization
        }

        //>> Fields
        
        public ListBoxMessagesToolsSettings Tools
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var tools = Tools.ToJson();
            if (tools.Any())
            {
                json["tools"] = tools;
            }
        //<< Serialization
        }
    }
}

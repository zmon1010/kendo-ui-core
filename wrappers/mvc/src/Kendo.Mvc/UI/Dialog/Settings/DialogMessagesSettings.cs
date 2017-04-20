namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DialogMessagesSettings : JsonObject
    {
        public DialogMessagesSettings()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Close { get; set; }
        
        public string PromptInput { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Close.HasValue())
            {
                json["close"] = Close;
            }
            
            if (PromptInput.HasValue())
            {
                json["promptInput"] = PromptInput;
            }
            
        //<< Serialization
        }
    }
}

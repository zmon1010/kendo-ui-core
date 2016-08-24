namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DialogAction : JsonObject
    {
        public DialogAction()
        {
            //>> Initialization
        
        //<< Initialization

            Action = new ClientHandlerDescriptor();
        }

        //>> Fields
        
        public string Text { get; set; }
        
        public ClientHandlerDescriptor Action { get; set; }
        
        public bool? Primary { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Text.HasValue())
            {
                json["text"] = Text;
            }
            
            if (Action.HasValue())
            {
                json["action"] = Action;
            }
            
            if (Primary.HasValue)
            {
                json["primary"] = Primary;
            }
                
        //<< Serialization
        }
    }
}

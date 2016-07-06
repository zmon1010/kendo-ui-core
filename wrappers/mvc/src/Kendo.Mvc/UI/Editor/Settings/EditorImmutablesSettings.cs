namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class EditorImmutablesSettings : JsonObject
    {
        public EditorImmutablesSettings()
        {
            Enabled = false;

            //>> Initialization
        
        //<< Initialization
            SerializationHandler = new ClientHandlerDescriptor();
            Deserialization = new ClientHandlerDescriptor();
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public string Serialization { get; set; }
        
        //<< Fields

        public ClientHandlerDescriptor SerializationHandler { get; set; }

        public ClientHandlerDescriptor Deserialization { get; set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Serialization.HasValue())
            {
                json["serialization"] = Serialization;
            }
            
        //<< Serialization

            if (SerializationHandler.HasValue())
            {
                json.Add("serialization", SerializationHandler);
            }

            if (Deserialization.HasValue())
            {
                json.Add("deserialization", Deserialization);
            }
        }
    }
}

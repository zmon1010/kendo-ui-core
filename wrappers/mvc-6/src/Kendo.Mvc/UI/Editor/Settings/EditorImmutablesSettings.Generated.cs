using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI EditorImmutablesSettings class
    /// </summary>
    public partial class EditorImmutablesSettings 
    {
        public string Serialization { get; set; }
        public ClientHandlerDescriptor SerializationHandler { get; set; }

        public ClientHandlerDescriptor Deserialization { get; set; }

        public bool? Enabled { get; set; }

        public Editor Editor { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (SerializationHandler?.HasValue() == true)
            {
                settings["serialization"] = SerializationHandler;
            }
            else if (Serialization?.HasValue() == true)
            {
               settings["serialization"] = Serialization;
            }


            if (Deserialization?.HasValue() == true)
            {
                settings["deserialization"] = Deserialization;
            }

            return settings;
        }
    }
}

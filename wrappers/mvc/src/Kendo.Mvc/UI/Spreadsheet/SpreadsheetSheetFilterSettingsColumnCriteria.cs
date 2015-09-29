namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class SpreadsheetSheetFilterSettingsColumnCriteria : JsonObject
    {
        public SpreadsheetSheetFilterSettingsColumnCriteria()
        {
            //>> Initialization
        
        //<< Initialization
        }

        //>> Fields
        
        public string Operator { get; set; }
        
        public string Value { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Operator.HasValue())
            {
                json["operator"] = Operator;
            }
            
            if (Value.HasValue())
            {
                json["value"] = Value;
            }
            
        //<< Serialization
        }
    }
}

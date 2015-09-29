namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class SpreadsheetSheetFilterSettings : JsonObject
    {
        public SpreadsheetSheetFilterSettings()
        {
            //>> Initialization
        
            Columns = new List<SpreadsheetSheetFilterSettingsColumn>();
                
        //<< Initialization
        }

        //>> Fields
        
        public List<SpreadsheetSheetFilterSettingsColumn> Columns
        {
            get;
            set;
        }
        
        public string Ref { get; set; }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            if (Ref.HasValue())
            {
                json["ref"] = Ref;
            }
            
        //<< Serialization            

            // serlialize columns only when there is Ref
            if (Ref.HasValue())
            {
                json["columns"] = Columns.ToJson();
            }
            
        }
    }
}

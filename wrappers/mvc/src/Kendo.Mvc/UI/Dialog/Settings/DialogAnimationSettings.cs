namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class DialogAnimationSettings : JsonObject
    {
        public DialogAnimationSettings()
        {
            Enabled = ;
        
            //>> Initialization
        
            Close = new DialogAnimationCloseSettings();
                
            Open = new DialogAnimationOpenSettings();
                
        //<< Initialization
        }

        public bool Enabled { get; set; }

        //>> Fields
        
        public DialogAnimationCloseSettings Close
        {
            get;
            set;
        }
        
        public DialogAnimationOpenSettings Open
        {
            get;
            set;
        }
        
        //<< Fields

        protected override void Serialize(IDictionary<string, object> json)
        {
            //>> Serialization
        
            var close = Close.ToJson();
            if (close.Any())
            {
                json["close"] = close;
            }
            var open = Open.ToJson();
            if (open.Any())
            {
                json["open"] = open;
            }
        //<< Serialization
        }
    }
}

namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public class PanelBarMessagesSettings : JsonObject
    {
        public PanelBarMessagesSettings()
        {
        }

        public string Loading { get; set; }
        
        public string RequestFailed { get; set; }
        
        public string Retry { get; set; }


        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Loading.HasValue())
            {
                json["loading"] = Loading;
            }
            
            if (RequestFailed.HasValue())
            {
                json["requestFailed"] = RequestFailed;
            }
            
            if (Retry.HasValue())
            {
                json["retry"] = Retry;
            }
        }
    }
}

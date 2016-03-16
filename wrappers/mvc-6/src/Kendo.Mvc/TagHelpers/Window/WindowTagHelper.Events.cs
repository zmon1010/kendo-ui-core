using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.TagHelpers
{
    public partial class WindowTagHelper
    {
        public string OnActivate { get; set; }

        public string OnClose { get; set; }

        public string OnDeactivate { get; set; }

        public string OnDragend { get; set; }

        public string OnDragstart { get; set; }

        public string OnError { get; set; }

        public string OnMaximize { get; set; }

        public string OnMinimize { get; set; }

        public string OnOpen { get; set; }

        public string OnRefresh { get; set; }

        public string OnResize { get; set; }


        protected override Dictionary<string, object> SerializeEvents()
        {
            var settings = new Dictionary<string, object>();

            if (OnActivate?.HasValue() == true)
            {
                settings["activate"] = CreateHandler(OnActivate);
            }

            if (OnClose?.HasValue() == true)
            {
                settings["close"] = CreateHandler(OnClose);
            }

            if (OnDeactivate?.HasValue() == true)
            {
                settings["deactivate"] = CreateHandler(OnDeactivate);
            }

            if (OnDragend?.HasValue() == true)
            {
                settings["dragend"] = CreateHandler(OnDragend);
            }

            if (OnDragstart?.HasValue() == true)
            {
                settings["dragstart"] = CreateHandler(OnDragstart);
            }

            if (OnError?.HasValue() == true)
            {
                settings["error"] = CreateHandler(OnError);
            }

            if (OnMaximize?.HasValue() == true)
            {
                settings["maximize"] = CreateHandler(OnMaximize);
            }

            if (OnMinimize?.HasValue() == true)
            {
                settings["minimize"] = CreateHandler(OnMinimize);
            }

            if (OnOpen?.HasValue() == true)
            {
                settings["open"] = CreateHandler(OnOpen);
            }

            if (OnRefresh?.HasValue() == true)
            {
                settings["refresh"] = CreateHandler(OnRefresh);
            }

            if (OnResize?.HasValue() == true)
            {
                settings["resize"] = CreateHandler(OnResize);
            }

            return settings;
        }
    }
}


using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListColumnCommand class
    /// </summary>
    public partial class TreeListColumnCommand<T> 
    {
        public string ClassName { get; set; }

        public ClientHandlerDescriptor Click { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }



        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (ClassName.HasValue())
            {
                settings["className"] = ClassName;
            }

            if (Click.HasValue())
            {
                settings["click"] = Click;
            }

            if (Name.HasValue())
            {
                settings["name"] = Name;
            }

            if (Text.HasValue())
            {
                settings["text"] = Text;
            }


            return settings;
        }
    }
}

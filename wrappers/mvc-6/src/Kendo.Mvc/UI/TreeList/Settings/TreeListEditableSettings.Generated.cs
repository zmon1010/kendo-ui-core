using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListEditableSettings class
    /// </summary>
    public partial class TreeListEditableSettings 
    {
        public string Mode { get; set; }

        public string Template { get; set; }

        public string TemplateId { get; set; }


        public bool Enabled { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Mode.HasValue())
            {
                settings["mode"] = Mode;
            }

            if (TemplateId.HasValue())
            {
                settings["template"] = new ClientHandlerDescriptor {
                    HandlerName = string.Format(
                        "jQuery('#{0}').html()", TemplateId
                    )
                };
            }
            else if (Template.HasValue())
            {
                settings["template"] = Template;
            }
 


            return settings;
        }
    }
}

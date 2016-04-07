using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI EditorSerializationSettings class
    /// </summary>
    public partial class EditorSerializationSettings 
    {
        public bool? Entities { get; set; }

        public bool? Scripts { get; set; }

        public bool? Semantic { get; set; }


        public Editor Editor { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Entities.HasValue)
            {
                settings["entities"] = Entities;
            }

            if (Scripts.HasValue)
            {
                settings["scripts"] = Scripts;
            }

            if (Semantic.HasValue)
            {
                settings["semantic"] = Semantic;
            }

            return settings;
        }
    }
}

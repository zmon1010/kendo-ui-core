using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI UploadAsyncSettings class
    /// </summary>
    public partial class UploadAsyncSettings 
    {
        public bool? AutoUpload { get; set; }

        public bool? Batch { get; set; }

        public string RemoveField { get; set; }

        public string RemoveUrl { get; set; }

        public string RemoveVerb { get; set; }

        public string SaveField { get; set; }

        public string SaveUrl { get; set; }

        public bool? WithCredentials { get; set; }

        public string IdPrefix { get; set; } = "#";

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();


            if (AutoUpload.HasValue)
            {
                settings["autoUpload"] = AutoUpload;
            }

            if (Batch.HasValue)
            {
                settings["batch"] = Batch;
            }

            if (RemoveField.HasValue())
            {
                settings["removeField"] = RemoveField;
            }

            if (RemoveUrl.HasValue())
            {
                settings["removeUrl"] = RemoveUrl;
            }

            if (RemoveVerb.HasValue())
            {
                settings["removeVerb"] = RemoveVerb;
            }

            if (SaveField.HasValue())
            {
                settings["saveField"] = SaveField;
            }

            if (SaveUrl.HasValue())
            {
                settings["saveUrl"] = SaveUrl;
            }

            if (WithCredentials.HasValue)
            {
                settings["withCredentials"] = WithCredentials;
            }

            return settings;
        }

    }
}

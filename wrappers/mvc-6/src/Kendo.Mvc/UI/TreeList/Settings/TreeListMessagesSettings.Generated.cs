using Kendo.Mvc.Extensions;
using Microsoft.AspNet.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI TreeListMessagesSettings class
    /// </summary>
    public partial class TreeListMessagesSettings 
    {

        public TreeListMessagesCommandsSettings Commands { get; } = new TreeListMessagesCommandsSettings();
        public string Loading { get; set; }

        public string NoRows { get; set; }

        public string RequestFailed { get; set; }

        public string Retry { get; set; }



        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            var commands = Commands.Serialize();
            if (commands.Any())
            {
                settings["commands"] = commands;
            }

            if (Loading.HasValue())
            {
                settings["loading"] = Loading;
            }

            if (NoRows.HasValue())
            {
                settings["noRows"] = NoRows;
            }

            if (RequestFailed.HasValue())
            {
                settings["requestFailed"] = RequestFailed;
            }

            if (Retry.HasValue())
            {
                settings["retry"] = Retry;
            }


            return settings;
        }
    }
}

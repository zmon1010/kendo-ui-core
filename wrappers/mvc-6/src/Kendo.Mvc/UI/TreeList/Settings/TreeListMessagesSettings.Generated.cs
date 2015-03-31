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
    public partial class TreeListMessagesSettings<T> where T : class 
    {
        public TreeListMessagesCommandsSettings<T> Commands { get; } = new TreeListMessagesCommandsSettings<T>();

        public string Loading { get; set; }

        public string NoRows { get; set; }

        public string RequestFailed { get; set; }

        public string Retry { get; set; }


        public TreeList<T> TreeList { get; set; }

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

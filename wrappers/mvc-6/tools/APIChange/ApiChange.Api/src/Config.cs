using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ApiChange.Api
{
    static class Config
    {
        private static readonly string ConfigFile = "config.json";

        static Config()
        {
            if (!File.Exists(ConfigFile)) {                
                Namespaces = new string[] { "Kendo.Mvc.UI.Fluent" };
                IgnoredInterfaces = new string[] { "IHideObjectMembers" };
                return;
            }

            var content = File.ReadAllText(ConfigFile);
            var config = (JObject) JsonConvert.DeserializeObject(content);

            if (config["namespaces"] != null)
            {
                Namespaces = ((JArray)config["namespaces"]).Values<string>();
            }

            if (config["ignored_interfaces"] != null)
            {
                IgnoredInterfaces = ((JArray)config["ignored_interfaces"]).Values<string>();
            }
        }

        public static IEnumerable<string> IgnoredInterfaces
        {
            get;
            private set;
        }

        public static IEnumerable<string> Namespaces
        {
            get;
            private set;
        }
    }
}

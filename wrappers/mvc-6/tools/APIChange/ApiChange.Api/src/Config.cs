using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace ApiChange.Api
{
    class Settings
    {
        [JsonProperty(PropertyName = "aliases")]
        public IEnumerable<TypeAlias> Aliases
        {
            get;
            private set;
        }

        [JsonProperty(PropertyName = "ignored")]
        public IEnumerable<string> Ignored
        {
            get;
            private set;
        }

        [JsonProperty(PropertyName = "namespaces")]
        public IEnumerable<string> Namespaces
        {
            get;
            private set;
        }
    }

    class TypeAlias
    {
        [JsonProperty(PropertyName = "from")]
        public string From { get; set; }

        [JsonProperty(PropertyName = "to")]
        public string To { get; set; }

        [JsonProperty(PropertyName = "regex")]
        public bool Regex { get; set; }
    }

    static class Config
    {
        private static readonly string ConfigFile = "config.json";
        public static readonly Settings Current;

        static Config()
        {
            if (!File.Exists(ConfigFile))
            {                
                return;
            }

            var content = File.ReadAllText(ConfigFile);
            Current = JsonConvert.DeserializeObject<Settings>(content);
        }
    }
}

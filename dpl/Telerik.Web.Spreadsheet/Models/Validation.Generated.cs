using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Validation
    /// </summary>
    [DataContract]
    public partial class Validation
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "type", EmitDefaultValue = false)]
        public string Type { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "comparerType", EmitDefaultValue = false)]
        public string ComparerType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "dataType", EmitDefaultValue = false)]
        public string DataType { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "from", EmitDefaultValue = false)]
        public string From { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "to", EmitDefaultValue = false)]
        public string To { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "showButton", EmitDefaultValue = false)]
        public bool? ShowButton { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "allowNulls", EmitDefaultValue = false)]
        public bool? AllowNulls { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "messageTemplate", EmitDefaultValue = false)]
        public string MessageTemplate { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "titleTemplate", EmitDefaultValue = false)]
        public string TitleTemplate { get; set; }


        /// <summary>
        /// Serialize current instance to Dictionary
        /// </summary>
        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Type != null)
            {
                settings["type"] = Type;
            }

            if (ComparerType != null)
            {
                settings["comparerType"] = ComparerType;
            }

            if (DataType != null)
            {
                settings["dataType"] = DataType;
            }

            if (From != null)
            {
                settings["from"] = From;
            }

            if (To != null)
            {
                settings["to"] = To;
            }

            if (ShowButton != null)
            {
                settings["showButton"] = ShowButton;
            }

            if (AllowNulls != null)
            {
                settings["allowNulls"] = AllowNulls;
            }

            if (MessageTemplate != null)
            {
                settings["messageTemplate"] = MessageTemplate;
            }

            if (TitleTemplate != null)
            {
                settings["titleTemplate"] = TitleTemplate;
            }

            return settings;
        }
    }
}

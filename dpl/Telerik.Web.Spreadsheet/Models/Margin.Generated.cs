using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Margin
    /// </summary>
    [DataContract]
    public partial class Margin
    {
        /// <summary>
        /// The bottom margin. Numbers are considered as "pt" units.
        /// </summary>
        [DataMember(Name = "bottom", EmitDefaultValue = false)]
        public double? Bottom { get; set; }

        /// <summary>
        /// The left margin. Numbers are considered as "pt" units.
        /// </summary>
        [DataMember(Name = "left", EmitDefaultValue = false)]
        public double? Left { get; set; }

        /// <summary>
        /// The right margin. Numbers are considered as "pt" units.
        /// </summary>
        [DataMember(Name = "right", EmitDefaultValue = false)]
        public double? Right { get; set; }

        /// <summary>
        /// The top margin. Numbers are considered as "pt" units.
        /// </summary>
        [DataMember(Name = "top", EmitDefaultValue = false)]
        public double? Top { get; set; }


        /// <summary>
        /// Serialize current instance to Dictionary
        /// </summary>
        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Bottom != null)
            {
                settings["bottom"] = Bottom;
            }

            if (Left != null)
            {
                settings["left"] = Left;
            }

            if (Right != null)
            {
                settings["right"] = Right;
            }

            if (Top != null)
            {
                settings["top"] = Top;
            }

            return settings;
        }
    }
}

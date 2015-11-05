using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Linq;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Cell
    /// </summary>
    [DataContract]
    public partial class Cell
    {
        /// <summary>
        /// The background color of the cell.Many standard CSS formats are supported, but the canonical form is "#ccff00".
        /// </summary>
        [DataMember(Name = "background", EmitDefaultValue = false)]
        public string Background { get; set; }

        /// <summary>
        /// The font color of the cell.Many standard CSS formats are supported, but the canonical form is "#ccff00".
        /// </summary>
        [DataMember(Name = "color", EmitDefaultValue = false)]
        public string Color { get; set; }

        /// <summary>
        /// The font family for the cell.
        /// </summary>
        [DataMember(Name = "fontFamily", EmitDefaultValue = false)]
        public string FontFamily { get; set; }

        /// <summary>
        /// The font size of the cell in pixels.
        /// </summary>
        [DataMember(Name = "fontSize", EmitDefaultValue = false)]
        public double? FontSize { get; set; }

        /// <summary>
        /// Sets the cell font to italic, if set to true.
        /// </summary>
        [DataMember(Name = "italic", EmitDefaultValue = false)]
        public bool? Italic { get; set; }

        /// <summary>
        /// Sets the cell font to bold, if set to true.
        /// </summary>
        [DataMember(Name = "bold", EmitDefaultValue = false)]
        public bool? Bold { get; set; }

        /// <summary>
        /// The format of the cell text.See Create or delete a custom number format on MS Office.
        /// </summary>
        [DataMember(Name = "format", EmitDefaultValue = false)]
        public string Format { get; set; }

        /// <summary>
        /// The cell formula without the leading equals sign, e.g. A1 * 10.
        /// </summary>
        [DataMember(Name = "formula", EmitDefaultValue = false)]
        public string Formula { get; set; }

        /// <summary>
        /// The zero-based index of the cell. Required to ensure correct positioning.
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public int? Index { get; set; }

        /// <summary>
        /// The text align setting for the cell content.Available options are:
		/// * left
		/// * center
		/// * right
		/// * justify
        /// </summary>
        [DataMember(Name = "textAlign", EmitDefaultValue = false)]
        public string TextAlign { get; set; }

        /// <summary>
        /// Sets the cell font to underline, if set to true.
        /// </summary>
        [DataMember(Name = "underline", EmitDefaultValue = false)]
        public bool? Underline { get; set; }

        /// <summary>
        /// The cell value.
        /// </summary>
        [DataMember(Name = "value", EmitDefaultValue = false)]
        public object Value { get; set; }

        /// <summary>
        /// The vertical align setting for the cell content.Available options are:
		/// * left
		/// * center
		/// * right
		/// * justify
        /// </summary>
        [DataMember(Name = "verticalAlign", EmitDefaultValue = false)]
        public string VerticalAlign { get; set; }

        /// <summary>
        /// Will wrap the cell content if set to true.
        /// </summary>
        [DataMember(Name = "wrap", EmitDefaultValue = false)]
        public bool? Wrap { get; set; }


        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            settings["background"] = Background;

            settings["color"] = Color;

            settings["fontFamily"] = FontFamily;

            settings["fontSize"] = FontSize;

            settings["italic"] = Italic;

            settings["bold"] = Bold;

            settings["format"] = Format;

            settings["formula"] = Formula;

            settings["index"] = Index;

            settings["textAlign"] = TextAlign;

            settings["underline"] = Underline;

            settings["value"] = Value;

            settings["verticalAlign"] = VerticalAlign;

            settings["wrap"] = Wrap;

            return settings;
        }
    }
}

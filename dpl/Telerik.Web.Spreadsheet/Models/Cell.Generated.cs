using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Telerik.Web.Spreadsheet
{
    /// <summary>
    /// Represents a Cell
    /// </summary>
    [DataContract]
    public partial class Cell
    {
        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "background", EmitDefaultValue = false)]
        public string Background { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "borderBottom", EmitDefaultValue = false)]
        public BorderStyle BorderBottom { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "borderLeft", EmitDefaultValue = false)]
        public BorderStyle BorderLeft { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "borderTop", EmitDefaultValue = false)]
        public BorderStyle BorderTop { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "borderRight", EmitDefaultValue = false)]
        public BorderStyle BorderRight { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "color", EmitDefaultValue = false)]
        public string Color { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "fontFamily", EmitDefaultValue = false)]
        public string FontFamily { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "fontSize", EmitDefaultValue = false)]
        public string FontSize { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "italic", EmitDefaultValue = false)]
        public bool Italic { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "bold", EmitDefaultValue = false)]
        public bool Bold { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "format", EmitDefaultValue = false)]
        public string Format { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "formula", EmitDefaultValue = false)]
        public string Formula { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "index", EmitDefaultValue = false)]
        public int Index { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "textAlign", EmitDefaultValue = false)]
        public string TextAlign { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "underline", EmitDefaultValue = false)]
        public bool Underline { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "value", EmitDefaultValue = false)]
        public object Value { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "verticalAlign", EmitDefaultValue = false)]
        public string VerticalAlign { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [DataMember(Name = "wrap", EmitDefaultValue = false)]
        public bool Wrap { get; set; }

    }
}

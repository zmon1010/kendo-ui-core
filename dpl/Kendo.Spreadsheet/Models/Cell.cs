using System.Runtime.Serialization;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Cell
    {
        [DataMember(Name = "index")]
        public int Index { get; set; }

        [DataMember(Name = "format", EmitDefaultValue = false)]
        public string Format { get; set; }

        [DataMember(Name = "formula", EmitDefaultValue = false)]
        public string Formula { get; set; }

        [DataMember(Name = "value", EmitDefaultValue = false)]
        public object Value { get; set; }
    }
}

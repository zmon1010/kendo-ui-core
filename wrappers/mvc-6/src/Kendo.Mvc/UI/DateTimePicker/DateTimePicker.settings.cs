/*
    Generated file

    Modify the generation scripts, documentation or a partial file.
*/

using System;
using System.IO;

namespace Kendo.Mvc.UI
{
    public partial class DateTimePicker
    {
        public string Culture
        {
            get;
            set;
        }

        public bool Enabled
        {
            get;
            set;
        }

        public string Format
        {
            get;
            set;
        }

        public DateTime? Value
        {
            get;
            set;
        }

        public override void WriteInitializationScript(TextWriter writer)
        {
            var settings = SerializeSettings();

            // TODO: Automatically serialized settings go here

            writer.Write(Initializer.Initialize(Selector, "DateTimePicker", settings));
        }
    }
}

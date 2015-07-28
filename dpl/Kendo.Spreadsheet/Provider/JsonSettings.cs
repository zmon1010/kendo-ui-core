using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Represents the common settings used for JSON Import/Export
    /// </summary>
    public class JsonSettings
    {
        /// <summary>
        /// Initializes the default settings
        /// </summary>
        public JsonSettings()
        {
            Encoding = System.Text.Encoding.UTF8;
            BufferSize = 4096;
            LeaveOpen = true;
        }

        /// <summary>
        /// Gets or sets the encoding to use during the import/export operation.
        /// The default is UTF-8.
        /// </summary>
        public Encoding Encoding { get; set; }

        /// <summary>
        /// Gets or sets the buffer size in bytes.
        /// The default value is 4096.
        /// </summary>
        public int BufferSize { get; set; }

        /// <summary>
        /// Gets or sets a flag that inidicates whether to leave the stream open after the import/export operation.
        /// The default is true.
        /// </summary>
        public bool LeaveOpen { get; set; }
    }
}

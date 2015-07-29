using System;
using System.Collections.Generic;

namespace Kendo.Spreadsheet
{
    /// <summary>
    /// Defines common MIME types supported file types
    /// </summary>
    public static class MimeTypes
    {
        /// <summary>
        /// List of all supported MIME types by extension
        /// </summary>
        public static readonly IDictionary<String, String> ByExtension =
            new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) {                
                { ".csv", "text/csv" },
                { ".json", "application/json" },
                { ".txt", "text/tab-separated-values" },
                { ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
            };
    }
}

using System;

namespace Kendo.Mvc.Export
{
    public class EditorExportData
    {
        /// <summary>
        /// Gets or sets the exported HTML content
        /// </summary
        public string Value { get; set; }

        /// <summary>
        /// Gets or sets type to which the content will be exported
        /// </summary
        public EditorExportType ExportType { get; set; }

        string fileName;
        /// <summary>
        /// Gets or sets the fine name of the export result
        /// </summary
        public string FileName {
            get
            {
                if (String.IsNullOrEmpty(fileName))
                {
                    fileName = "Editor";
                }

                return fileName;
            }
            set
            {
                fileName = value;
            }
        }
    }
}

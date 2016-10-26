using System;
using System.Web;

namespace Kendo.Mvc.Export
{
    public static partial class EditorImport
    {
        /// <summary>
        /// Returns the text content of the file
        /// </summary>
        /// <param name="file">Text file</param>
        /// <returns>String</returns>
        public static String ToTextImportResult(HttpPostedFileBase file)
        {
            return GetTextContent(file);
        }
    }
}

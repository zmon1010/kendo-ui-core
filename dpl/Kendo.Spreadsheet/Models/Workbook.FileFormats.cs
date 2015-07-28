using System.IO;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;

using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;

namespace Kendo.Spreadsheet
{
    public partial class Workbook
    {
        static Workbook()
        {
            WorkbookFormatProvidersManager.RegisterFormatProvider(new XlsxFormatProvider());
            WorkbookFormatProvidersManager.RegisterFormatProvider(new JsonFormatProvider());
        }

        /// <summary>
        /// Creates a Workbook instance and populates it with data from the specified file.
        /// 
        /// Supported file formats are XLSX, CSV, TXT (Tab-separated) and JSON.
        /// </summary>
        /// <param name="path">The fully-qualified path to the file</param>
        /// <returns>The populated Workbook</returns>
        public static Document Load(string path)
        {
            Document document;
            using (var file = File.OpenRead(path))
            {
                var extension = Path.GetExtension(path);
                document = WorkbookFormatProvidersManager.Import(extension, file);
            }

            return document;
        }

        /// <summary>
        /// Stores the data from the Workbook in the specified file.
        /// 
        /// Supported file formats are XLSX, CSV, TXT (Tab-separated) and JSON.
        /// </summary>
        /// <param name="path">The fully-qualified path to the output file</param>
        public void Save(string path)
        {
            var document = this.ToDocument();

            using (var file = File.OpenWrite(path))
            {
                var extension = Path.GetExtension(path);
                WorkbookFormatProvidersManager.Export(document, extension, file);
            }
        }
    }
}

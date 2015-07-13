using System.Collections.Generic;
using System.IO;
using System.Runtime.Serialization;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;
using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;

namespace Kendo.Spreadsheet
{
    [DataContract]
    public class Workbook
    {
        static Workbook()
        {
            WorkbookFormatProvidersManager.RegisterFormatProvider(new XlsxFormatProvider());
        }

        public Workbook()
        {
            Sheets = new List<Worksheet>();
        }

        [DataMember(Name = "sheets")]
        public IList<Worksheet> Sheets { get; set; }

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

        public void Save(string path)
        {
            var document = new Document();

            using (var file = File.OpenWrite(path))
            {
                var extension = Path.GetExtension(path);
                WorkbookFormatProvidersManager.Export(document, extension, file);
            }
        }
    }
}

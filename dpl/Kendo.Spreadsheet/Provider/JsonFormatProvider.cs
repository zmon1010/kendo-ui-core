using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;

using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;

namespace Kendo.Spreadsheet
{
    public class JsonFormatProvider : WorkbookFormatProviderBase
    {
        public JsonFormatProvider()
        {
            ImportSettings = new JsonImportSettings();
            ExportSettings = new JsonExportSettings();
        }

        public override string Name
        {
            get
            {
                return "Json";
            }
        }

        public override IEnumerable<string> SupportedExtensions
        {
            get
            {
                return new string[] { ".json" };
            }
        }

        /// <summary>
        /// Gets a value indicating whether can import.
        /// </summary>
        /// <value>The value indicating whether can import.</value>
        public override bool CanImport
        {
            get
            {
                return true;
            }
        }

        /// <summary>
        /// Gets a value indicating whether can export.
        /// </summary>
        /// <value>The value indicating whether can export.</value>
        public override bool CanExport
        {
            get
            {
                return true;
            }
        }

        public JsonExportSettings ExportSettings { get; private set; }

        public JsonImportSettings ImportSettings { get; private set; }

        protected override Document ImportOverride(Stream input)
        {
            var serializer = new JsonSerializer();
            using (var reader = new StreamReader(input, ImportSettings.Encoding, true, ImportSettings.BufferSize, ImportSettings.LeaveOpen))
            using (var jsonReader = new JsonTextReader(reader))
            {
                var workbook = serializer.Deserialize<Workbook>(jsonReader);
                return workbook.ToDocument();
            }
        }

        protected override void ExportOverride(Document document, Stream output)
        {
            var workbook = Workbook.FromDocument(document);

            var serializer = new JsonSerializer();
            using (var writer = new StreamWriter(output, System.Text.Encoding.UTF8, 4096, true))
            using (var jsonWriter = new JsonTextWriter(writer))
            {
                serializer.Serialize(jsonWriter, workbook);
            }
        }
    }
}

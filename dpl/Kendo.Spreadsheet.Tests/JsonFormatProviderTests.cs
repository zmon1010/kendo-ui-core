using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;
using DocumentWorksheet = Telerik.Windows.Documents.Spreadsheet.Model.Worksheet;

namespace Kendo.Spreadsheet.Tests
{
    public class JsonFormatProviderTests
    {
        private const string CELL_VALUE = "Фоо";

        [Fact]
        public void Imports_JSON_from_stream()
        {
            var workbook = CreateWorkbook();

            var serializer = new JsonSerializer();
            using (var stream = new MemoryStream())
            {
                using (var writer = new StreamWriter(stream, System.Text.Encoding.UTF8, 4096, true))
                using (var jsonWriter = new JsonTextWriter(writer))
                {
                    serializer.Serialize(jsonWriter, workbook);
                }

                stream.Seek(0, SeekOrigin.Begin);

                var provider = new JsonFormatProvider();
                var document = provider.Import(stream);

                Assert.Equal(CELL_VALUE, document.ActiveWorksheet.Cells[1, 1].GetValue().Value.RawValue);
            }
        }

        [Fact]
        public void Imports_JSON_from_stream_with_specified_encoding()
        {
            var workbook = CreateWorkbook();

            var serializer = new JsonSerializer();
            using (var stream = new MemoryStream())
            {
                var encoding = System.Text.Encoding.GetEncoding(1251);
                using (var writer = new StreamWriter(stream, encoding, 4096, true))
                using (var jsonWriter = new JsonTextWriter(writer))
                {
                    serializer.Serialize(jsonWriter, workbook);
                }

                stream.Seek(0, SeekOrigin.Begin);

                var provider = new JsonFormatProvider();
                provider.ImportSettings.Encoding = encoding;

                var document = provider.Import(stream);

                Assert.Equal(CELL_VALUE, document.ActiveWorksheet.Cells[1, 1].GetValue().Value.RawValue);
            }
        }

        [Fact]
        public void Exports_document_to_JSON()
        {
            var document = CreateDocument();

            using (var stream = new MemoryStream())
            {
                var provider = new JsonFormatProvider();
                provider.Export(document, stream);

                stream.Seek(0, SeekOrigin.Begin);

                using (var reader = new StreamReader(stream))
                {
                    var json = reader.ReadToEnd();
                    var result = JsonConvert.DeserializeObject<Workbook>(json);

                    var cell = result.Sheets[0].Rows[0].Cells[0];
                    Assert.Equal(CELL_VALUE, cell.Value);
                    Assert.Equal(1, cell.Index);
                }
            }
        }

        [Fact]
        public void Exports_document_to_JSON_with_specified_encoding()
        {
            var document = CreateDocument();
            var encoding = System.Text.Encoding.GetEncoding(1251);

            using (var stream = new MemoryStream())
            {
                var provider = new JsonFormatProvider();
                provider.ExportSettings.Encoding = encoding;
                provider.Export(document, stream);

                stream.Seek(0, SeekOrigin.Begin);

                using (var reader = new StreamReader(stream, encoding))
                {
                    var json = reader.ReadToEnd();
                    var result = JsonConvert.DeserializeObject<Workbook>(json);

                    var cell = result.Sheets[0].Rows[0].Cells[0];
                    Assert.Equal(CELL_VALUE, cell.Value);
                    Assert.Equal(1, cell.Index);
                }
            }
        }

        private static Workbook CreateWorkbook()
        {
            var workbook = new Workbook();
            var sheet = new Worksheet();
            var row = new Row { Index = 1 };
            row.Cells.Add(new Cell { Index = 1, Value = CELL_VALUE });
            sheet.Rows.Add(row);
            workbook.Sheets.Add(sheet);
            return workbook;
        }

        private static Document CreateDocument()
        {
            var document = new Document();
            var worksheet = document.Worksheets.Add();
            worksheet.Cells[1, 1].SetValue(CELL_VALUE);
            return document;
        }
    }
}

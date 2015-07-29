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
        [Fact]
        public void Imports_JSON_from_stream()
        {
            var workbook = TestHelper.CreateWorkbook();

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

                Assert.Equal("Фу", document.ActiveWorksheet.Cells[1, 5].GetValue().Value.RawValue);
            }
        }

        [Fact]
        public void Imports_JSON_from_stream_with_specified_encoding()
        {
            var workbook = TestHelper.CreateWorkbook();

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

                Assert.Equal("Фу", document.ActiveWorksheet.Cells[1, 5].GetValue().Value.RawValue);
            }
        }

        [Fact]
        public void Exports_document_to_JSON()
        {
            var document = TestHelper.CreateDocument();

            using (var stream = new MemoryStream())
            {
                var provider = new JsonFormatProvider();
                provider.Export(document, stream);

                using (var streamCopy = new MemoryStream(stream.ToArray()))
                using (var reader = new StreamReader(streamCopy))
                {
                    var json = reader.ReadToEnd();
                    var result = JsonConvert.DeserializeObject<Workbook>(json);

                    var cell = result.Sheets[0].Rows[0].Cells.Where(c => c.Index == 5).First();
                    Assert.Equal("Фу", cell.Value);
                }
            }
        }

        [Fact]
        public void Exports_document_to_JSON_with_specified_encoding()
        {
            var document = TestHelper.CreateDocument();
            var encoding = System.Text.Encoding.GetEncoding(1251);

            using (var stream = new MemoryStream())
            {
                var provider = new JsonFormatProvider();
                provider.ExportSettings.Encoding = encoding;
                provider.Export(document, stream);

                using (var streamCopy = new MemoryStream(stream.ToArray()))
                using (var reader = new StreamReader(streamCopy, encoding))
                {
                    var json = reader.ReadToEnd();
                    var result = JsonConvert.DeserializeObject<Workbook>(json);

                    var cell = result.Sheets[0].Rows[0].Cells.Where(c => c.Index == 5).First();
                    Assert.Equal("Фу", cell.Value);
                }
            }
        }
    }
}

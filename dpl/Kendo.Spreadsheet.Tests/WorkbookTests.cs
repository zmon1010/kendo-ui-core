using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;

namespace Kendo.Spreadsheet.Tests
{
    public class WorkbookTests
    {
        [Fact]
        public void Can_insert_sheets()
        {
            var workbook = new Workbook();
            workbook.Sheets.Add(new Worksheet());

            Assert.Equal(workbook.Sheets.Count, 1);
        }

        [Fact]
        public void Loads_xlsx_file()
        {
            var path = Path.Combine("Data", "Sample.xlsx");

            var workbook = Workbook.Load(path);
            Assert.Equal(workbook.Sheets.Count, 1);
        }

        [Fact]
        public void Saves_xlsx_file()
        {
            var workbook = TestHelper.CreateWorkbook();
            var path = Path.Combine("Data", Path.GetRandomFileName() + ".xlsx");

            try
            {
                workbook.Save(path);

                var result = Workbook.Load(path);
                Assert.Equal(result.Sheets[0].Rows[0].Cells.Where(c => c.Index == 5).First().Value, "Фу");
            }
            finally
            {
                File.Delete(path);
            }
        }

        [Fact]
        public void Loads_JSON_file()
        {
            var path = Path.Combine("Data", "Sample.json");

            var workbook = Workbook.Load(path);
            Assert.Equal(workbook.Sheets[0].Rows[0].Cells[0].Value, "Фу");
        }

        [Fact]
        public void Saves_JSON_file()
        {
            var workbook = TestHelper.CreateWorkbook();
            var path = Path.Combine("Data", Path.GetRandomFileName() + ".json");

            try
            {
                workbook.Save(path);

                var result = Workbook.Load(path);
                Assert.Equal(result.Sheets[0].Rows[0].Cells.Where(c => c.Index == 5).First().Value, "Фу");
            }
            finally
            {
                File.Delete(path);
            }
        }
    }
}

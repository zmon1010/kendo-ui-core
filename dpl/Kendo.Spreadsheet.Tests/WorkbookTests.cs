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
        private const string CELL_VALUE = "Фоо";

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

            var document = Workbook.Load(path);
            Assert.Equal(document.Worksheets.Count, 1);
        }

        [Fact]
        public void Saves_xlsx_file()
        {
            var workbook = CreateWorkbook();
            var path = Path.Combine("Data", Path.GetRandomFileName() + ".xlsx");

            try
            {
                workbook.Save(path);

                var document = Workbook.Load(path);
                Assert.Equal(document.ActiveWorksheet.Cells[1, 1].GetValue().Value.RawValue, "Фоо");
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

            var document = Workbook.Load(path);
            Assert.Equal(document.ActiveWorksheet.Cells[1, 1].GetValue().Value.RawValue, "Фоо");
        }

        [Fact]
        public void Saves_JSON_file()
        {
            var workbook = CreateWorkbook();
            var path = Path.Combine("Data", Path.GetRandomFileName() + ".json");

            try
            {
                workbook.Save(path);

                var document = Workbook.Load(path);
                Assert.Equal(document.ActiveWorksheet.Cells[1, 1].GetValue().Value.RawValue, "Фоо");
            }
            finally
            {
                File.Delete(path);
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
    }
}

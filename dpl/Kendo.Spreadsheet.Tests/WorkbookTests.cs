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

            var document = Workbook.Load(path);
            Assert.Equal(document.Worksheets.Count, 1);
        }

        [Fact]
        public void Saves_xlsx_file()
        {
            var workbook = new Workbook();
            var path = Path.Combine("Data", Path.GetRandomFileName() + ".xlsx");

            try
            {
                workbook.Save(path);
                Assert.True(File.Exists(path));
            }
            finally
            {
                File.Delete(path);
            }
        }
    }
}

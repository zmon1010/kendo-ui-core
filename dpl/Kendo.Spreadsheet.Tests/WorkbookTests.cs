using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Kendo.Spreadsheet.Tests
{
    public class WorkbookTests
    {
        [Fact]
        public void CanInsertSheets()
        {
            var workbook = new Workbook();
            workbook.Sheets.Add(new Worksheet());

            Assert.Equal(workbook.Sheets.Count, 1);
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Xunit;

using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.Utilities;

using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;
using DocumentWorksheet = Telerik.Windows.Documents.Spreadsheet.Model.Worksheet;

namespace Telerik.Web.Spreadsheet.Tests
{
    public class WorkbookImportTests
    {
        public WorkbookImportTests()
        {
            document = TestHelper.CreateDocument();
            worksheet = document.ActiveWorksheet;
        }

        private Document document;
        private DocumentWorksheet worksheet;

        [Fact]
        public void FromDocument_creates_workbook()
        {
            Assert.NotNull(Workbook.FromDocument(document));
        }

        [Fact]
        public void FromDocument_imports_sheets()
        {
            var newsheet = document.Worksheets.Add();
            newsheet.Cells[1, 1].SetValue("Foo");

            Assert.Equal(2, Workbook.FromDocument(document).Sheets.Count);
        }

        [Fact]
        public void FromDocument_imports_empty_sheets()
        {
            var newsheet = document.Worksheets.Add();

            Assert.Equal(2, Workbook.FromDocument(document).Sheets.Count);
        }

        [Fact]
        public void FromDocument_imports_rows()
        {
            Assert.Equal(1, Workbook.FromDocument(document).Sheets[0].Rows.Count);
        }

        [Fact]
        public void FromDocument_imports_cells()
        {
            Assert.Equal(5, Workbook.FromDocument(document).Sheets[0].Rows[0].Cells.Count);
        }

        [Fact]
        public void FromDocument_imports_cell_text_value()
        {
            Assert.Equal("Foo", GetValue(1, 1));
        }

        [Fact]
        public void FromDocument_imports_cell_numeric_value()
        {
            var value = GetValue(1, 2);
            Assert.Equal(42, value);
        }

        [Fact]
        public void FromDocument_imports_cell_double_value()
        {
            var value = GetValue(1, 3);
            Assert.Equal(2.71, value);
        }

        [Fact]
        public void FromDocument_imports_cell_format()
        {
            Assert.Equal("@", GetCell(1, 1).Format);
        }

        [Fact]
        public void FromDocument_imports_cell_formula()
        {
            var value = GetCell(1, 4).Formula;
            Assert.Equal("A1 + B1", value);
        }

        [Fact]
        public void FromDocument_imports_merged_cells()
        {
            var from = new CellIndex(1, 0);
            var to = new CellIndex(1, 1);
            worksheet.Cells[from, to].Merge();

            var mergedRanges = Workbook.FromDocument(document).Sheets[0].MergedCells;

            Assert.Equal(1, mergedRanges.Count);
            Assert.Equal("A2:B2", mergedRanges[0]);
        }

        [Fact]
        public void FromDocument_does_not_freeze_pane()
        {
            Assert.Equal(null, Workbook.FromDocument(document).Sheets[0].FrozenRows);
            Assert.Equal(null, Workbook.FromDocument(document).Sheets[0].FrozenColumns);
        }

        [Fact]
        public void Document_imports_frozen_rows()
        {
            document.ActiveWorksheet.ViewState.FreezePanes(4, 1);

            Assert.Equal(4, Workbook.FromDocument(document).Sheets[0].FrozenRows);
        }

        [Fact]
        public void FromDocument_imports_frozen_columns()
        {
            document.ActiveWorksheet.ViewState.FreezePanes(4, 1);

            Assert.Equal(1, Workbook.FromDocument(document).Sheets[0].FrozenColumns);
        }

        private Cell GetCell(int rowIndex, int columnIndex)
        {
            return Workbook.FromDocument(document).Sheets[0]
                .Rows.First(row => row.Index == rowIndex)
                .Cells.First(cell => cell.Index == columnIndex);
        }

        private object GetValue(int rowIndex, int columnIndex)
        {
            return GetCell(rowIndex, columnIndex).Value;
        }
    }
}

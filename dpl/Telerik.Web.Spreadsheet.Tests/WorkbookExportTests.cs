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

namespace Telerik.Web.Spreadsheet.Tests
{
    public class WorkbookExportTests
    {
        public WorkbookExportTests()
        {
            workbook = TestHelper.CreateWorkbook();
            sheet = workbook.Sheets[0];
            row = sheet.Rows[0];
        }

        private Workbook workbook;
        private Worksheet sheet;
        private Row row;

        [Fact]
        public void ToDocument_creates_spreadsheet_document()
        {
            Assert.NotNull(workbook.ToDocument());
        }

        [Fact]
        public void ToDocument_exports_sheets()
        {
            workbook.Sheets.Add(new Worksheet());

            Assert.Equal(2, workbook.ToDocument().Sheets.Count);
        }

        [Fact]
        public void ToDocument_sets_first_sheet_as_active()
        {
            workbook.Sheets.Add(new Worksheet() { Name = "Sheet2" });
            var document = workbook.ToDocument();

            Assert.Equal(document.Worksheets[0], document.ActiveWorksheet);
        }

        [Fact]
        public void ToDocument_exports_cells()
        {
            Assert.Equal(1, workbook.ToDocument().ActiveWorksheet.Rows[1].CellRanges.Count());
        }

        [Fact]
        public void ToDocument_exports_cell_text_value()
        {
            Assert.Equal("Foo", GetValue(1, 1).RawValue);
        }

        [Fact]
        public void ToDocument_exports_cell_numeric_value()
        {
            var value = GetValue(1, 2);
            Assert.Equal("42", value.RawValue);
            Assert.Equal(CellValueType.Number, value.ValueType);
        }

        [Fact]
        public void ToDocument_exports_cell_double_value()
        {
            var value = GetValue(1, 3);
            Assert.Equal("2.71", value.RawValue.Trim());
            Assert.Equal(CellValueType.Number, value.ValueType);
        }

        [Fact]
        public void ToDocument_exports_cell_format()
        {
            Assert.Equal("@", GetCell(1, 1).GetFormat().Value.FormatString);
        }

        [Fact]
        public void ToDocument_exports_cell_formula()
        {
            var value = GetValue(1, 4);
            Assert.Equal(CellValueType.Formula, value.ValueType);
            Assert.Equal("=A1 + B1", value.RawValue);
        }

        [Fact]
        public void ToDocument_exports_merged_cells()
        {
            sheet.AddMergedCells("A2:B2");
            var mergedRanges = workbook.ToDocument().ActiveWorksheet.Cells.GetMergedCellRanges();
            var firstRange = mergedRanges.First();

            Assert.Equal(1, mergedRanges.Count());
            Assert.Equal("A2:B2", NameConverter.ConvertCellRangeToName(firstRange.FromIndex, firstRange.ToIndex));
        }

        [Fact]
        public void ToDocument_does_not_freeze_pane()
        {
            var pane = workbook.ToDocument().ActiveWorksheet.ViewState.Pane;

            Assert.Equal(null, pane);
        }

        [Fact]
        public void ToDocument_exports_frozen_rows()
        {
            sheet.FrozenRows = 4;
            var pane = workbook.ToDocument().ActiveWorksheet.ViewState.Pane;

            Assert.Equal(PaneState.Frozen, pane.State);
            Assert.Equal(4, pane.TopLeftCellIndex.RowIndex);
        }

        [Fact]
        public void ToDocument_exports_frozen_columns()
        {
            sheet.FrozenColumns = 4;
            var pane = workbook.ToDocument().ActiveWorksheet.ViewState.Pane;

            Assert.Equal(PaneState.Frozen, pane.State);
            Assert.Equal(4, pane.TopLeftCellIndex.ColumnIndex);
        }

        private CellSelection GetCell(int rowIndex, int columnIndex)
        {
            return workbook.ToDocument().ActiveWorksheet.Cells[rowIndex, columnIndex];
        }

        private ICellValue GetValue(int rowIndex, int columnIndex)
        {
            return GetCell(rowIndex, columnIndex).GetValue().Value;
        }
    }
}

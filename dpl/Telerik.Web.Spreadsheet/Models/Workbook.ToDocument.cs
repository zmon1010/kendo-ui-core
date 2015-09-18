using Telerik.Windows.Documents.Spreadsheet.Core;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.PropertySystem;
using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;
using DocumentWorksheet = Telerik.Windows.Documents.Spreadsheet.Model.Worksheet;

namespace Telerik.Web.Spreadsheet
{
    public partial class Workbook
    {
        /// <summary>
        /// Converts the Workbook to a <see cref="Telerik.Windows.Documents.Spreadsheet.Model.Workbook">Telerik DPL Workbook Document</see>.
        /// </summary>
        /// <returns></returns>
        public Document ToDocument()
        {
            var document = new Document();
            document.History.IsEnabled = false;

            using (new UpdateScope(document.SuspendLayoutUpdate, document.ResumeLayoutUpdate))
            {
                foreach (var sheet in Sheets)
                {
                    var documentSheet = document.Worksheets.Add();

                    documentSheet.Name = sheet.Name;

                    if (sheet.Name == ActiveSheet)
                    {
                        document.ActiveWorksheet = documentSheet;
                    }

                    documentSheet.ViewState.SelectionState = CreateSelectionState(sheet, documentSheet);
                    
                    //foreach (var row in sheet.Rows)
                    //{
                    //    ImportCells(row, documentSheet);

                    //    documentSheet.Rows[row.Index].SetHeight(new RowHeight(row.Height, true));
                    //}

                    foreach (var column in sheet.Columns)
                    {
                        if (ColumnsPropertyBag.WidthProperty.DefaultValue.Value != column.Width)
                        {
                            documentSheet.Columns[column.Index].SetWidth(new ColumnWidth(column.Width, true));
                        }
                    }

                    foreach (var mergedRange in sheet.MergedCells)
                    {
                        documentSheet.Cells.GetCellSelection(mergedRange).Merge();
                    }

                    if (sheet.FrozenColumns > 0 || sheet.FrozenRows > 0)
                    {
                        documentSheet.ViewState.FreezePanes(sheet.FrozenRows, sheet.FrozenColumns);
                    }
                }

                if (document.Worksheets == null && document.Worksheets.Count > 0)
                {
                    document.ActiveWorksheet = document.Worksheets[0];
                }
            }

            document.History.IsEnabled = true;

            return document;
        }

        private static void ImportCells(Row srcRow, DocumentWorksheet documentSheet)
        {
            foreach (var cell in srcRow.Cells)
            {
                var stringValue = cell.Value == null ? null : cell.Value.ToString();
                var selection = documentSheet.Cells[srcRow.Index, cell.Index];
                double numericValue;

                var formula = cell.Formula;
                if (!string.IsNullOrEmpty(formula))
                {
                    selection.SetValueAsFormula("=" + formula);
                }
                else if (double.TryParse(stringValue, out numericValue))
                {
                    selection.SetValue(numericValue);
                }
                else if (!string.IsNullOrEmpty(stringValue))
                {
                    selection.SetValueAsText(stringValue);
                }

                if (!string.IsNullOrEmpty(cell.Format))
                {
                    selection.SetFormat(new CellValueFormat(cell.Format));
                }
            }
        }

        private static SelectionState CreateSelectionState(Worksheet sheet, DocumentWorksheet documentSheet)
        {
            return new SelectionState(sheet.Selection.ToCellRange(), sheet.ActiveCell.ToCellIndex(), documentSheet.ViewState.SelectionState.Pane);
        }
    }  
}

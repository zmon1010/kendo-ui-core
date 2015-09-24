using System.Linq;
using Telerik.Windows.Documents.Spreadsheet.Core;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.Model.Sorting;
using Telerik.Windows.Documents.Spreadsheet.PropertySystem;
using Telerik.Windows.Documents.Spreadsheet.Utilities;
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
                    
                    if (!string.IsNullOrEmpty(sheet.Name))
                    {
                        documentSheet.Name = sheet.Name;
                    }

                    if (sheet.Name == ActiveSheet)
                    {
                        document.ActiveWorksheet = documentSheet;
                    }

                    documentSheet.ViewState.SelectionState = CreateSelectionState(sheet, documentSheet);                                                            

                    foreach (var row in sheet.Rows)
                    {
                        SetCells(row, documentSheet);

                        if (row.Height > 0)
                        {
                            documentSheet.Rows[row.Index].SetHeight(new RowHeight(row.Height, true));
                        }
                    }

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

                    SetSortState(documentSheet, sheet.Sort);
                }

                if (document.Worksheets == null && document.Worksheets.Count > 0)
                {
                    document.ActiveWorksheet = document.Worksheets[0];
                }                
            }

            document.History.IsEnabled = true;

            return document;
        }        

        private static SelectionState CreateSelectionState(Worksheet sheet, DocumentWorksheet documentSheet)
        {
            if (sheet.Selection != null)
            {
                return new SelectionState(sheet.Selection.ToCellRange(), sheet.ActiveCell.ToCellIndex(), documentSheet.ViewState.SelectionState.Pane);
            }
            else
            {
                return new SelectionState();
            }
        }

        private static void SetCells(Row srcRow, DocumentWorksheet documentSheet)
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

                if (!string.IsNullOrEmpty(cell.Color))
                {                                    
                    selection.SetForeColor(new ThemableColor(cell.Color.ToColor()));
                }

                if (!string.IsNullOrEmpty(cell.Background))
                {
                    var fill = PatternFill.CreateSolidFill(cell.Background.ToColor());
                    selection.SetFill(fill);
                }                

                selection.SetIsBold(cell.Bold);

                selection.SetIsItalic(cell.Italic);

                selection.SetIsWrapped(cell.Wrap);

                if (cell.Underline)
                {
                    selection.SetUnderline(UnderlineType.Single);
                }

                selection.SetBorders(CreateCellBorders(cell));

                if (!string.IsNullOrEmpty(cell.VerticalAlign))
                {                    
                    selection.SetVerticalAlignment(ConvertToVerticalAlignment(cell.VerticalAlign));
                }

                if (!string.IsNullOrEmpty(cell.TextAlign))
                {
                    selection.SetHorizontalAlignment(ConvertToHorizontalAlignment(cell.TextAlign));
                }

                if (!string.IsNullOrEmpty(cell.FontFamily))
                {
                    selection.SetFontFamily(new ThemableFontFamily(cell.FontFamily));
                }

                //FontSize - should be int
                //selection.SetFontSize(cell.FontSize);                
            }
        }

        private static CellBorders CreateCellBorders(Cell cell)
        {
            var borders = new CellBorders();

            if (cell.BorderTop != null)
            {             
                borders.Top = new CellBorder(CellBorderStyle.Thick, new ThemableColor(cell.BorderTop.Color.ToColor()));
            }

            if (cell.BorderBottom != null)
            {
                borders.Bottom = new CellBorder(CellBorderStyle.Thick, new ThemableColor(cell.BorderBottom.Color.ToColor()));
            }

            if (cell.BorderLeft != null)
            {
                borders.Left = new CellBorder(CellBorderStyle.Thick, new ThemableColor(cell.BorderLeft.Color.ToColor()));
            }

            if (cell.BorderRight != null)
            {
                borders.Right = new CellBorder(CellBorderStyle.Thick, new ThemableColor(cell.BorderRight.Color.ToColor()));
            }

            return borders;
        }

        public static RadVerticalAlignment ConvertToVerticalAlignment(string alignment)
        {
            switch(alignment)
            {
                case "top":
                    return RadVerticalAlignment.Top;
                case "middle":
                    return RadVerticalAlignment.Center;
                case "bottom":
                    return RadVerticalAlignment.Bottom;
                default:
                    return RadVerticalAlignment.Undetermined;
            }
        }

        public static RadHorizontalAlignment ConvertToHorizontalAlignment(string alignment)
        {
            switch (alignment)
            {
                case "left":
                    return RadHorizontalAlignment.Left;
                case "center":
                    return RadHorizontalAlignment.Center;
                case "right":
                    return RadHorizontalAlignment.Right;
                case "justify":
                    return RadHorizontalAlignment.Justify;
                default:
                    return RadHorizontalAlignment.General;
            }
        }

        public static void SetSortState(DocumentWorksheet documentWorksheet, Sort sort)
        {
            if (sort.Ref == null)
            {
                return;
            }

            var conditions = sort.Columns.Select(column => new ValuesSortCondition((int)column.Index, column.Ascending ? SortOrder.Ascending : SortOrder.Descending)).ToArray();
            var range = sort.Ref.ToCellRange().First();

            documentWorksheet.SortState.Set(range, conditions);
        }
    }  
}

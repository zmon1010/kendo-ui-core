using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using Telerik.Windows.Documents.Spreadsheet.Core;
using Telerik.Windows.Documents.Spreadsheet.Core.DataStructures;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Contexts;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.OpenXml.Xlsx;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.Utilities;
using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;
using DocumentWorksheet = Telerik.Windows.Documents.Spreadsheet.Model.Worksheet;

namespace Kendo.Spreadsheet
{
    public partial class Workbook
    {
        static Workbook()
        {
            WorkbookFormatProvidersManager.RegisterFormatProvider(new XlsxFormatProvider());
        }

        public static Workbook FromDocument(Document document)
        {
            var workbook = new Workbook();
            foreach (var documentWorksheet in document.Worksheets)
            {
                var context = new WorksheetExportContext(documentWorksheet);
                var usedCellRange = context.ValuePropertyDataInfo.GetUsedCellRange();

                var sheet = new Worksheet();
                workbook.Sheets.Add(sheet);

                if (usedCellRange == null)
                {
                    continue;
                }

                for (int rowIndex = usedCellRange.FromIndex.RowIndex; rowIndex <= usedCellRange.ToIndex.RowIndex; rowIndex++)
                {
                    Range rowUsedRange = context.ValuePropertyDataInfo.GetRowUsedRange(rowIndex);
                    if (rowUsedRange != null)
                    {
                        rowUsedRange = rowUsedRange.Expand(usedCellRange.FromIndex.ColumnIndex);
                    }

                    var cells = GetCellsToExport(documentWorksheet, rowUsedRange, rowIndex).ToList();
                    if (cells.Count > 0)
                    {
                        var dtoRow = new Row
                        {
                            Index = rowIndex,
                            Cells = cells
                        };

                        sheet.Rows.Add(dtoRow);
                    }
                }

                foreach (var mergedRange in documentWorksheet.Cells.GetMergedCellRanges())
                {
                    sheet.MergedCells.Add(
                        NameConverter.ConvertCellRangeToName(mergedRange.FromIndex, mergedRange.ToIndex)
                    );
                }

                var pane = documentWorksheet.ViewState.Pane;
                if (pane != null && pane.State == PaneState.Frozen)
                {
                    sheet.FrozenRows = pane.TopLeftCellIndex.RowIndex;
                    sheet.FrozenColumns = pane.TopLeftCellIndex.ColumnIndex;
                }
            }

            return workbook;
        }

        public Document ToDocument()
        {
            var document = new Document();
            document.History.IsEnabled = false;

            using (new UpdateScope(document.SuspendLayoutUpdate, document.ResumeLayoutUpdate))
            {
                foreach (var sheet in Sheets)
                {
                    var documentSheet = document.Worksheets.Add();

                    foreach (var row in sheet.Rows)
                    {
                        foreach (var cell in row.Cells)
                        {
                            var stringValue = cell.Value == null ? null : cell.Value.ToString();
                            var selection = documentSheet.Cells[row.Index, cell.Index];
                            double numericValue;

                            if (!string.IsNullOrEmpty(cell.Formula))
                            {
                                selection.SetValueAsFormula(cell.Formula);
                            }
                            else if (double.TryParse(stringValue, out numericValue))
                            {
                                selection.SetValue(numericValue);
                            }
                            else
                            {
                                selection.SetValueAsText(stringValue);
                            }

                            if (!string.IsNullOrEmpty(cell.Format))
                            {
                                selection.SetFormat(new CellValueFormat(cell.Format));
                            }
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
            }

            document.History.IsEnabled = true;

            return document;
        }

        public static Document Load(string path)
        {
            Document document;
            using (var file = File.OpenRead(path))
            {
                var extension = Path.GetExtension(path);
                document = WorkbookFormatProvidersManager.Import(extension, file);
            }

            return document;
        }

        public void Save(string path)
        {
            var document = new Document();

            using (var file = File.OpenWrite(path))
            {
                var extension = Path.GetExtension(path);
                WorkbookFormatProvidersManager.Export(document, extension, file);
            }
        }

        private static IEnumerable<Cell> GetCellsToExport(DocumentWorksheet worksheet, Range usedRange, int rowIndex)
        {
            if (usedRange != null)
            {
                for (int columnIndex = usedRange.Start; columnIndex <= usedRange.End; columnIndex++)
                {
                    var selection = worksheet.Cells[rowIndex, columnIndex];
                    var cellValue = selection.GetValue().Value;
                    var formatting = selection.GetFormat().Value;
                    string formula = null;

                    FormulaCellValue formulaCellValue = cellValue as FormulaCellValue;
                    if (formulaCellValue != null)
                    {
                        cellValue = formulaCellValue.GetResultValueAsCellValue();
                        formula = formulaCellValue.RawValue;
                    }

                    if (cellValue.ValueType != CellValueType.Empty)
                    {
                        object value = cellValue.RawValue;
                        switch (cellValue.ValueType)
                        {
                            case CellValueType.Number:
                                int intValue;
                                double doubleValue;

                                if (int.TryParse(cellValue.RawValue, out intValue))
                                {
                                    value = intValue;
                                }
                                else if (double.TryParse(cellValue.RawValue, out doubleValue))
                                {
                                    value = doubleValue;
                                }

                                break;
                        }

                        yield return new Cell
                        {
                            Index = columnIndex,
                            Format = formatting.FormatString,
                            Formula = formula,
                            Value = value
                        };
                    }
                }
            }
        }
    }
}

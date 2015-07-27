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
                        ImportCells(row, documentSheet);
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

                if (document.Worksheets.Count > 0)
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

    }
}

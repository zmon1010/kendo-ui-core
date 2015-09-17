using System;
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
using Telerik.Windows.Documents.Spreadsheet.PropertySystem;
using Telerik.Windows.Documents.Spreadsheet.Theming;
using Telerik.Windows.Documents.Spreadsheet.Utilities;
using Document = Telerik.Windows.Documents.Spreadsheet.Model.Workbook;
using DocumentWorksheet = Telerik.Windows.Documents.Spreadsheet.Model.Worksheet;

namespace Telerik.Web.Spreadsheet
{
    public partial class Workbook
    {
        /// <summary>
        /// Converts the <see cref="Telerik.Windows.Documents.Spreadsheet.Model.Workbook">Telerik DPL Workbook Document</see> to a Workbook.
        /// </summary>
        /// <param name="document">The source document</param>
        /// <returns>A Workbook populated with the data from the source document</returns>
        public static Workbook FromDocument(Document document)
        {
            var workbook = new Workbook();
            workbook.ActiveSheet = document.ActiveSheet.Name;

            foreach (var documentWorksheet in document.Worksheets)
            {
                var sheet = new Worksheet();
                workbook.Sheets.Add(sheet);

                sheet.Name = documentWorksheet.Name;

                sheet.ActiveCell = NameConverter.ConvertCellIndexToName(documentWorksheet.ViewState.SelectionState.ActiveCellIndex);

                var selection = documentWorksheet.ViewState.SelectionState.SelectedRanges.First();
                sheet.Selection = NameConverter.ConvertCellRangeToName(selection.FromIndex, selection.ToIndex);

                sheet.Columns.AddRange(GetColumns(documentWorksheet));

                sheet.Rows.AddRange(documentWorksheet.ImportRows());

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

        private static IEnumerable<Column> GetColumns(DocumentWorksheet worksheet)
        {
            var ranges = worksheet.Columns.PropertyBag.GetPropertyValueCollection(ColumnsPropertyBag.WidthProperty).GetNonDefaultRanges();

            foreach (var range in ranges)
            {
                var width = range.Value.Value;
                for (var i = range.Start; i <= range.End; i++)
                {
                    yield return new Column
                    {
                        Index = (int)i,
                        Width = width
                    };
                }
            }
        }        
    }
}

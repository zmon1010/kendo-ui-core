using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Telerik.Windows.Documents.Spreadsheet.Core.DataStructures;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Contexts;
using Telerik.Windows.Documents.Spreadsheet.Model;

namespace Host
{
    public class JsonFormatProvider : WorkbookFormatProviderBase
    {
        public override string Name
        {
            get
            {
                return "Json";
            }
        }

        public override IEnumerable<string> SupportedExtensions
        {
            get
            {
                return new string[] { "json" };
            }
        }

        /// <summary>
        /// Gets a value indicating whether can import.
        /// </summary>
        /// <value>The value indicating whether can import.</value>
        public override bool CanImport
        {
            get
            {
                return true;
            }
        }

        /// <summary>
        /// Gets a value indicating whether can export.
        /// </summary>
        /// <value>The value indicating whether can export.</value>
        public override bool CanExport
        {
            get
            {
                return true;
            }
        }

        /// <summary>
        /// Exports the specified workbook.
        /// </summary>
        /// <param name="workbook">The workbook.</param>
        /// <param name="output">The output.</param>
        protected override void ExportOverride(Workbook workbook, Stream output)
        {
            Worksheet worksheet = workbook.ActiveWorksheet;
            WorksheetExportContext context = new WorksheetExportContext(worksheet);

            CellRange usedCellRange = context.ValuePropertyDataInfo.GetUsedCellRange();

            if (usedCellRange == null)
            {
                return;
            }

            var dtoWorkbook = new DTO.Workbook();
            var dtoSheet = new DTO.Sheet();
            dtoWorkbook.Sheets.Add(dtoSheet);

            for (int rowIndex = usedCellRange.FromIndex.RowIndex; rowIndex <= usedCellRange.ToIndex.RowIndex; rowIndex++)
            {
                Range rowUsedRange = context.ValuePropertyDataInfo.GetRowUsedRange(rowIndex);
                if (rowUsedRange != null)
                {
                    rowUsedRange = rowUsedRange.Expand(usedCellRange.FromIndex.ColumnIndex);
                }

                var cells = GetCellsToExport(worksheet, rowUsedRange, rowIndex).ToList();
                if (cells.Count > 0)
                {
                    var dtoRow = new DTO.Row
                    {
                        Index = rowIndex,
                        Cells = cells
                    };

                    dtoSheet.Rows.Add(dtoRow);
                }
            }

            var serializer = new JsonSerializer();
            using (var writer = new StreamWriter(output, System.Text.Encoding.UTF8, 4096, true))
            using (var jsonWriter = new JsonTextWriter(writer))
            {
                serializer.Serialize(jsonWriter, dtoWorkbook);
            }
        }

        private IEnumerable<DTO.Cell> GetCellsToExport(Worksheet worksheet, Range usedRange, int rowIndex)
        {
            if (usedRange != null)
            {
                for (int columnIndex = usedRange.Start; columnIndex <= usedRange.End; columnIndex++)
                {
                    CellSelection selection = worksheet.Cells[rowIndex, columnIndex];
                    ICellValue cellValue = selection.GetValue().Value;
                    CellValueFormat formatting = selection.GetFormat().Value;

                    FormulaCellValue formulaCellValue = cellValue as FormulaCellValue;
                    if (formulaCellValue != null)
                    {
                        cellValue = formulaCellValue.GetResultValueAsCellValue();
                    }

                    var value = formatting.GetFormatResult(cellValue).VisibleInfosText;
                    if (!string.IsNullOrEmpty(value))
                    {
                        yield return new DTO.Cell
                        {
                            Index = columnIndex,
                            Value = value
                        };
                    }
                }
            }
        }
    }
}
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using Telerik.Windows.Documents.Spreadsheet.Core;
using Telerik.Windows.Documents.Spreadsheet.Core.DataStructures;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders;
using Telerik.Windows.Documents.Spreadsheet.FormatProviders.Contexts;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.PropertySystem;

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

        public Workbook Import(DTO.Workbook dtoWorkbook)
        {
            var workbook = new Workbook();
            workbook.History.IsEnabled = false;

            using (new UpdateScope(workbook.SuspendLayoutUpdate, workbook.ResumeLayoutUpdate))
            {
                foreach (var dtoSheet in dtoWorkbook.Sheets)
                {
                    var sheet = workbook.Worksheets.Add();
                    workbook.ActiveWorksheet = sheet;

                    foreach (var dtoRow in dtoSheet.Rows)
                    {
                        foreach (var dtoCell in dtoRow.Cells)
                        {
                            var stringValue = dtoCell.Value.ToString();
                            var selection = sheet.Cells[dtoRow.Index, dtoCell.Index];

                            double numericValue;
                            if (double.TryParse(stringValue, out numericValue))
                            {
                                selection.SetValue(numericValue);
                            }
                            else
                            {
                                selection.SetValueAsText(stringValue);
                            }

                            if (!string.IsNullOrEmpty(dtoCell.Format))
                            {
                                selection.SetFormat(new CellValueFormat(dtoCell.Format));
                            }
                        }
                    }
                }
            }

            workbook.History.IsEnabled = true;
            return workbook;
        }

        static long ConvertCellIndexToLong(int rowIndex, int columnIndex)
        {
            return (long)columnIndex * SpreadsheetDefaultValues.RowCount + rowIndex;
        }

        protected override Workbook ImportOverride(Stream input)
        {
            var serializer = new JsonSerializer();
            using (var reader = new StreamReader(input, System.Text.Encoding.UTF8, true, 4096, true))
            using (var jsonReader= new JsonTextReader(reader))
            {
                var dtoWorkbook = serializer.Deserialize<DTO.Workbook>(jsonReader);
                return Import(dtoWorkbook);
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

                    if (cellValue.ValueType != CellValueType.Empty) {
                        object value = cellValue.RawValue;
                        switch (cellValue.ValueType)
                        {
                            case CellValueType.Number:
                                value = double.Parse(cellValue.RawValue);
                                break;
                        }

                        yield return new DTO.Cell
                        {
                            Index = columnIndex,
                            Format = formatting.FormatString,
                            Value = value
                        };
                    }
                }
            }
        }
    }
}
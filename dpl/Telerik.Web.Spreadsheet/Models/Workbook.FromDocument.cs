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

                sheet.Rows.AddRange(GetRows(documentWorksheet));

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

        private static SortedDictionary<int, SortedDictionary<int, Cell>> CellProperties(DocumentWorksheet worksheet)
        {
            var state = new SortedDictionary<int, SortedDictionary<int, Cell>>();

            GetCellProperty(worksheet, CellPropertyDefinitions.ForeColorProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.FormatProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.ValueProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.FillProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.IsBoldProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.IsItalicProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.IsWrappedProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.UnderlineProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.VerticalAlignmentProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.FontSizeProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.FontFamilyProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.BottomBorderProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.TopBorderProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.LeftBorderProperty, state);

            GetCellProperty(worksheet, CellPropertyDefinitions.RightBorderProperty, state);
   
            return state;
        }

        private static void GetCellProperty<T>(DocumentWorksheet worksheet, IPropertyDefinition<T> propertyDefinition, SortedDictionary<int, SortedDictionary<int, Cell>> state)
        {
            var nonDefaultRanges = worksheet.Cells.PropertyBag.GetPropertyValueCollection(propertyDefinition).GetNonDefaultRanges();
            var setter = CellPropertySetters[propertyDefinition];

            foreach (var nonDefaultRange in nonDefaultRanges)
            {                
                var cellRange = CellsPropertyBag.ConvertLongCellRangeToCellRange(nonDefaultRange.Start, nonDefaultRange.End);

                for (var rowIndex = cellRange.FromIndex.RowIndex; rowIndex <= cellRange.ToIndex.RowIndex; rowIndex++)
                {
                    for (var columnIndex = cellRange.FromIndex.ColumnIndex; columnIndex <= cellRange.ToIndex.ColumnIndex; columnIndex++)
                    {
                        Cell cell;
                        if (state.ContainsKey(rowIndex))
                        {
                            var row = state[rowIndex];
                            if (row.ContainsKey(columnIndex))
                            {
                                cell = row[columnIndex];
                            }
                            else
                            {
                                cell = new Cell { Index = columnIndex };
                                row.Add(columnIndex, cell);
                            }
                        }
                        else
                        {
                            cell = new Cell { Index = columnIndex };
                            state.Add(rowIndex, new SortedDictionary<int, Cell> { { columnIndex, cell } });
                        }

                        setter(cell, worksheet.Workbook.Theme, nonDefaultRange.Value);
                    }
                }
            }
        }

        private static Dictionary<IPropertyDefinition, Action<Cell, DocumentTheme, object>> CellPropertySetters = new Dictionary<IPropertyDefinition, Action<Cell, DocumentTheme, object>> {
            {
                CellPropertyDefinitions.ForeColorProperty,
                (cell, theme, value) => {
                    cell.Color = "#" + ((ThemableColor)value).GetActualValue(theme.ColorScheme).ToString().Remove(0, 3);
                }
            },
            {
                CellPropertyDefinitions.FillProperty,
                (cell, theme, value) => {
                    cell.Background = "#" + ((PatternFill)value).PatternColor.GetActualValue(theme.ColorScheme).ToString().Remove(0, 3);
                }
            },
            {
                CellPropertyDefinitions.IsBoldProperty,
                (cell, theme, value) => {
                    cell.Bold = (bool)value;
                }
            },
            {
                CellPropertyDefinitions.IsItalicProperty,
                (cell, theme, value) => {
                    cell.Italic = (bool)value;
                }
            },
            {
                CellPropertyDefinitions.IsWrappedProperty,
                (cell, theme, value) => {
                    cell.Wrap = (bool)value;
                }
            },
            {
                CellPropertyDefinitions.UnderlineProperty,
                (cell, theme, value) => {
                    cell.Underline = ((UnderlineType)value) != UnderlineType.None;
                }
            },
            {
                CellPropertyDefinitions.VerticalAlignmentProperty,
                (cell, theme, value) => {
                    cell.VerticalAlign = ((RadVerticalAlignment)value).ToString().ToLower();
                }
            },
            {
                CellPropertyDefinitions.FontSizeProperty,
                (cell, theme, value) => {
                    cell.FontSize = Math.Round((double)value).ToString() + "px";
                }
            },
            {
                CellPropertyDefinitions.FontFamilyProperty,
                (cell, theme, value) => {
                    cell.FontFamily = ((ThemableFontFamily)value).GetActualValue(theme).FamilyNames.Values.First();
                }
            },
            {
                CellPropertyDefinitions.BottomBorderProperty,
                (cell, theme, value) => {
                    cell.BorderBottom = ConvertToBorder((CellBorder)value, theme);
                }
            },
            {
                CellPropertyDefinitions.TopBorderProperty,
                (cell, theme, value) => {
                    cell.BorderTop = ConvertToBorder((CellBorder)value, theme);
                }
            },
            {
                CellPropertyDefinitions.LeftBorderProperty,
                (cell, theme, value) => {
                    cell.BorderLeft = ConvertToBorder((CellBorder)value, theme);
                }
            },
            {
                CellPropertyDefinitions.RightBorderProperty,
                (cell, theme, value) => {
                    cell.BorderRight = ConvertToBorder((CellBorder)value, theme);
                }
            },
            {
                CellPropertyDefinitions.FormatProperty,
                (cell, theme, value) => {
                    cell.Format = ((CellValueFormat)value).FormatString;
                }
            },
            {
                CellPropertyDefinitions.ValueProperty,
                (cell, theme, value) => {                    
                    var cellValue = (ICellValue)value;
                    string formula = null;

                    var formulaCellValue = cellValue as FormulaCellValue;
                    if (formulaCellValue != null)
                    {
                        cellValue = formulaCellValue.GetResultValueAsCellValue();
                        formula = formulaCellValue.RawValue.Substring(1);
                    }

                    value = cellValue.RawValue;
                    if (cellValue.ValueType == CellValueType.Number)
                    {                        
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
                    }

                    cell.Value = value;
                    cell.Formula = formula;
                }
            }
        };

        private static IEnumerable<Row> GetRows(DocumentWorksheet worksheet)
        {
            var rows = GetRowsWithHeight(worksheet);            

            var cells = CellProperties(worksheet);

            foreach (var cell in cells)
            {
                var rowIndex = cell.Key;
                var rowCells = cell.Value.Select(i => i.Value).ToList();

                if (rows.ContainsKey(rowIndex)) 
                {
                    rows[rowIndex].Cells.AddRange(rowCells);
                }
                else 
                {
                    rows.Add(rowIndex, new Row
                    {
                        Index = rowIndex,
                        Cells = rowCells
                    });
                }
            }

            return rows.Values;
        }

        private static SortedDictionary<int, Row> GetRowsWithHeight(DocumentWorksheet worksheet)
        {
            var result = new SortedDictionary<int, Row>();

            var ranges = worksheet.Rows.PropertyBag.GetPropertyValueCollection(RowsPropertyBag.HeightProperty).GetNonDefaultRanges();

            foreach (var range in ranges)
            {
                var height = range.Value.Value;
                for (var i = range.Start; i <= range.End; i++)
                {
                    var rowIndex = (int)i;

                    result.Add(rowIndex, new Row
                    {
                        Index = rowIndex,
                        Height = height
                    });
                }
            }

            return result;
        }

        private static BorderStyle ConvertToBorder(CellBorder border, DocumentTheme theme)
        {
            return new BorderStyle
            {
                Color = "#" + border.Color.GetActualValue(theme).ToString().Remove(0, 3),
                Size = border.Thickness.ToString() + "px"
            };
        }   
    }
}

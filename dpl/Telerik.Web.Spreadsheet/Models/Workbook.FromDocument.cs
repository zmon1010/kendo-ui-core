using System;
using System.Collections.Generic;
using System.Linq;
using Telerik.Windows.Documents.Spreadsheet.Model;
using Telerik.Windows.Documents.Spreadsheet.Model.Filtering;
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
                var sheet = workbook.AddSheet();

                sheet.Name = documentWorksheet.Name;

                sheet.ActiveCell = NameConverter.ConvertCellIndexToName(documentWorksheet.ViewState.SelectionState.ActiveCellIndex);

                var selection = documentWorksheet.ViewState.SelectionState.SelectedRanges.First();
                sheet.Selection = NameConverter.ConvertCellRangeToName(selection.FromIndex, selection.ToIndex);

                sheet.Columns = GetColumns(documentWorksheet).ToList();

                sheet.Rows = documentWorksheet.ImportRows().ToList();

                sheet.MergedCells = GetMergedCells(documentWorksheet).ToList();

                var pane = documentWorksheet.ViewState.Pane;
                if (pane != null && pane.State == PaneState.Frozen)
                {
                    sheet.FrozenRows = pane.TopLeftCellIndex.RowIndex;
                    sheet.FrozenColumns = pane.TopLeftCellIndex.ColumnIndex;
                }

                sheet.Sort = GetSorting(documentWorksheet);

                sheet.Filter = GetFilters(documentWorksheet);
            }

            return workbook;
        }

        private static IEnumerable<string> GetMergedCells(DocumentWorksheet worksheet)
        {
            foreach (var mergedRange in worksheet.Cells.GetMergedCellRanges())
            {
                yield return NameConverter.ConvertCellRangeToName(mergedRange.FromIndex, mergedRange.ToIndex);             
            }
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

        private static Sort GetSorting(DocumentWorksheet worksheet)
        {
            var range = worksheet.SortState.SortRange;            

            if (range == null)
            {
                return null;
            }

            return new Sort
            {
                Ref = NameConverter.ConvertCellRangeToName(range.FromIndex, range.ToIndex),
                Columns = worksheet.SortState.SortConditions.OfType<ValuesSortCondition>().Select(cond => new SortColumn
                {
                    Ascending = cond.SortOrder == SortOrder.Ascending,
                    Index = cond.RelativeIndex
                }).ToList()
            };            
        }

        private static Filter GetFilters(DocumentWorksheet worksheet)
        {
            var documentFilter = worksheet.Filter;
            var range = documentFilter.FilterRange;

            if (range == null)
            {
                return null;
            }            
            
            var filter = new Filter
            {
                Ref = NameConverter.ConvertCellRangeToName(range.FromIndex, range.ToIndex),
                Columns = new List<FilterColumn>()
            };

            foreach (var item in documentFilter.Filters)
            {                
                if (item is TopFilter)
                {
                    var settings = item as TopFilter;

                    filter.Columns.Add(new FilterColumn
                    {
                        Index = settings.RelativeColumnIndex,
                        Filter = "top",
                        Type = settings.TopFilterType.ToString().ToCamelCase(),
                        Value = settings.Value
                    });
                }

                if (item is ValuesCollectionFilter)
                {
                    var settings = item as ValuesCollectionFilter;

                    filter.Columns.Add(new FilterColumn
                    {
                        Index = settings.RelativeColumnIndex,
                        Filter = "value",
                        Values = settings.StringValues.Select(value =>
                        {
                            double number;
                            bool boolean;

                            if (double.TryParse(value, out number))
                            {
                                return (object)number;
                            }
                            else if (bool.TryParse(value, out boolean))
                            {
                                return (object)boolean;
                            }
                            else
                            {
                                return value;
                            }

                        }).ToList()
                    });
                }

                if (item is DynamicFilter)
                {
                    var settings = item as DynamicFilter;

                    filter.Columns.Add(new FilterColumn
                    {
                        Filter = "dynamic",
                        Index = settings.RelativeColumnIndex,
                        Type = settings.DynamicFilterType.ToString().ToCamelCase()
                    });
                }

                if (item is CustomFilter)
                {
                    var settings = item as CustomFilter;

                    filter.Columns.Add(new FilterColumn
                    {
                        Filter = "custom",
                        Index = settings.RelativeColumnIndex,
                        Logic = settings.LogicalOperator.ToString().ToLowerInvariant(),
                        Criteria = CreateFilterCriteria(settings)
                    });
                }
            }

            return filter;
        }

        private static List<Criteria> CreateFilterCriteria(CustomFilter filter)
        {
            var criterias = new List<Criteria>();

            if (filter.Criteria1 != null)
            {
                criterias.Add(new Criteria 
                {
                    Operator = ComparisonOperators[filter.Criteria1.ComparisonOperator.ToString().ToLowerInvariant()],
                    Value = filter.Criteria1.FilterValue
                });
            }

            if (filter.Criteria2 != null)
            {
                criterias.Add(new Criteria
                {
                    Operator = ComparisonOperators[filter.Criteria2.ComparisonOperator.ToString().ToLowerInvariant()],
                    Value = filter.Criteria2.FilterValue
                });
            }

            return criterias;
        }

        private static readonly Dictionary<string, string> ComparisonOperators = new Dictionary<string, string>
        {
            { "contains", "contains" },
            { "doesnotcontain", "doesnotcontain" },
            { "startswith", "startswith" },
            { "endswith", "endswith" },
            { "equalsto", "eq" },
            { "notequalsto", "neq" },
            { "lessthan", "lt" },
            { "greaterthan", "gt" },
            { "greaterthanorequalsto", "gte" },
            { "lessthanorequalsto", "lte" }   
        };
    }
}

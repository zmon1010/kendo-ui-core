using System.Linq;
using System.Collections.Generic;
using Telerik.Windows.Documents.Spreadsheet.Model.Filtering;

namespace Telerik.Web.Spreadsheet
{    
    public static class FilterExtensions
    {
        public static FilterColumn ToFilterColumn(this IFilter filter)
        {
            if (filter is TopFilter)
            {
                return ToFilterColumn((TopFilter)filter);
            }

            if (filter is ValuesCollectionFilter)
            {
                return ToFilterColumn((ValuesCollectionFilter)filter);
            }

            if (filter is DynamicFilter)
            {
                return ToFilterColumn((DynamicFilter)filter);
            }

            if (filter is CustomFilter)
            {
                return ToFilterColumn((CustomFilter)filter);
            }

            return null;
        }

        private static FilterColumn ToFilterColumn(TopFilter filter)
        {
            return new FilterColumn
            {
                Index = filter.RelativeColumnIndex,
                Filter = "top",
                Type = filter.TopFilterType.ToString().ToCamelCase(),
                Value = filter.Value
            };
        }

        private static FilterColumn ToFilterColumn(DynamicFilter filter)
        {
            return new FilterColumn
            {
                Filter = "dynamic",
                Index = filter.RelativeColumnIndex,
                Type = filter.DynamicFilterType.ToString().ToCamelCase()
            };
        }

        private static FilterColumn ToFilterColumn(ValuesCollectionFilter filter)
        {            
            return new FilterColumn
            {
                Index = filter.RelativeColumnIndex,
                Filter = "value",
                Dates = filter.DateItems.Select(item => new ValueFilterDate {
                    Year = item.Year,
                    Month = item.Month - 1,
                    Day = item.Day,
                    Hours = item.Hour,
                    Minutes = item.Minute,
                    Seconds = item.Second
                }).ToList(),
                Values = filter.StringValues.Select(value =>
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
            };
        }      

        private static FilterColumn ToFilterColumn(CustomFilter filter)
        {
            return new FilterColumn
            {
                Filter = "custom",
                Index = filter.RelativeColumnIndex,
                Logic = filter.LogicalOperator.ToString().ToLowerInvariant(),
                Criteria = CreateFilterCriteria(filter)
            };
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

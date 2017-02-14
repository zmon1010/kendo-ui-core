using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Provides information about paging, sorting, filtering and groping of data.
    /// </summary>
    public class DataSourceRequest
    {
        public DataSourceRequest()
        {
            Page = 1;
            Aggregates = new List<AggregateDescriptor>();
        }

        /// <summary>
        /// The current page.
        /// </summary>
        public int Page
        {
            get;
            set;
        }

        /// <summary>
        /// The page size.
        /// </summary>
        public int PageSize
        {
            get;
            set;
        }

        /// <summary>
        /// The sorting of the data.
        /// </summary>
        public IList<SortDescriptor> Sorts
        {
            get;
            set;
        }

        /// <summary>
        /// The filtering of the data.
        /// </summary>
        public IList<IFilterDescriptor> Filters
        {
            get;
            set;
        }

        /// <summary>
        /// The grouping of the data.
        /// </summary>
        public IList<GroupDescriptor> Groups
        {
            get;
            set;
        }

        /// <summary>
        /// The data aggregation.
        /// </summary>
        public IList<AggregateDescriptor> Aggregates
        {
            get;
            set;
        }
    }
}

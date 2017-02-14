using System.Collections;
using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Provides the processed data after paging, sorting, filtering and grouping are applied.
    /// </summary>
    public class DataSourceResult
    {
        /// <summary>
        /// The data collection.
        /// </summary>
        public IEnumerable Data { get; set; }

        /// <summary>
        /// The total number of data entries.
        /// </summary>
        public int Total { get; set; }

        /// <summary>
        /// The result of the data aggregation.
        /// </summary>
        public IEnumerable<AggregateResult> AggregateResults { get; set; }

        /// <summary>
        /// A list of errors that occurred during the creation of the data result.
        /// </summary>
        public object Errors { get; set; }
    }
}

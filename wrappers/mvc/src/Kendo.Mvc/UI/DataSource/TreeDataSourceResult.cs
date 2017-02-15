using System.Collections;
using System.Collections.Generic;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Provides the processed data after sorting, filtering and grouping are applied.
    /// </summary>
    public class TreeDataSourceResult
    {
        public TreeDataSourceResult()
        {
            AggregateResults = new Dictionary<string, IEnumerable<AggregateResult>>();
        }

        /// <summary>
        /// The data collection.
        /// </summary>
        public IEnumerable Data { get; set; }

        /// <summary>
        /// The result of the data aggregation.
        /// </summary>
        public IDictionary<string, IEnumerable<AggregateResult>> AggregateResults { get; set; }

        /// <summary>
        /// A list of errors that occurred during the creation of the data result.
        /// </summary>
        public object Errors { get; set; }
    }
}

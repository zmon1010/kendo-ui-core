namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the Gantt assignments <see cref="DataSource"/>.
    /// </summary>
    public class GanttAssignmentsDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, GanttAssignmentsDataSourceBuilder<TModel>>
        where TModel : class
    {
        
        /// <summary>
        /// Initializes a new instance of the <see cref="GanttAssignmentsDataSourceBuilder"/> class.
        /// </summary>
        /// <param name="dataSource">The datasource</param>
        /// <param name="viewContext">The viewContext</param>
        /// <param name="urlGenerator">The Url generator</param>
        public GanttAssignmentsDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}

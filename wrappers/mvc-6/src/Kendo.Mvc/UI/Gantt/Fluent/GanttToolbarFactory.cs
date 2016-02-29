using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring List<GanttToolbar<TTaskModel, TDependenciesModel>>
    /// </summary>
    public partial class GanttToolbarFactory<TTaskModel, TDependenciesModel>
        where TTaskModel : class, IGanttTask  where TDependenciesModel : class, IGanttDependency 
    {
        public GanttToolbarFactory(List<GanttToolbar<TTaskModel, TDependenciesModel>> container)
        {
            Container = container;
        }

        protected List<GanttToolbar<TTaskModel, TDependenciesModel>> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}

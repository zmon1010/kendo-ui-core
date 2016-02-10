using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring ChartPane
    /// </summary>
    public partial class ChartPaneBuilder<T>
        where T : class 
    {
        public ChartPaneBuilder(ChartPane<T> container)
        {
            Container = container;
        }

        protected ChartPane<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}

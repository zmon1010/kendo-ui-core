using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListColumn
    /// </summary>
    public partial class TreeListColumnBuilder<T>
        
    {
        public TreeListColumnBuilder(TreeListColumn<T> container)
        {
            Container = container;
        }

        protected TreeListColumn<T> Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}

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

		/// <summary>
		/// Provides a way to specify a custom editing UI for the column. Use the container parameter to create the editing UI.
		/// </summary>
		/// <param name="value">The value that configures the editor.</param>
		public TreeListColumnBuilder<T> Editor(string value)
		{
			Container.Editor = value;

			return this;
		}		
	}
}

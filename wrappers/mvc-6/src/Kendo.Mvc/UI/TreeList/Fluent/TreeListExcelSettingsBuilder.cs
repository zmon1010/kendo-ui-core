using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListExcelSettings
    /// </summary>
    public partial class TreeListExcelSettingsBuilder
        
    {
        public TreeListExcelSettingsBuilder(TreeListExcelSettings container)
        {
            Container = container;
        }

        protected TreeListExcelSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}

using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring TreeListPdfSettings
    /// </summary>
    public partial class TreeListPdfSettingsBuilder
        
    {
        public TreeListPdfSettingsBuilder(TreeListPdfSettings container)
        {
            Container = container;
        }

        protected TreeListPdfSettings Container
        {
            get;
            private set;
        }

        // Place custom settings here
    }
}

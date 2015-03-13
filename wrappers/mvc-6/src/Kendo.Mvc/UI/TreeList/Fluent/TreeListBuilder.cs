using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI TreeList
    /// </summary>
    public partial class TreeListBuilder<T>: WidgetBuilderBase<TreeList<T>, TreeListBuilder<T>>
        where T : class 
    {
        public TreeListBuilder(TreeList<T> component) : base(component)
        {
        }

        // Place custom settings here
    }
}


using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI ListBox
    /// </summary>
    public partial class ListBoxBuilder<T>: WidgetBuilderBase<ListBox<T>, ListBoxBuilder<T>>
        where T : class 
    {
        public ListBoxBuilder(ListBox<T> component) : base(component)
        {
        }

        // Place custom settings here
    }
}


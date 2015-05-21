using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Slider
    /// </summary>
    public partial class SliderBuilder<T>: WidgetBuilderBase<Slider<T>, SliderBuilder<T>>
        where T : struct, IComparable
    {
        public SliderBuilder(Slider<T> component) : base(component)
        {
        }

        /// <summary>Sets the title of the slider draghandle.</summary>
        public SliderBuilder<T> DragHandleTitle(string title)
        {
            Component.DragHandleTitle = title;

            return this;
        }

        public SliderBuilder<T> Tooltip(bool value)
        {
            Container.Tooltip.Slider = Container;
            Container.Tooltip.Enabled = value;

            return this;
        }
    }
}


using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI RadialGauge
    /// </summary>
    public partial class RadialGaugeBuilder: WidgetBuilderBase<RadialGauge, RadialGaugeBuilder>, IHideObjectMembers

    {
        public RadialGaugeBuilder(RadialGauge component) : base(component)
        {
        }

        /// <summary>
        /// Sets the theme of the radial gauge.
        /// </summary>
        /// <param name="theme">The radial gauge theme.</param>
        /// <example>
        /// <code lang="CS">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///            .Name("radialGauge")
        ///            .Theme("Black")
        /// %&gt;
        /// </code>
        /// </example>
        public RadialGaugeBuilder Theme(string theme)
        {
            Component.Theme = theme;
            return this;
        }

        /// <summary>
        /// Sets the preferred rendering engine.
        /// If it is not supported by the browser, the Chart will switch to the first available mode.
        /// </summary>
        /// <param name="renderAs">The preferred rendering engine.</param>
        public RadialGaugeBuilder RenderAs(RenderingMode renderAs)
        {
            Component.RenderAs = renderAs;
            return this;
        }

        /// <summary>
        /// Allows configuring multiple pointers
        /// </summary>
        /// <param name="configurator">The lambda which configures the pointers</param>
        /// <example>
        /// <code lang="ASPX">
        /// &lt;%= Html.Kendo().RadialGauge()
        ///     .Name("gauge")
        ///     .Pointers(pointer =>
        ///     {
        ///         pointer.Add().Value(10);
        ///         pointer.Add().Value(20);
        ///     })
        /// %&gt;
        /// </code>
        /// <code lang="Razor">
        /// @(Html.Kendo().RadialGauge()
        ///     .Name("gauge")
        ///     .Pointers(pointer =>
        ///     {
        ///         pointer.Add().Value(10);
        ///         pointer.Add().Value(20);
        ///     })
        /// )
        /// </code>
        /// </example>
        //public RadialGaugeBuilder Pointers(Action<GaugeRadialPointerFactory> configurator)
        //{
        //    GaugeRadialPointerFactory factory = new GaugeRadialPointerFactory(Component);

        //    configurator(factory);

        //    return this;
        //}
    }
}


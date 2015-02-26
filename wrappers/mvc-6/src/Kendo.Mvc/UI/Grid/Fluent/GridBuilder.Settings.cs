using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// The fluent API for configuring Kendo UI Grid for ASP.NET MVC.
    /// </summary>
    public partial class GridBuilder<T>
        where T : class
    {
		/// <summary>
		/// Configures the Excel export settings.
		/// </summary>
		/// <code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Excel(excel => excel.FileName(&quot;GridExport.xlsx&quot))
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>	
		/// </example>
		public GridBuilder<T> Excel(Action<GridExcelBuilder> configurator)
		{
			configurator(new GridExcelBuilder(Component.Excel));

			return this;
		}

		/// <summary>
		/// Configures the PDF export settings.
		/// </summary>
		/// <code lang="Razor">
		/// @(Html.Kendo().Grid&lt;Product&gt;()
		///     .Name(&quot;grid&quot;)
		///     .Pdf(pdf => pdf.FileName(&quot;GridExport.pdf&quot))
		///     .DataSource(dataSource =&gt;
		///         // configure the data source
		///         dataSource
		///             .Ajax()
		///             .Read(read =&gt; read.Action(&quot;Products_Read&quot;, &quot;Home&quot;))
		///     )
		/// )
		/// </code>		
		/// </example>
		public GridBuilder<T> Pdf(Action<PDFSettingsBuilder> configurator)
		{
			configurator(new PDFSettingsBuilder(Component.Pdf));

			return this;
		}
	}
}
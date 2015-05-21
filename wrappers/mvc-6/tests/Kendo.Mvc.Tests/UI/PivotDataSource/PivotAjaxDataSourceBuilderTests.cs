namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.Tests;
    using Microsoft.AspNet.Mvc.ModelBinding;
    using Xunit;

    public class PivotAjaxDataSourceBuilderTests
    {
        private readonly PivotDataSource dataSource;
        private readonly PivotAjaxDataSourceBuilder<object> builder;

        public PivotAjaxDataSourceBuilderTests()
        {
            var pivot = new PivotGrid<object>(TestHelper.CreateViewContext());
            dataSource = pivot.DataSource;             
            builder = new PivotAjaxDataSourceBuilder<object>(dataSource, pivot.ViewContext, pivot.UrlGenerator);
        }

        [Fact]
        public void Transport_should_return_builder()
        {
            builder.Transport(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Events_should_configure_the_events()
        {
            builder.Events(e => e.RequestStart("OnRequestStart"));
            dataSource.Events.ContainsKey("requestStart").ShouldBeTrue();
        }

        [Fact]
        public void Events_should_return_builder()
        {
            builder.Events(e => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Columns_should_return_builder()
        {
            builder.Columns(c => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Rows_should_return_builder()
        {
            builder.Rows(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_return_builder()
        {
            builder.Measures(m => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_configure_measures_options()
        {
            builder.Measures(m => m.Axis(PivotDataSourceMeasureAxis.Rows));
            dataSource.Measure.Axis.ShouldEqual(PivotDataSourceMeasureAxis.Rows);
        }

        [Fact]
        public void Schema_should_return_builder()
        {
            builder.Schema(r => { }).ShouldBeSameAs(builder);
        }
    }
}

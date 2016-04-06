using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class SparklineBuilderTests
    {
        private readonly Sparkline<object> chart;
        private readonly SparklineBuilder<object> builder;

        public SparklineBuilderTests()
        {
            chart = SparklineTestHelper.CreateSparkline<object>();
            builder = new SparklineBuilder<object>(chart);
        }

        [Fact]
        public void Builder_should_set_AutoBind()
        {
            var value = true;

            builder.AutoBind(value);

            chart.AutoBind.ShouldEqual(value);
        }

        [Fact]
        public void AutoBind_should_return_builder()
        {
            builder.AutoBind(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_AxisDefaults()
        {
            var value = "value";

            builder.AxisDefaults(x => x.Color(value));

            chart.AxisDefaults.Color.ShouldEqual(value);
        }

        [Fact]
        public void AxisDefaults_should_return_builder()
        {
            builder.AxisDefaults(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_ChartArea()
        {
            var value = "value";

            builder.ChartArea(x => x.Background(value));

            chart.ChartArea.Background.ShouldEqual(value);
        }

        [Fact]
        public void ChartArea_should_return_builder()
        {
            builder.ChartArea(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Data()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Data(value);

            chart.SeriesData.ShouldEqual(value);
        }

        [Fact]
        public void Data_should_return_builder()
        {
            builder.Data(new int[] { 1, 2, 3 }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Data_with_double_value()
        {
            var value = 1.2;

            builder.Data(value);

            chart.SeriesData.ShouldEqual(new double[] { 1.2 });
        }

        [Fact]
        public void Data_with_double_value_should_return_builder()
        {
            builder.Data(1.2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DataSource_should_return_builder()
        {
            builder.DataSource(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_CategoryAxis_Categories()
        {
            var categories = new string[] { "category1", "category2" };

            builder.CategoryAxis(axis => axis.Categories(categories));

            chart.CategoryAxis[0].Categories.ShouldEqual(categories);
        }

        [Fact]
        public void CategoryAxis_should_return_builder()
        {
            builder.CategoryAxis(delegate { }).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Builder_should_set_Legend()
        {
            var value = "value";

            builder.Legend(x => x.Background(value));

            chart.Legend.Background.ShouldEqual(value);
        }

        [Fact]
        public void Legend_should_return_builder()
        {
            builder.Legend(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Legend_Visible()
        {
            var value = true;

            builder.Legend(value);

            chart.Legend.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Legend_with_boolean_overload_should_return_builder()
        {
            builder.Legend(true).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Panes_should_return_builder()
        {
            builder.Panes(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_PointWidth()
        {
            var value = 1.2;

            builder.PointWidth(value);

            chart.PointWidth.ShouldEqual(value);
        }

        [Fact]
        public void PointWidth_should_return_builder()
        {
            builder.PointWidth(1.2).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Pdf_should_return_builder()
        {
            builder.Pdf(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_PlotArea()
        {
            var value = "value";

            builder.PlotArea(x => x.Background(value));

            chart.PlotArea.Background.ShouldEqual(value);
        }

        [Fact]
        public void PlotArea_should_return_builder()
        {
            builder.PlotArea(delegate { }).ShouldBeSameAs(builder);
        }


        [Fact]
        public void Builder_should_set_RenderAs()
        {
            var value = RenderingMode.VML;

            builder.RenderAs(RenderingMode.VML);

            chart.RenderAs.ShouldEqual(value);
        }

        [Fact]
        public void RenderAs_should_return_builder()
        {
            builder.RenderAs(RenderingMode.VML).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Series()
        {
            var value = new int[] { 1, 2, 3 };

            builder.Series(x => x.Area(new int[] { 1, 2, 3 }));

            chart.Series[0].Data.ShouldEqual(value);
        }

        [Fact]
        public void Series_should_return_builder()
        {
            builder.Series(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_SeriesColors()
        {
            builder.SeriesColors("red", "green");

            chart.SeriesColors.ShouldEqual(new string[] { "red", "green" });
        }

        [Fact]
        public void SeriesColors_should_return_builder()
        {
            builder.SeriesColors("red", "green").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_SeriesColors_with_array()
        {
            builder.SeriesColors(new string[] { "red", "green" });

            chart.SeriesColors.ShouldEqual(new string[] { "red", "green" });
        }

        [Fact]
        public void SeriesColors_with_array_overload_should_return_builder()
        {
            builder.SeriesColors(new string[] { "red", "green" }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SeriesDefaults_should_return_builder()
        {
            builder.SeriesDefaults(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Theme()
        {
            var value = "value";

            builder.Theme(value);

            chart.Theme.ShouldEqual(value);
        }

        [Fact]
        public void Theme_should_return_builder()
        {
            builder.Theme("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Title()
        {
            var value = "value";

            builder.Title(value);

            chart.Title.Text.ShouldEqual(value);
        }

        [Fact]
        public void Title_should_return_builder()
        {
            builder.Title("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Tooltip()
        {
            var value = "value";

            builder.Tooltip(x => x.Background(value));

            chart.Tooltip.Background.ShouldEqual(value);
        }

        [Fact]
        public void Tooltip_should_return_builder()
        {
            builder.Tooltip(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Tooltip_Visible()
        {
            var value = true;

            builder.Tooltip(value);

            chart.Tooltip.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Tooltip_with_boolean_overload_should_return_builder()
        {
            builder.Tooltip(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Transitions()
        {
            var value = true;

            builder.Transitions(value);

            chart.Transitions.ShouldEqual(value);
        }

        [Fact]
        public void Transitions_should_return_builder()
        {
            builder.Transitions(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Type()
        {
            var value = SparklineType.Bullet;

            builder.Type(value);

            chart.Type.ShouldEqual(value);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type(SparklineType.Bullet).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_ValueAxis()
        {
            var value = "name";

            builder.ValueAxis(axis => axis.Name(value));

            chart.ValueAxis[0].Name.ShouldEqual(value);
        }

        [Fact]
        public void ValueAxis_should_return_builder()
        {
            builder.ValueAxis(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_XAxis()
        {
            var value = "name";

            builder.XAxis(axis => axis.Name(value));

            chart.XAxis[0].Name.ShouldEqual(value);
        }

        [Fact]
        public void XAxis_should_return_builder()
        {
            builder.XAxis(delegate { }).ShouldBeSameAs(builder);
        }        
    }
}
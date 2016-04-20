using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class VerticalBoxPlotSeriesFactoryTests
    {
        private readonly Chart<BoxPlotData> chart;
        private readonly ChartSeriesFactory<BoxPlotData> factory;

        public VerticalBoxPlotSeriesFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<BoxPlotData>();
            factory = new ChartSeriesFactory<BoxPlotData>(chart.Series);
        }

        [Fact]
        public void VerticalBoxPlot_series_with_custom_data_should_set_Type()
        {
            factory.VerticalBoxPlot(new int[] { });

            chart.Series[0].Type.ShouldEqual("verticalBoxPlot");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_custom_data_should_set_series_data()
        {
            var data = new int[] { 1, 2, 3 };

            factory.VerticalBoxPlot(data);

            chart.Series[0].Data.ShouldBeSameAs(data);
        }

        [Fact]
        public void VerticalBoxPlot_series_with_custom_data_should_return_builder()
        {
            var builder = factory.VerticalBoxPlot(new int[] { });

            builder.ShouldBeType(typeof(ChartSeriesBuilder<BoxPlotData>));
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_LowerField()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].LowerField.ShouldEqual("Lower");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_Q1Field()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].Q1Field.ShouldEqual("Q1");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_MedianField()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].MedianField.ShouldEqual("Median");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_Q3Field()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].Q3Field.ShouldEqual("Q3");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_UpperField()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].UpperField.ShouldEqual("Upper");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_MeanField()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].MeanField.ShouldEqual("Mean");
        }
        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_OutliersField()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].OutliersField.ShouldEqual("Outliers");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_not_set_Name()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_set_Type()
        {
            CreateSeriesWithOptionalExpressions();

            chart.Series[0].Type.ShouldEqual("verticalBoxPlot");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_optional_expressions_should_return_builder()
        {
            var builder = CreateSeriesWithOptionalExpressions();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<BoxPlotData>));
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_LowerField()
        {
            CreateSeries();

            chart.Series[0].LowerField.ShouldEqual("Lower");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_Q1Field()
        {
            CreateSeries();

            chart.Series[0].Q1Field.ShouldEqual("Q1");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_MedianField()
        {
            CreateSeries();

            chart.Series[0].MedianField.ShouldEqual("Median");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_Q3Field()
        {
            CreateSeries();

            chart.Series[0].Q3Field.ShouldEqual("Q3");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_UpperField()
        {
            CreateSeries();

            chart.Series[0].UpperField.ShouldEqual("Upper");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_not_set_Name()
        {
            CreateSeries();

            chart.Series[0].Name.ShouldEqual(null);
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_set_Type()
        {
            CreateSeries();

            chart.Series[0].Type.ShouldEqual("verticalBoxPlot");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_expressions_should_return_builder()
        {
            var builder = CreateSeries();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<BoxPlotData>));
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_LowerField()
        {
            CreateSeriesWithMembers();

            chart.Series[0].LowerField.ShouldEqual("Lower");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_Q1Field()
        {
            CreateSeriesWithMembers();

            chart.Series[0].Q1Field.ShouldEqual("Q1");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_MedianField()
        {
            CreateSeriesWithMembers();

            chart.Series[0].MedianField.ShouldEqual("Median");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_Q3Field()
        {
            CreateSeriesWithMembers();

            chart.Series[0].Q3Field.ShouldEqual("Q3");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_UpperField()
        {
            CreateSeriesWithMembers();

            chart.Series[0].UpperField.ShouldEqual("Upper");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_MeanField()
        {
            CreateSeriesWithMembers();

            chart.Series[0].MeanField.ShouldEqual("Mean");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_OutliersField()
        {
            CreateSeriesWithMembers();

            chart.Series[0].OutliersField.ShouldEqual("Outliers");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_Name()
        {
            CreateSeriesWithMembers();

            chart.Series[0].Name.ShouldEqual("Lower, Q1, Median, Q3, Upper");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_set_Type()
        {
            CreateSeriesWithMembers();

            chart.Series[0].Type.ShouldEqual("verticalBoxPlot");
        }

        [Fact]
        public void VerticalBoxPlot_series_with_members_should_return_builder()
        {
            var builder = CreateSeriesWithMembers();

            builder.ShouldBeType(typeof(ChartSeriesBuilder<BoxPlotData>));
        }

        private ChartSeriesBuilder<BoxPlotData> CreateSeries()
        {
            return factory.VerticalBoxPlot(x => x.Lower, x => x.Q1, x => x.Median, x => x.Q3, x => x.Upper);
        }

        private ChartSeriesBuilder<BoxPlotData> CreateSeriesWithOptionalExpressions()
        {
            return factory.VerticalBoxPlot(x => x.Lower, x => x.Q1, x => x.Median, x => x.Q3, x => x.Upper, x => x.Mean, x => x.Outliers);
        }

        private ChartSeriesBuilder<BoxPlotData> CreateSeriesWithMembers()
        {
            return factory.VerticalBoxPlot("Lower", "Q1", "Median", "Q3", "Upper", "Mean", "Outliers");
        }
    }
}
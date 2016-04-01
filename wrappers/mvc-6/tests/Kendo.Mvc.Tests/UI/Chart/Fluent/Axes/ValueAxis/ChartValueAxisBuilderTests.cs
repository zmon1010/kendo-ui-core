using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartValueAxisBuilderTests
    {
        private readonly ChartValueAxis<SalesData> axis;
        private readonly ChartValueAxisBuilder<SalesData> builder;

        public ChartValueAxisBuilderTests()
        {
            axis = new ChartValueAxis<SalesData>();
            builder = new ChartValueAxisBuilder<SalesData>(axis);
        }

        [Fact]
        public void Builder_should_set_Color()
        {
            var value = "red";

            builder.Color(value);

            axis.Color.ShouldEqual(value);
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Crosshair()
        {
            var value = true;

            builder.Crosshair(x => x.Visible(value));

            axis.Crosshair.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Crosshair_should_return_builder()
        {
            builder.Crosshair(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Date()
        {
            builder.Date();

            axis.Type.ShouldEqual("date");
        }

        [Fact]
        public void Date_should_return_builder()
        {
            builder.Date().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Labels()
        {
            var value = true;

            builder.Labels(x => x.Visible(value));

            axis.Labels.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Labels_should_return_builder()
        {
            builder.Labels(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Line()
        {
            var value = true;

            builder.Line(x => x.Visible(value));

            axis.Line.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Line_should_return_builder()
        {
            builder.Line(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MajorGridLines()
        {
            var value = true;

            builder.MajorGridLines(x => x.Visible(value));

            axis.MajorGridLines.Visible.ShouldEqual(value);
        }

        [Fact]
        public void MajorGridLines_should_return_builder()
        {
            builder.MajorGridLines(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MajorTicks()
        {
            var value = true;

            builder.MajorTicks(x => x.Visible(value));

            axis.MajorTicks.Visible.ShouldEqual(value);
        }

        [Fact]
        public void MajorTicks_should_return_builder()
        {
            builder.MajorTicks(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Max()
        {
            var value = 1;

            builder.Max(value);

            axis.Max.ShouldEqual(value);
        }
        
        [Fact]
        public void Builder_should_set_MinorGridLines()
        {
            var value = true;

            builder.MinorGridLines(x => x.Visible(value));

            axis.MinorGridLines.Visible.ShouldEqual(value);
        }

        [Fact]
        public void MinorGridLines_should_return_builder()
        {
            builder.MinorGridLines(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MinorTicks()
        {
            var value = true;

            builder.MinorTicks(x => x.Visible(value));

            axis.MinorTicks.Visible.ShouldEqual(value);
        }

        [Fact]
        public void MinorTicks_should_return_builder()
        {
            builder.MinorTicks(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Name()
        {
            var value = "red";

            builder.Name(value);

            axis.Name.ShouldEqual(value);
        }

        [Fact]
        public void Name_should_return_builder()
        {
            builder.Name("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_numeric_axis_type()
        {
            builder.Numeric();

            axis.Type.ShouldEqual("numeric");
        }

        [Fact]
        public void Numeric_should_return_builder()
        {
            builder.Numeric().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_the_name_of_numeric_axis()
        {
            var value = "name";

            builder.Numeric(value);

            axis.Name.ShouldEqual(value);
        }

        [Fact]
        public void Numeric_axis_type_with_name_should_return_builder()
        {
            builder.Numeric("name").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Pane()
        {
            var value = "red";

            builder.Pane(value);

            axis.Pane.ShouldEqual(value);
        }

        [Fact]
        public void Pane_should_return_builder()
        {
            builder.Pane("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Type()
        {
            var value = "red";

            builder.Type(value);

            axis.Type.ShouldEqual(value);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void PlotBands_should_return_builder()
        {
            builder.PlotBands(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Reverse_with_default_value()
        {
            builder.Reverse();

            axis.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Reverse__with_default_value_should_return_builder()
        {
            builder.Reverse().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Reverse()
        {
            var value = true;

            builder.Reverse(value);

            axis.Reverse.ShouldEqual(value);
        }

        [Fact]
        public void Reverse_should_return_builder()
        {
            builder.Reverse(true).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Builder_should_set_Title()
        {
            var value = true;

            builder.Title(x => x.Visible(value));

            axis.Title.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Title_with_string()
        {
            var value = "value";

            builder.Title(value);

            axis.Title.Text.ShouldEqual(value);
        }

        [Fact]
        public void Title_should_return_builder()
        {
            builder.Title(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Title_with_string_should_return_builder()
        {
            builder.Title("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Visible()
        {
            var value = true;

            builder.Visible(value);

            axis.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Visible_should_return_builder()
        {
            builder.Visible(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Notes()
        {
            var value = ChartNotePosition.Bottom;

            builder.Notes(x => x.Position(value));

            axis.Notes.Position.ShouldEqual(value);
        }

        [Fact]
        public void Notes_should_return_builder()
        {
            builder.Notes(delegate { }).ShouldBeSameAs(builder);
        }
    }
}
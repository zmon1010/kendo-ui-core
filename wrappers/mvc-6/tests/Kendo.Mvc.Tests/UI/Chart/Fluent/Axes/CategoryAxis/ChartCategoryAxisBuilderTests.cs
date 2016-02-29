using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;
using System.Collections.Generic;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartCategoryAxisBuilderTests
    {
        private readonly ChartCategoryAxis<SalesData> axis;
        private readonly ChartCategoryAxisBuilder<SalesData> builder;

        public ChartCategoryAxisBuilderTests()
        {
            axis = new ChartCategoryAxis<SalesData>();
            builder = new ChartCategoryAxisBuilder<SalesData>(axis);
        }

        [Fact]
        public void Builder_should_set_AutoBaseUnitSteps()
        {
            var value = new int[] { 1, 2, 3 };

            builder.AutoBaseUnitSteps(steps => steps.Seconds(1, 2, 3));

            axis.AutoBaseUnitSteps.Seconds.ShouldEqual<object>(value);
        }

        [Fact]
        public void AutoBaseUnitSteps_should_return_builder()
        {
            builder.AutoBaseUnitSteps(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_AxisCrossingValue()
        {
            var value = new object[] { 1, 2, 3 };

            builder.AxisCrossingValue(value);

            axis.AxisCrossingValue.ShouldEqual<object>(value);
        }

        [Fact]
        public void Builder_should_set_AxisCrossingValue_with_dates()
        {
            var value = new object[] { new DateTime(2016, 1, 1) };

            builder.AxisCrossingValue(value);

            axis.AxisCrossingValue.ShouldEqual<object>(value);
        }

        [Fact]
        public void AxisCrossingValue_should_return_builder()
        {
            builder.AxisCrossingValue(1, 2, 3).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Background()
        {
            var value = "red";

            builder.Background(value);

            axis.Background.ShouldEqual(value);
        }

        [Fact]
        public void Background_should_return_builder()
        {
            builder.Background("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_BaseUnit()
        {
            var value = ChartAxisBaseUnit.Days;

            builder.BaseUnit(value);

            axis.BaseUnit.ShouldEqual(value);
        }

        [Fact]
        public void BaseUnit_should_return_builder()
        {
            builder.BaseUnit(ChartAxisBaseUnit.Days).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_BaseUnitStep()
        {
            var value = 1;

            builder.BaseUnitStep(value);

            axis.BaseUnitStep.ShouldEqual(value);
        }

        [Fact]
        public void BaseUnitStep_should_return_builder()
        {
            builder.BaseUnitStep(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Categories_with_strings()
        {
            builder.Categories("value1", "value2");

            axis.Categories.ShouldEqual(new string[] { "value1", "value2" });
        }

        [Fact]
        public void Builder_should_set_Categories_with_array_of_strings()
        {
            var value = new string[] { "value1", "value2" };

            builder.Categories(value);

            axis.Categories.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Categories_with_numeric_data()
        {
            var value = new object[] { 1, 2, 3 };

            builder.Categories(value);

            axis.Categories.ShouldEqual<object>(value);
        }

        [Fact]
        public void Categories_with_strings_should_return_builder()
        {
            builder.Categories("valuee1", "value2").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Categories_with_DateTime()
        {
            var value = new object[] { new DateTime(2016, 1, 1), new DateTime(2016, 1, 2) };

            builder.Categories(value);

            axis.Categories.ShouldBeSameAs(value);
        }
        
        [Fact]
        public void Builder_with_Categories_expression_should_set_Field()
        {
            builder.Categories(x => x.TotalSales);

            axis.Field.ShouldEqual("TotalSales");
        }

        [Fact]
        public void Builder_with_invalid_Categories_expression_should_throw_an_error()
        {
            Assert.Throws<InvalidOperationException>(() => builder.Categories(x => new object()));
        }
        
        [Fact]
        public void Builder_with_Categories_expression_should_return_builder()
        {
            builder.Categories(x => x.TotalSales).ShouldBeSameAs(builder);
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

            axis.Type.ShouldEqual(ChartCategoryAxisType.Date);
        }

        [Fact]
        public void Date_should_return_builder()
        {
            builder.Date().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Field()
        {
            var value = "value";

            builder.Field(value);

            axis.Field.ShouldEqual(value);
        }
        
        [Fact]
        public void Field_should_return_builder()
        {
            builder.Field("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_default_Justify()
        {
            builder.Justify();

            axis.Justify.ShouldEqual(true);
        }


        [Fact]
        public void Builder_should_set_Justify()
        {
            var value = true;

            builder.Justify(value);

            axis.Justify.ShouldEqual(value);
        }

        [Fact]
        public void Justify_default_should_return_builder()
        {
            builder.Justify().ShouldBeSameAs(builder);
        }

        [Fact]
        public void Justify_should_return_builder()
        {
            builder.Justify(true).ShouldBeSameAs(builder);
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
        public void Builder_should_set_Max_with_date()
        {
            var value = new DateTime(2016, 1, 1); ;

            builder.Max(value);

            axis.Max.ShouldEqual(value);
        }

        [Fact]
        public void Max_should_return_builder()
        {
            builder.Max(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_MaxDateGroups()
        {
            var value = 1;

            builder.MaxDateGroups(value);

            axis.MaxDateGroups.ShouldEqual(value);
        }

        [Fact]
        public void MaxDateGroups_should_return_builder()
        {
            builder.MaxDateGroups(1).ShouldBeSameAs(builder);
        }


        [Fact]
        public void Builder_should_set_Min()
        {
            var value = 1;

            builder.Min(value);

            axis.Min.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Min_with_date()
        {
            var value = new DateTime(2016, 1, 1); ;

            builder.Min(value);

            axis.Min.ShouldEqual(value);
        }

        [Fact]
        public void Min_should_return_builder()
        {
            builder.Min(1).ShouldBeSameAs(builder);
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
            var value = ChartCategoryAxisType.Date;

            builder.Type(value);

            axis.Type.ShouldEqual(value);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type(ChartCategoryAxisType.Date).ShouldBeSameAs(builder);
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
        public void Builder_should_set_RoundToBaseUnit()
        {
            var value = true;

            builder.RoundToBaseUnit(value);

            axis.RoundToBaseUnit.ShouldEqual(value);
        }

        [Fact]
        public void RoundToBaseUnit_should_return_builder()
        {
            builder.RoundToBaseUnit(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Select()
        {
            var value = 1;

            builder.Select(x => x.Min(value));

            axis.Select.Min.ShouldEqual(value);
        }

        [Fact]
        public void Select_should_return_builder()
        {
            builder.Select(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_StartAngle()
        {
            var value = 1.2;

            builder.StartAngle(value);

            axis.StartAngle.ShouldEqual(value);
        }

        [Fact]
        public void StartAngle_should_return_builder()
        {
            builder.StartAngle(1.2).ShouldBeSameAs(builder);
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
        public void Builder_should_set_WeekStartDay()
        {
            var value = 1;

            builder.WeekStartDay(value);

            axis.WeekStartDay.ShouldEqual(value);
        }

        [Fact]
        public void WeekStartDay_should_return_builder()
        {
            builder.WeekStartDay(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Notes()
        {
            var value = "red";

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
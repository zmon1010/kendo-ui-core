using Xunit;
using Kendo.Mvc.UI.Fluent;
using System;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartCategoryAxisBuilderTests
    {
        private readonly ChartCategoryAxis<SalesData> categoryAxis;
        private readonly ChartCategoryAxisBuilder<SalesData> builder;

        public ChartCategoryAxisBuilderTests()
        {
            categoryAxis = new ChartCategoryAxis<SalesData>();
            builder = new ChartCategoryAxisBuilder<SalesData>(categoryAxis);
        }

        [Fact]
        public void Builder_should_set_AutoBaseUnitSteps()
        {
            var value = new int[] { 1, 2, 3 };

            builder.AutoBaseUnitSteps(steps => steps.Seconds(1, 2, 3));

            categoryAxis.AutoBaseUnitSteps.Seconds.ShouldEqual<object>(value);
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

            categoryAxis.AxisCrossingValue.ShouldEqual<object>(value);
        }

        [Fact]
        public void Builder_should_set_AxisCrossingValue_with_dates()
        {
            var value = new object[] { new DateTime(2016, 1, 1) };

            builder.AxisCrossingValue(value);

            categoryAxis.AxisCrossingValue.ShouldEqual<object>(value);
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

            categoryAxis.Background.ShouldEqual(value);
        }

        [Fact]
        public void Background_should_return_builder()
        {
            builder.Background("red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_BaseUnit()
        {
            var value = "day";

            builder.BaseUnit(value);

            categoryAxis.BaseUnit.ShouldEqual(value);
        }

        [Fact]
        public void BaseUnit_should_return_builder()
        {
            builder.BaseUnit("day").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_BaseUnitStep()
        {
            var value = 1;

            builder.BaseUnitStep(value);

            categoryAxis.BaseUnitStep.ShouldEqual(value);
        }

        [Fact]
        public void BaseUnitStep_should_return_builder()
        {
            builder.BaseUnitStep(1).ShouldBeSameAs(builder);
        }


        [Fact]
        public void Builder_should_set_Categories()
        {
            var value = new string[] { "category1", "category2" };

            builder.Categories(value);

            categoryAxis.Categories.ShouldEqual(value);
        }

        [Fact]
        public void Categories_should_return_builder()
        {
            builder.Categories(1, 2).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Color()
        {
            var value = "red";

            builder.Color(value);

            categoryAxis.Color.ShouldEqual(value);
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

            categoryAxis.Crosshair.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Crosshair_should_return_builder()
        {
            builder.Crosshair(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Field()
        {
            var value = "value";

            builder.Field(value);

            categoryAxis.Field.ShouldEqual(value);
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

            categoryAxis.Justify.ShouldEqual(true);
        }


        [Fact]
        public void Builder_should_set_Justify()
        {
            var value = true;

            builder.Justify(value);

            categoryAxis.Justify.ShouldEqual(value);
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

            categoryAxis.Labels.Visible.ShouldEqual(value);
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

            categoryAxis.Line.Visible.ShouldEqual(value);
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

            categoryAxis.MajorGridLines.Visible.ShouldEqual(value);
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

            categoryAxis.MajorTicks.Visible.ShouldEqual(value);
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

            categoryAxis.Max.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Max_with_date()
        {
            var value = new DateTime(2016, 1, 1); ;

            builder.Max(value);

            categoryAxis.Max.ShouldEqual(value);
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

            categoryAxis.MaxDateGroups.ShouldEqual(value);
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

            categoryAxis.Min.ShouldEqual(value);
        }

        [Fact]
        public void Builder_should_set_Min_with_date()
        {
            var value = new DateTime(2016, 1, 1); ;

            builder.Min(value);

            categoryAxis.Min.ShouldEqual(value);
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

            categoryAxis.MinorGridLines.Visible.ShouldEqual(value);
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

            categoryAxis.MinorTicks.Visible.ShouldEqual(value);
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

            categoryAxis.Name.ShouldEqual(value);
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

            categoryAxis.Pane.ShouldEqual(value);
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

            categoryAxis.Type.ShouldEqual(value);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type("red").ShouldBeSameAs(builder);
        }

        //        [Fact]
        //public void Builder_should_set_PlotBands()
        //{
        //    var value = true;

        //    builder.PlotBands(x => x.Visible(value));

        //    categoryAxis.PlotBands.Visible.ShouldEqual(value);
        //}

        [Fact]
        public void PlotBands_should_return_builder()
        {
            builder.PlotBands(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Reverse_with_default_value()
        {
            builder.Reverse();

            categoryAxis.Reverse.ShouldEqual(true);
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

            categoryAxis.Reverse.ShouldEqual(value);
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

            categoryAxis.RoundToBaseUnit.ShouldEqual(value);
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

            categoryAxis.Select.Min.ShouldEqual(value);
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

            categoryAxis.StartAngle.ShouldEqual(value);
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

            categoryAxis.Title.Visible.ShouldEqual(value);
        }

        [Fact]
        public void Title_should_return_builder()
        {
            builder.Title(delegate { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Visible()
        {
            var value = true;

            builder.Visible(value);

            categoryAxis.Visible.ShouldEqual(value);
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

            categoryAxis.WeekStartDay.ShouldEqual(value);
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

            categoryAxis.Notes.Position.ShouldEqual(value);
        }

        [Fact]
        public void Notes_should_return_builder()
        {
            builder.Notes(delegate { }).ShouldBeSameAs(builder);
        }
    }
}
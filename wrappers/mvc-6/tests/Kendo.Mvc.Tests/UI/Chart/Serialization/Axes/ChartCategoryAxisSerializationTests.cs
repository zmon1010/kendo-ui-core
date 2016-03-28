using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartCategoryAxisSerializationTests
    {
        private readonly ChartCategoryAxis<object> axis;

        public ChartCategoryAxisSerializationTests()
        {
            axis = new ChartCategoryAxis<object>();
        }

        [Fact]
        public void Default_Justify_should_not_be_serialized()
        {
            axis.Serialize().ContainsKey("justified").ShouldBeFalse();
        }

        [Fact]
        public void Justify_should_be_serialized_as_justified()
        {
            var value = true;

            axis.Justify = value;

            axis.Serialize()["justified"].ShouldEqual(value);
        }

        [Fact]
        public void Default_BaseUnit_should_not_be_serialized()
        {
            axis.Serialize().ContainsKey("baseUnit").ShouldBeFalse();
        }

        [Fact]
        public void BaseUnit_should_be_serialized()
        {
            axis.BaseUnit = ChartAxisBaseUnit.Days;

            axis.Serialize()["baseUnit"].ShouldEqual("days");
        }

        [Fact]
        public void Default_Type_should_not_be_serialized()
        {
            axis.Serialize().ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Type_should_be_serialized()
        {
            axis.Type = ChartCategoryAxisType.Date;

            axis.Serialize()["type"].ShouldEqual("date");
        }
    }
}
using Kendo.Mvc.UI;
using Xunit;

namespace Kendo.Mvc.Tests
{
    public class LabelsSettingsSerializationTests
    {
        private readonly ChartSeriesLabelsSettings<object> settings;

        public LabelsSettingsSerializationTests()
        {
            settings = new ChartSeriesLabelsSettings<object>();
        }

        [Fact]
        public void Default_Position_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("position").ShouldBeFalse();
        }

        [Fact]
        public void Position_should_be_serialized()
        {
            settings.Position = ChartSeriesLabelsPosition.OutsideEnd;

            settings.Serialize()["position"].ShouldEqual("outsideEnd");
        }
    }
}

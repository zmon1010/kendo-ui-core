using Kendo.Mvc.UI.Fluent;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class SchedulerCurrentTimeMarkerBuilderTests
    {
        private readonly SchedulerCurrentTimeMarkerSettings<SchedulerEvent> currentTimeMarker;
        private readonly SchedulerCurrentTimeMarkerSettingsBuilder<SchedulerEvent> builder;

        public SchedulerCurrentTimeMarkerBuilderTests()
        {
            currentTimeMarker = new SchedulerCurrentTimeMarkerSettings<SchedulerEvent>();
            builder = new SchedulerCurrentTimeMarkerSettingsBuilder<SchedulerEvent>(currentTimeMarker);
        }

        [Fact]
        public void UseLocalTimezone_sets_the_corresponding_property()
        {
            var useLocalTimezone = false;
            builder.UseLocalTimezone(useLocalTimezone);

            Assert.Equal(useLocalTimezone, currentTimeMarker.UseLocalTimezone);
        }

        [Fact]
        public void UpdateInterval_sets_the_corresponding_property()
        {
            var updateInterval = 100;
            builder.UpdateInterval(updateInterval);

            Assert.Equal(updateInterval, currentTimeMarker.UpdateInterval);
        }
    }
}

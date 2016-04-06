using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class SparklineTestHelper
    {
        public static Sparkline<T> CreateSparkline<T>() where T : class
        {
            return new Sparkline<T>(TestHelper.CreateViewContext()) { Name = "#Sparkline" };
        }

        public static SparklineMock<T> CreateSparklineMock<T>() where T : class
        {
            return new SparklineMock<T>(TestHelper.CreateViewContext()) { Name = "SparklineMock" };
        }
    }
}
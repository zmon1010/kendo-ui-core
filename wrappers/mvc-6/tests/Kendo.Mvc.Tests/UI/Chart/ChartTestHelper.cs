using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class ChartTestHelper
    {
        public static Chart<T> CreateChart<T>() where T : class
        {
            return new Chart<T>(TestHelper.CreateViewContext()) { Name = "#Chart" };
        }
    }
}
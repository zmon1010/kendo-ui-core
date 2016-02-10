namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Mvc.Tests;
    public class ChartTestHelper
    {
        public static Chart<T> CreateChart<T>() where T : class
        {
            return new Chart<T>(TestHelper.CreateViewContext()) { Name = "#Chart" };
        }
    }
}
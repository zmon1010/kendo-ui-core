using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class StockChartTestHelper
    {
        public static StockChart<T> CreateStockChart<T>() where T : class
        {
            return new StockChart<T>(TestHelper.CreateViewContext()) { Name = "#StockChart" };
        }
    }
}
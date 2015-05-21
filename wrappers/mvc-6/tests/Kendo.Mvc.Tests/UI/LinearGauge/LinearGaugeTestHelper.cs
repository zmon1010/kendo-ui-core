namespace Kendo.Mvc.UI.Tests.LinearGauge
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Tests;

    public class LinearGaugeTestHelper
    {
        public static LinearGauge CreateRadialGauge()
        {
            var viewContext = TestHelper.CreateViewContext();

            return new LinearGauge(viewContext);
        }
    }
}

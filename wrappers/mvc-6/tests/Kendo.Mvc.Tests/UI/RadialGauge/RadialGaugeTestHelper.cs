namespace Kendo.Mvc.UI.Tests.RadialGauge
{
    using Moq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.Tests;

    public class RadialGaugeTestHelper
    {
        public static RadialGauge CreateRadialGauge()
        {
            var viewContext = TestHelper.CreateViewContext();

            return new RadialGauge(viewContext);
        }
    }
}

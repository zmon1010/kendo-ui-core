namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using System.Web.Mvc;

    public static class CalendarTestHelper
    {
        public static Calendar CreateCalendar(ViewContext viewContext)
        {
            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var initializer = new Mock<IJavaScriptInitializer>();
            Mock<IUrlGenerator> urlGenerator = new Mock<IUrlGenerator>();

            var calendar = new Calendar(viewContext, initializer.Object, urlGenerator.Object);

            return calendar;
        }
    }
}
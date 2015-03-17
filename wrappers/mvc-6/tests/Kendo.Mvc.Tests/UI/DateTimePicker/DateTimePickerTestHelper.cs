namespace Kendo.Mvc.UI.Tests
{
	using Infrastructure;
	using Microsoft.AspNet.Mvc;
	using Moq;

	public static class DateTimePickerTestHelper
    {
        public static DateTimePicker CreateDateTimePicker(ViewContext viewContext)
        {
            var initializer = new Mock<IJavaScriptInitializer>();

            DateTimePicker dateTimePicker = new DateTimePicker(viewContext);

            return dateTimePicker;
        }
    }
}
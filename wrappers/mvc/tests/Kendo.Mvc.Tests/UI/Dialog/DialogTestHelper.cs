namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;
    using Moq;
    using Kendo.Mvc.Infrastructure;

    public class DialogTestHelper
    {
        static public Dialog CreateDialog()
        {
            ViewContext viewContext = TestHelper.CreateViewContext();

            return new Dialog(viewContext, new JavaScriptInitializer(), new UrlGenerator());
        }

        static public string GetEventHandler(Dialog component, string eventName)
        {
            return ((ClientHandlerDescriptor) component.Events[eventName]).HandlerName;
        }

    }
}

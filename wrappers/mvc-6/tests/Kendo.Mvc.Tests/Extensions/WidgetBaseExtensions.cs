using System;
using System.Collections.Generic;
using System.IO;
using Kendo.Mvc.Infrastructure;
using Kendo.Mvc.UI;
using Moq;

namespace Kendo.Mvc.Extensions.Tests
{
    public static class WidgetBaseExtensions
    {
        public static void AssertSettings(this WidgetBase component, Action<IDictionary<string, object>> assert)
        {
            var test = new Func<IDictionary<string, object>, bool>(settings => {
                assert(settings);
                return true;
            });

            var initializer = new Mock<IJavaScriptInitializer>();
            initializer.Setup(i => i.Initialize(
                It.IsAny<string>(),
                It.IsAny<string>(),
                It.Is<IDictionary<string, object>>(settings => test(settings))));

            component.Initializer = initializer.Object;
            component.WriteInitializationScript(new Mock<TextWriter>().Object);
        }
    }
}

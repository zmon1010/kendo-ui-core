using System;
using Moq;
using Kendo.Mvc.Rendering;
using Microsoft.AspNet.Mvc.Infrastructure;
using Microsoft.AspNet.Mvc.ModelBinding;
using Microsoft.Extensions.OptionsModel;
using Microsoft.AspNet.Mvc;
using Microsoft.AspNet.Mvc.ViewFeatures;

namespace Kendo.Mvc.Tests
{
    public class KendoHtmlGeneratorTestHelper
    {
        public static KendoHtmlGenerator CreateKendoHtmlGenerator()
        {
            var actionBindingContextAccessor = new Mock<IActionBindingContextAccessor>().Object;
            var metadataProvider = new Mock<IModelMetadataProvider>().Object;
            var requestServices = new Mock<IServiceProvider>().Object;
            var optionsAccessorMoq = new Mock<IOptions<MvcViewOptions>>();
            optionsAccessorMoq
                .SetupGet(c => c.Value)
                .Returns(new MvcViewOptions() { HtmlHelperOptions = new HtmlHelperOptions() { IdAttributeDotReplacement = "_" } });

            var optionsAccessor = optionsAccessorMoq.Object;

            var generator = new KendoHtmlGenerator(
                actionBindingContextAccessor,
                metadataProvider,
                requestServices,
                optionsAccessor);

            return generator;
        }
    }
}

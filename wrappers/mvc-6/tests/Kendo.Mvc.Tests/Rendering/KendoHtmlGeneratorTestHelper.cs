using System;
using Moq;
using Kendo.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Tests
{
    public class KendoHtmlGeneratorTestHelper
    {
        public static KendoHtmlGenerator CreateKendoHtmlGenerator()
        {
            var metadataProvider = new Mock<IModelMetadataProvider>().Object;
            var requestServices = new Mock<IServiceProvider>().Object;
            var optionsAccessorMoq = new Mock<IOptions<MvcViewOptions>>();
            optionsAccessorMoq
                .SetupGet(c => c.Value)
                .Returns(new MvcViewOptions() { HtmlHelperOptions = new HtmlHelperOptions() { IdAttributeDotReplacement = "_" } });

            var optionsAccessor = optionsAccessorMoq.Object;

            var generator = new KendoHtmlGenerator(
                metadataProvider,
                requestServices,
                optionsAccessor,
                null);

            return generator;
        }
    }
}

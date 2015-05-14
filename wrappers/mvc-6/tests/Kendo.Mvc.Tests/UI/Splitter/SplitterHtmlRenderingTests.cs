namespace Kendo.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Rendering;
    using Kendo.Mvc.Tests;
    using Microsoft.AspNet.Mvc.Rendering;
    using Moq;
    using Xunit;

    public class SplitterHtmlRenderingTests
    {
        private readonly Splitter splitter;
        private readonly SplitterPane pane;
        private readonly Mock<IKendoHtmlGenerator> generatorMock;

        public SplitterHtmlRenderingTests()
        {
            splitter = new Splitter(TestHelper.CreateViewContext());
            pane = new SplitterPane();
            generatorMock = Mock.Get(splitter.ViewContext.GetService<IKendoHtmlGenerator>());
        }

        [Fact]
        public void CreateSplitter_outputs_div()
        {
            splitter.Name = "foo";
            generatorMock.Setup(g => g.GenerateTag("div", splitter.ViewContext, It.IsAny<string>(), It.IsAny<string>(), It.IsAny<IDictionary<string, object>>()))
                .Returns(new TagBuilder("div"))
                .Verifiable();

            splitter.ToHtmlString();

            generatorMock.VerifyAll();
        }

        [Fact]
        public void CreateSplitter_sets_id()
        {
            const string id = "mySplitter";

            splitter.Name = id;

            generatorMock.Setup(g => g.GenerateTag(It.IsAny<string>(), splitter.ViewContext, id, id, It.IsAny<IDictionary<string, object>>()))
                  .Returns(new TagBuilder("div"))
                  .Verifiable();

            splitter.ToHtmlString();

            generatorMock.VerifyAll();
        }

        [Fact]
        public void CreateSplitter_applies_HtmlAttributes()
        {
            splitter.HtmlAttributes.Add("foo", "bar");           

            splitter.Name = "foo";

            generatorMock.Setup(g => g.GenerateTag(It.IsAny<string>(), splitter.ViewContext, It.IsAny<string>(), It.IsAny<string>(), splitter.HtmlAttributes))
                  .Returns(new TagBuilder("div"))
                  .Verifiable();

            splitter.ToHtmlString();

            generatorMock.VerifyAll();
        }              

    }
}

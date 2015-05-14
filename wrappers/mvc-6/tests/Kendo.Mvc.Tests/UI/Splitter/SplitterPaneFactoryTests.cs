namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.Tests;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class SplitterPaneFactoryTests
    {
        private readonly Splitter splitter;
        private readonly SplitterPaneFactory factory;

        public SplitterPaneFactoryTests()
        {
            splitter = new Splitter(TestHelper.CreateViewContext());

            factory = new SplitterPaneFactory(splitter.Panes);
        }

        [Fact]
        public void Add_adds_pane_to_splitter()
        {
            factory.Add();

            Assert.Equal(1, splitter.Panes.Count);
        }

        [Fact]
        public void Add_returns_SplitterPaneBuilder()
        {
            Assert.IsType<SplitterPaneBuilder>(factory.Add());
        }
    }
}
namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartNavigatorSelectionBuilderTests
    {
        private readonly ChartNavigatorSelectionBuilder builder;
        private readonly ChartNavigatorSelection selection;

        public ChartNavigatorSelectionBuilderTests()
        {
            selection = new ChartNavigatorSelection();
            builder = new ChartNavigatorSelectionBuilder(selection);
        }

        [Fact]
        public void Builder_should_set_From()
        {
            var from = new DateTime(2012, 1, 1);

            builder.From(from);

            selection.From.ShouldEqual(from);
        }

        [Fact]
        public void From_should_return_builder()
        {
            builder.From(new DateTime(2012, 1, 1)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_To()
        {
            var to = new DateTime(2012, 1, 1);

            builder.To(to);

            selection.To.ShouldEqual(to);
        }

        [Fact]
        public void To_should_return_builder()
        {
            builder.To(new DateTime(2012, 1, 1)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Mousewheel()
        {
            builder.Mousewheel(x => x.Reverse());

            selection.Mousewheel.Reverse.ShouldEqual(true);
        }
        
        [Fact]
        public void Builder_should_set_Mousewheel_Enabled()
        {
            builder.Mousewheel(true);

            selection.Mousewheel.Enabled.ShouldEqual(true);
        }

        [Fact]
        public void Mousewheel_should_return_builder()
        {
            builder.Mousewheel(x => { }).ShouldBeSameAs(builder);
        }
    }
}
namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Moq;
    using System.IO;
    using Xunit;
    using Kendo.Mvc.Tests;

    public class PivotGridBuilderTests
    {
        private readonly PivotGrid<object> pivotGrid;
        private readonly PivotGridBuilder<object> builder;

        public PivotGridBuilderTests()
        {
            pivotGrid = new PivotGrid<object>(TestHelper.CreateViewContext());
            builder = new PivotGridBuilder<object>(pivotGrid);
        }

        [Fact]
        public void AutoBind_sets_the_corresponding_property()
        {
            builder.AutoBind(false);
            Assert.False(pivotGrid.AutoBind);
        }

        [Fact]
        public void Filterable_sets_the_corresponding_property()
        {
            builder.Filterable(true);
            Assert.True(pivotGrid.Filterable);
        }

        [Fact]
        public void Reorderable_sets_the_corresponding_property()
        {
            builder.Reorderable(false);
            Assert.False(pivotGrid.Reorderable);
        }

        [Fact]
        public void Messages_sets_the_corresponding_property()
        {
            string value = "custom message";
            builder.Messages(m => m.ColumnFields(value));

            pivotGrid.Messages.ColumnFields.Equals(value);
        }

        [Fact]
        public void Messages_FieldMenu_sets_the_corresponding_property()
        {
            string value = "custom message";
            builder.Messages(m => m.FieldMenu(fm => fm.Info(value)));

            pivotGrid.Messages.FieldMenu.Info.Equals(value);
        }
    }
}

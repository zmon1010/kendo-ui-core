namespace Kendo.Mvc.Tests.TreeView
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class TreeViewBuilderTests
    {
        private readonly TreeView treeView;
        private readonly TreeViewBuilder builder;

        public TreeViewBuilderTests()
        {
            var viewContext = TestHelper.CreateViewContext();
            treeView = new TreeView(viewContext);
            builder = new TreeViewBuilder(treeView);
        }

        [Fact]
        public void DataSource_Model_is_ModelDescriptor_type()
        {
            Assert.True(treeView.DataSource.Schema.Model.GetType() == typeof(ModelDescriptor));
        }
    }
}

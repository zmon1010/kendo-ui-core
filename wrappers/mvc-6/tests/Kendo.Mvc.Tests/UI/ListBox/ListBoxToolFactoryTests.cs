namespace Kendo.Mvc.Tests.UI
{
    using Mvc.UI;
    using Mvc.UI.Fluent;
    using System.Collections.Generic;
    using Xunit;

    public class ListBoxToolFactoryTests
    {
        private readonly ListBox component;
        private readonly ListBoxBuilder builder;

        public ListBoxToolFactoryTests()
        {
            component = new ListBox(TestHelper.CreateViewContext());
            builder = new ListBoxBuilder(component);
        }

        [Fact]
        public void Empty_Toolbar_Should_Not_Add_Tools()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => { }));

            component.Toolbar.Tools.ShouldEqual(new List<string>());
        }

        [Fact]
        public void MoveUp_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.MoveUp()));

            component.Toolbar.Tools.Contains("moveUp").ShouldBeTrue();
        }

        [Fact]
        public void MoveDown_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.MoveDown()));

            component.Toolbar.Tools.Contains("moveDown").ShouldBeTrue();
        }

        [Fact]
        public void Remove_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.Remove()));

            component.Toolbar.Tools.Contains("remove").ShouldBeTrue();
        }

        [Fact]
        public void TransferAllFrom_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.TransferAllFrom()));

            component.Toolbar.Tools.Contains("transferAllFrom").ShouldBeTrue();
        }

        [Fact]
        public void TransferAllTo_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.TransferAllTo()));

            component.Toolbar.Tools.Contains("transferAllTo").ShouldBeTrue();
        }

        [Fact]
        public void TransferFrom_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.TransferFrom()));

            component.Toolbar.Tools.Contains("transferFrom").ShouldBeTrue();
        }

        [Fact]
        public void TransferTo_Tool_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(tools => tools.TransferTo()));

            component.Toolbar.Tools.Contains("transferTo").ShouldBeTrue();
        }

        [Fact]
        public void All_Tools_Should_Be_Added()
        {
            builder.Toolbar(toolbar => toolbar.Tools(
                t => t.MoveUp()
                    .MoveDown()
                    .Remove()
                    .TransferAllFrom()
                    .TransferAllTo()
                    .TransferFrom()
                    .TransferTo()
            ));

            var tools = component.Toolbar.Tools;
            tools.Contains("moveUp").ShouldBeTrue();
            tools.Contains("moveDown").ShouldBeTrue();
            tools.Contains("remove").ShouldBeTrue();
            tools.Contains("transferAllFrom").ShouldBeTrue();
            tools.Contains("transferAllTo").ShouldBeTrue();
            tools.Contains("transferFrom").ShouldBeTrue();
            tools.Contains("transferTo").ShouldBeTrue();
        }
    }
}

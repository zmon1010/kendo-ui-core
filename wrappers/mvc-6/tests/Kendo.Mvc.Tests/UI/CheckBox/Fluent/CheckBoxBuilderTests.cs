using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class CheckBoxBuilderTests
    {
        private readonly CheckBox checkBox;
        private readonly CheckBoxBuilder builder;

        public CheckBoxBuilderTests()
        {
            checkBox = CheckBoxTestHelper.CreateCheckBox();
            builder = new CheckBoxBuilder(checkBox);
        }

        [Fact]
        public void Builder_should_set_Checked()
        {
            var value = true;

            builder.Checked(value);

            checkBox.Checked.ShouldEqual(value);
        }

        [Fact]
        public void Checked_should_return_builder()
        {
            builder.Checked(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Enable()
        {
            var value = true;

            builder.Enable(value);

            checkBox.Enabled.ShouldEqual(value);
        }

        [Fact]
        public void Enable_should_return_builder()
        {
            builder.Enable(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Label()
        {
            var value = "value";

            builder.Label(value);

            checkBox.Label.ShouldEqual(value);
        }

        [Fact]
        public void Label_should_return_builder()
        {
            builder.Label("value").ShouldBeSameAs(builder);
        }
    }
}
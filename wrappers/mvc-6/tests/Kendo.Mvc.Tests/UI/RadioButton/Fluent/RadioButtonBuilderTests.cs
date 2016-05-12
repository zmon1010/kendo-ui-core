using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;

namespace Kendo.Mvc.UI.Tests
{
    public class RadioButtonBuilderTests
    {
        private readonly RadioButton radioButton;
        private readonly RadioButtonBuilder builder;

        public RadioButtonBuilderTests()
        {
            radioButton = RadioButtonTestHelper.CreateRadioButton();
            builder = new RadioButtonBuilder(radioButton);
        }

        [Fact]
        public void Builder_should_set_Checked()
        {
            var value = true;

            builder.Checked(value);

            radioButton.Checked.ShouldEqual(value);
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

            radioButton.Enabled.ShouldEqual(value);
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

            radioButton.Label.ShouldEqual(value);
        }

        [Fact]
        public void Label_should_return_builder()
        {
            builder.Label("value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Value()
        {
            var value = "value";

            builder.Value(value);

            radioButton.Value.ShouldEqual(value);
        }

        [Fact]
        public void Value_should_return_builder()
        {
            builder.Value("value").ShouldBeSameAs(builder);
        }
    }
}
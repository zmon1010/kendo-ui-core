using System.IO;
using Kendo.Mvc.Tests;
using Moq;
using Moq.Protected;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class RadioButtonRenderingTests
    {
        private readonly RadioButtonMock radioButtonMock;

        public RadioButtonRenderingTests()
        {
            radioButtonMock = RadioButtonTestHelper.CreateRadioButtonMock();
        }

        [Fact]
        public void RadioButton_should_be_rendered_with_attributes()
        {
            var expected =
                 "<input class=\"k-radio\" id=\"RadioButtonMock_\" name=\"RadioButtonMock\" type=\"radio\" value=\"\" />" +
                 "<label class=\"k-radio-label\" for=\"RadioButtonMock_\"></label>";

            var html = radioButtonMock.ToHtmlString();

            html.ShouldEqual(expected);
        }

        [Fact]
        public void RadioButton_should_verify_settings_in_WriteHtml()
        {
            var radioButtonMock = new Mock<RadioButtonMock>(TestHelper.CreateViewContext());
            var builderMock = new RadioButtonHtmlBuilderMock(radioButtonMock.Object);
            radioButtonMock.Protected().Setup<RadioButtonHtmlBuilder>("GetHtmlBuilder").Returns(builderMock);
            radioButtonMock.Setup(x => x.VerifySettings());

            radioButtonMock.Object.WriteHtml(new StringWriter());

            radioButtonMock.Verify(x => x.VerifySettings(), Times.Once());
        }
    }
}

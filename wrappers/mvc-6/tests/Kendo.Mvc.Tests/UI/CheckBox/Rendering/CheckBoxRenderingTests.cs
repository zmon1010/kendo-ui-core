using System.IO;
using Kendo.Mvc.Tests;
using Moq;
using Moq.Protected;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class CheckBoxRenderingTests
    {
        private readonly CheckBoxMock checkBox;

        public CheckBoxRenderingTests()
        {
            checkBox = CheckBoxTestHelper.CreateCheckBoxMock();
        }

        [Fact]
        public void CheckBox_should_be_rendered_with_attributes()
        {
            var expected =
                 "<input class=\"k-checkbox\" " +
                        "id=\"CheckBoxMock\" name=\"CheckBoxMock\" type=\"checkbox\" value=\"true\" />" +
                 "<label class=\"k-checkbox-label\" for=\"CheckBoxMock\"></label>" +
                 "<input name=\"CheckBoxMock\" type=\"hidden\" value=\"false\" />";

            var html = checkBox.ToHtmlString();

            html.ShouldEqual(expected);
        }

        [Fact]
        public void CheckBox_should_verify_settings_in_WriteHtml()
        {
            var checkBoxMock = new Mock<CheckBoxMock>(TestHelper.CreateViewContext());
            var builderMock = new CheckBoxHtmlBuilderMock(checkBoxMock.Object);
            checkBoxMock.Protected().Setup<CheckBoxHtmlBuilder>("GetHtmlBuilder").Returns(builderMock);
            checkBoxMock.Setup(x => x.VerifySettings());

            checkBoxMock.Object.WriteHtml(new StringWriter());

            checkBoxMock.Verify(x => x.VerifySettings(), Times.Once());
        }
    }
}

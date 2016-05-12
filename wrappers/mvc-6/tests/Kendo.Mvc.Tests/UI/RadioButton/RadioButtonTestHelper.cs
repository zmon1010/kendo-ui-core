using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class RadioButtonTestHelper
    {
        public static RadioButton CreateRadioButton()
        {
            return new RadioButton(TestHelper.CreateViewContext()) { Name = "RadioButton" };
        }

        public static RadioButtonMock CreateRadioButtonMock()
        {
            return new RadioButtonMock(TestHelper.CreateViewContext()) { Name = "RadioButtonMock" };
        }
    }
}
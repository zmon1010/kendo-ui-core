using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class CheckBoxTestHelper
    {
        public static CheckBox CreateCheckBox()
        {
            return new CheckBox(TestHelper.CreateViewContext()) { Name = "CheckBox" };
        }

        public static CheckBoxMock CreateCheckBoxMock()
        {
            return new CheckBoxMock(TestHelper.CreateViewContext()) { Name = "CheckBoxMock" };
        }
    }
}
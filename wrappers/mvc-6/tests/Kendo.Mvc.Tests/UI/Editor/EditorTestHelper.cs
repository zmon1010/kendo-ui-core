using Kendo.Mvc.Tests;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorTestHelper
    {
        public static Editor CreateEditor()
        {
            return new Editor(TestHelper.CreateViewContext()) { Name = "#Editor" };
        }
    }
}
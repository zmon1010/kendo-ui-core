namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using Mvc.Tests;
    public class TreeMapTestHelper
    {
        public static TreeMap CreateTreeMap()
        {
            return new TreeMap(TestHelper.CreateViewContext())
            {
                Name = "#TreeMap"
            };
        }
    }
}
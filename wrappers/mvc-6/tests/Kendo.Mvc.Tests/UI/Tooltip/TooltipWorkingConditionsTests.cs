namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Kendo.Mvc.Tests;
    using Xunit;

    public class TooltipWorkingConditionsTests
    {
        private readonly Tooltip tooltip;

        public TooltipWorkingConditionsTests()
        {
            tooltip = new Tooltip(TestHelper.CreateViewContext());
            tooltip.Container = "#Tooltip";
        }

        [Fact]
        public void Does_not_throw_if_name_is_not_set()
        {
            tooltip.VerifySettings(); // should not throw   
        }

        [Fact]
        public void Throws_if_container_is_not_set()
        {
            tooltip.Container = "";
            Assert.Throws<InvalidOperationException>(() => tooltip.VerifySettings());
        }
    }
}

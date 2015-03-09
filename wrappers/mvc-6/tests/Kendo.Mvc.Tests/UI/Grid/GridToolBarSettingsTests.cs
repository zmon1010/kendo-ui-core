namespace Kendo.Mvc.UI.Tests
{
	using Moq;
	using System;
	using System.IO;
	using Xunit;
	using Kendo.Mvc.Tests;

	public class GridToolBarSettingsTests
    {
        private readonly GridToolBarSettings toolBarSettings;

        public GridToolBarSettingsTests()
        {
            toolBarSettings = new GridToolBarSettings();
        }

        [Fact]
        public void Enabled_should_return_true_if_commands_are_not_empty()
        {
            toolBarSettings.Commands.Add(new Mock<GridActionCommandBase>().Object);
            toolBarSettings.Enabled.ShouldBeTrue();
        }

        [Fact(Skip = "Implement toolbar template")]
        public void Enabled_should_return_true_if_template_is_not_empty()
        {
        //    toolBarSettings.Template.Content = () => { };
            toolBarSettings.Enabled.ShouldBeTrue();
        }
    }
}

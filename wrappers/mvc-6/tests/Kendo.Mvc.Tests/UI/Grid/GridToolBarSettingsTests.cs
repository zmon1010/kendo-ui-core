namespace Kendo.Mvc.UI.Tests
{
	using System.Collections.Generic;
	using System.Linq;
	using Moq;
	using Xunit;

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

		[Fact]
		public void Enabled_should_return_true_if_template_is_not_empty()
        {
			toolBarSettings.ClientTemplate = "foo";
            toolBarSettings.Enabled.ShouldBeTrue();
        }

		[Fact]
		public void Should_serialize_commands()
		{
			toolBarSettings.Commands.Add(new Mock<GridActionCommandBase>().Object);			
			var json = toolBarSettings.ToJson();

			json.Count.ShouldEqual(1);
			json.ContainsKey("commands").ShouldBeTrue();
			var commands = ((IEnumerable<IDictionary<string, object>>)json["commands"]);

			commands.Count().ShouldEqual(1);
		}

		[Fact]
		public void Template_should_have_presents_over_commands()
		{
			toolBarSettings.Commands.Add(new Mock<GridActionCommandBase>().Object);
			toolBarSettings.ClientTemplate = "foo";
			var json = toolBarSettings.ToJson();

			json.Count.ShouldEqual(1);
			json.ContainsKey("template").ShouldBeTrue();
		}
	}
}

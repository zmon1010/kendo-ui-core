namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using UI.Tests;
    using Moq;
    using System.Web.UI;
    using System.IO;
    using Xunit;

    public class SchedulerFooterBuilderTests
    {
        private readonly SchedulerFooterSettings footer;
        private readonly SchedulerFooterBuilder builder;

        public SchedulerFooterBuilderTests() 
        {
            footer = new SchedulerFooterSettings();
            builder = new SchedulerFooterBuilder(footer);
        }

        [Fact]
        public void Command_sets_the_corresponding_property()
        {
            var command = "workDay";
            builder.Command(command);

            Assert.Equal(command, footer.Command);
        }
    }
}

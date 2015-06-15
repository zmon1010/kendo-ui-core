namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;
    using Kendo.Mvc.UI.Tests.Diagram;

    public class DiagramTests
    {
        private readonly Diagram<object,object> diagram;

        public DiagramTests()
        {
            diagram = DiagramTestHelper<object, object>.CreateDiagram();
            diagram.Name = "diagram";
        }

        [Fact]
        public void Serializes_editable_false()
        {
            diagram.Editable.Enabled = false;
            diagram.ToHtmlString().ShouldContain("\"editable\":false");
        }
    }
}

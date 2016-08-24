namespace Kendo.Mvc.UI.Tests
{
    using System.IO;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;
    using System.Collections.Generic;
    using Kendo.Mvc.Tests;

    public class DialogSerializationTests
    {
        private readonly Dialog dialog;
        private readonly Mock<TextWriter> textWriter;
        private string output;

        public DialogSerializationTests()
        {
            textWriter = new Mock<TextWriter>();
            textWriter.Setup(tw => tw.Write(It.IsAny<string>())).Callback<string>(s => output += s);

            dialog = new Dialog(TestHelper.CreateViewContext());
            dialog.Name = "dialog";
        }

        [Fact]
        public void Default_configuration_outputs_empty_kendoDialog_init()
        {
            dialog.Name = "dialog";
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("jQuery(\"#dialog\").kendoDialog({});");
        }

        [Fact]
        public void Animation_disabled_serialized()
        {
            dialog.Animation.Enabled = false;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"animation\":false}");
        }

        [Fact]
        public void Actions_serialized()
        {
            dialog.Actions.Add(new DialogAction() { Action = new ClientHandlerDescriptor() { HandlerName = "handler" }, Primary = true, Text = "text" });
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"actions\":[{\"text\":\"text\",\"action\":handler,\"primary\":true}]}");
        }

        [Fact]
        public void Closable_serialized()
        {
            dialog.Closable = true;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"closable\":true}");
        }

        [Fact]
        public void Content_serialized()
        {
            dialog.Content = "content";
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"content\":\"content\"}");
        }

        [Fact]
        public void Height_serialized()
        {
            dialog.Height = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"height\":200}");
        }

        [Fact]
        public void Width_serialized()
        {
            dialog.Width = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"width\":200}");
        }

        [Fact]
        public void MaxHeight_serialized()
        {
            dialog.MaxHeight = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"maxHeight\":200}");
        }

        [Fact]
        public void MinHeight_serialized()
        {
            dialog.MinHeight = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"minHeight\":200}");
        }

        [Fact]
        public void MaxWidth_serialized()
        {
            dialog.MaxWidth = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"maxWidth\":200}");
        }

        [Fact]
        public void MinWidth_serialized()
        {
            dialog.MinWidth = 200;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"minWidth\":200}");
        }

        [Fact]
        public void Modal_serialized()
        {
            dialog.Modal = true;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"modal\":true}");
        }

        [Fact]
        public void Title_serialized()
        {
            dialog.Title = "Title";
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"title\":\"Title\"}");
        }

        [Fact]
        public void Visible_serialized()
        {
            dialog.Visible = true;
            dialog.WriteInitializationScript(textWriter.Object);

            output.ShouldContain("{\"visible\":true}");
        }


    }    
}
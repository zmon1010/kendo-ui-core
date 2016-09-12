namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using System;
    using System.Collections.Generic;

    public class ChartDateSelectionSerializerTests
    {
        private readonly ChartNavigatorSelection selection;
        private readonly ChartNavigatorSelectionSerializer serializer;

        public ChartDateSelectionSerializerTests()
        {
            selection = new ChartNavigatorSelection();
            serializer = new ChartNavigatorSelectionSerializer(selection);
        }

        [Fact]
        public void Should_serialize_From()
        {
            selection.From = new DateTime(2012, 1, 1);
            serializer.Serialize()["from"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_From_if_not_set()
        {
            serializer.Serialize().ContainsKey("from").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_To()
        {
            selection.To = new DateTime(2012, 1, 1);
            serializer.Serialize()["to"].ShouldEqual("2012/01/01 00:00:00");
        }

        [Fact]
        public void Should_not_serialize_To_if_not_set()
        {
            serializer.Serialize().ContainsKey("to").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Mousewheel()
        {
            selection.Mousewheel = new ChartNavigatorSelectionMousewheel() { Reverse = true };
            GetJson().ContainsKey("mousewheel").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_Mousewheel_Enabled()
        {
            selection.Mousewheel.Enabled = false; 

            GetJson()["mousewheel"].ShouldEqual(false);
        }

        [Fact]
        public void Should_not_serialize_Mousewheel_Enabled()
        {
            selection.Mousewheel.Enabled = true;

            GetJson().ContainsKey("mousewheel").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_Mousewheel_if_not_set()
        {
            GetJson().ContainsKey("mousewheel").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return selection.CreateSerializer().Serialize();
        }
    }
}
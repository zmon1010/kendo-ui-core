using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Microsoft.AspNet.Routing;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorImageBrowserBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorImageBrowserSettings settings;
        private readonly EditorImageBrowserSettingsBuilder builder;
        private const string ACTION = "action";
        private const string CONTROLLER = "controller";
        private const string ROUTE = "route";
        private readonly object routeValues;
        private readonly RouteValueDictionary routeDictionary;

        public EditorImageBrowserBuilderTests()
        {
            editor = EditorTestHelper.CreateEditor();
            settings = new EditorImageBrowserSettings() { Editor = editor };
            builder = new EditorImageBrowserSettingsBuilder(settings);
            routeValues = new object();
            routeDictionary = new RouteValueDictionary();
        }

        [Fact]
        public void Create_hould_return_builder()
        {
            builder.Create(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Create_with_settings_builder_hould_return_builder()
        {
            builder.Create(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Create_with_routeValues_hould_return_builder()
        {
            builder.Create(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Create_with_routeDictionary_hould_return_builder()
        {
            builder.Create(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Destroy_hould_return_builder()
        {
            builder.Destroy(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Destroy_with_settings_builder_hould_return_builder()
        {
            builder.Destroy(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Destroy_with_routeValues_hould_return_builder()
        {
            builder.Destroy(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Destroy_with_routeDictionary_hould_return_builder()
        {
            builder.Destroy(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Image_hould_return_builder()
        {
            builder.Image(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Image_with_settings_builder_hould_return_builder()
        {
            builder.Image(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Image_with_routeValues_hould_return_builder()
        {
            builder.Image(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Image_with_routeDictionary_hould_return_builder()
        {
            builder.Image(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_hould_return_builder()
        {
            builder.Read(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_with_settings_builder_hould_return_builder()
        {
            builder.Read(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_with_routeValues_hould_return_builder()
        {
            builder.Read(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Read_with_routeDictionary_hould_return_builder()
        {
            builder.Read(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Upload_hould_return_builder()
        {
            builder.Upload(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Upload_with_settings_builder_hould_return_builder()
        {
            builder.Upload(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Upload_with_routeValues_hould_return_builder()
        {
            builder.Upload(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Upload_with_routeDictionary_hould_return_builder()
        {
            builder.Upload(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Thumbnail_hould_return_builder()
        {
            builder.Thumbnail(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Thumbnail_with_settings_builder_hould_return_builder()
        {
            builder.Thumbnail(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Thumbnail_with_routeValues_hould_return_builder()
        {
            builder.Thumbnail(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Thumbnail_with_routeDictionary_hould_return_builder()
        {
            builder.Thumbnail(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }
    }
}
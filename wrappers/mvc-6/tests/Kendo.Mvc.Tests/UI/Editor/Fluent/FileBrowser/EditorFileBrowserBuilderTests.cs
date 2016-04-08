using System;
using Xunit;
using Kendo.Mvc.UI;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using System.Collections.Generic;
using Microsoft.AspNet.Routing;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorFileBrowserBuilderTests
    {
        private readonly Editor editor;
        private readonly EditorFileBrowserSettings settings;
        private readonly EditorFileBrowserSettingsBuilder builder;
        private const string ACTION = "action";
        private const string CONTROLLER = "controller";
        private const string ROUTE = "route";
        private readonly object routeValues;
        private readonly RouteValueDictionary routeDictionary;

        public EditorFileBrowserBuilderTests()
        {
            editor = EditorTestHelper.CreateEditor();
            settings = new EditorFileBrowserSettings() { Editor = editor };
            builder = new EditorFileBrowserSettingsBuilder(settings);
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
        public void File_hould_return_builder()
        {
            builder.File(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void File_with_settings_builder_hould_return_builder()
        {
            builder.File(x => x.Url("value")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void File_with_routeValues_hould_return_builder()
        {
            builder.File(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void File_with_routeDictionary_hould_return_builder()
        {
            builder.File(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
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
    }
}
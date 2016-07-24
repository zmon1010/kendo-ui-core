using System;
using Xunit;
using Kendo.Mvc.UI.Fluent;
using Kendo.Mvc.Tests;
using Microsoft.AspNetCore.Routing;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorFileBrowserOperationBuilderTests
    {
        private readonly EditorFileBrowserOperation operation;
        private readonly Editor editor;
        private readonly EditorFileBrowserOperationBuilder builder;
        private const string ACTION = "action";
        private const string CONTROLLER = "controller";
        private const string ROUTE = "route";
        private readonly object routeValues;
        private readonly RouteValueDictionary routeDictionary;

        public EditorFileBrowserOperationBuilderTests()
        {
            operation = new EditorFileBrowserOperation();
            editor = new Editor(TestHelper.CreateViewContext());
            builder = new EditorFileBrowserOperationBuilder(operation, editor.ViewContext, editor.UrlGenerator);
            routeValues = new object();
            routeDictionary = new RouteValueDictionary();
        }

        [Fact]
        public void Builder_should_set_Action()
        {
            builder.Action(ACTION, CONTROLLER);

            operation.ActionName.ShouldEqual(ACTION);
            operation.ControllerName.ShouldEqual(CONTROLLER);
        }

        [Fact]
        public void Action_with_Route_should_return_builder()
        {
            builder.Action(ACTION, CONTROLLER).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Action_with_RouteDictionary()
        {
            builder.Action(ACTION, CONTROLLER, routeDictionary);

            operation.ActionName.ShouldEqual(ACTION);
            operation.ControllerName.ShouldEqual(CONTROLLER);
        }

        [Fact]
        public void Action_with_RouteDictionary_should_return_builder()
        {
            builder.Action(ACTION, CONTROLLER, routeDictionary).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Action_with_RouteValues()
        {
            builder.Action(ACTION, CONTROLLER, routeValues);

            operation.ActionName.ShouldEqual(ACTION);
            operation.ControllerName.ShouldEqual(CONTROLLER);
        }

        [Fact]
        public void Action_with_RouteValues_should_return_builder()
        {
            builder.Action(ACTION, CONTROLLER, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Route()
        {
            builder.Route(ROUTE);

            operation.RouteName.ShouldEqual(ROUTE);
        }

        [Fact]
        public void Route_should_return_builder()
        {
            builder.Route(ROUTE).ShouldBeSameAs(builder);
        }
        
        [Fact]
        public void Route_with_RouteDictionary_should_return_builder()
        {
            builder.Route(routeDictionary).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Route_with_Name_and_RouteDictionary()
        {
            builder.Route(ROUTE, routeDictionary);

            operation.RouteName.ShouldEqual(ROUTE);
        }

        [Fact]
        public void Route_with_Name_and_RouteDictionary_should_return_builder()
        {
            builder.Route(ROUTE, routeDictionary).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Builder_should_set_Route_with_Name_and_RouteValues()
        {
            builder.Route(ROUTE, routeValues);

            operation.RouteName.ShouldEqual(ROUTE);
        }

        [Fact]
        public void Route_with_Name_and_RouteValues_should_return_builder()
        {
            builder.Route(ROUTE, routeValues).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Url_should_return_builder()
        {
            builder.Url("url").ShouldBeSameAs(builder);
        }
    }
}
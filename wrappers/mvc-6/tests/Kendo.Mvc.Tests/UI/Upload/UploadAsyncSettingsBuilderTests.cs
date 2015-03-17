namespace Kendo.Mvc.UI.Html.Tests
{
	using Kendo.Mvc.Tests;
	using Kendo.Mvc.UI.Fluent;
	using Microsoft.AspNet.Routing;
	using Xunit;

	public class UploadAsyncSettingsBuilderTests
    {
		private readonly UploadAsyncSettingsBuilder builder;
		private readonly UploadAsyncSettings settings;

		public UploadAsyncSettingsBuilderTests()
		{
			settings = new UploadAsyncSettings();
			builder = new UploadAsyncSettingsBuilder(settings);
		}

		[Fact]
		public void AutoUpload_should_set_AutoUpload()
		{
			builder.AutoUpload(false);

			Assert.Equal(false, settings.AutoUpload);
		}

		[Fact]
		public void AutoUpload_should_return_builder()
		{
			builder.AutoUpload(false).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Batch_should_set_Batch()
		{
			builder.Batch(false);

			Assert.Equal(false, settings.Batch);
		}

		[Fact]
		public void Batch_should_return_builder()
		{
			builder.Batch(false).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_action_controller_and_routeValues_should_set_saveRequestSettings()
		{
			builder.Save("action", "controller", new RouteValueDictionary { { "id", 1 } });

			settings.Save.ActionName.ShouldEqual("action");
            settings.Save.ControllerName.ShouldEqual("controller");
			settings.Save.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Save_with_action_controller_and_routeValues_should_return_builder()
		{
			builder.Save("action", "controller", new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_action_controller_and_routeValues_object_should_set_saveRequestSettings()
		{
			builder.Save("action", "controller", new { id = 1 });

			settings.Save.ActionName.ShouldEqual("action");
			settings.Save.ControllerName.ShouldEqual("controller");
			settings.Save.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Save_with_action_controller_and_routeValues_object_should_return_builder()
		{
			builder.Save("action", "controller", new { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void SaveField_should_set_field()
		{
			builder.SaveField("field");

			settings.SaveField.ShouldEqual("field");
		}

		[Fact]
		public void SaveField_should_return_builder()
		{
			builder.SaveField("field").ShouldBeSameAs(builder);
		}

		[Fact]
		public void SaveUrl_should_set_Url()
		{
			builder.SaveUrl("/save");
			
			settings.SaveUrl.ShouldEqual("/save");
		}

		[Fact]
		public void SaveUrl_should_return_builder()
		{
			builder.SaveUrl("/save").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_action_controller_and_object_should_return_builder()
		{
			builder.Save("action", "controller", new { id = 1 }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_routeName_should_set_saveRequestSettings()
		{
			builder.Save("routeName");

			settings.Save.RouteName.ShouldEqual("routeName");
		}

		[Fact]
		public void Save_with_routeName_should_return_builder()
		{
			builder.Save("routeName").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_routeValues_should_set_saveRequestSettings()
		{
			builder.Save(new RouteValueDictionary { { "id", 1 } });

			settings.Save.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Save_with_routeValues_should_return_builder()
		{
			builder.Save(new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_routeName_and_routeValues_should_set_saveRequestSettings()
		{
			builder.Save("routeName", new RouteValueDictionary { { "id", 1 } });

			settings.Save.RouteName.ShouldEqual("routeName");
			settings.Save.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Save_with_routeName_and_routeValues_should_return_builder()
		{
			builder.Save("routeName", new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_routeName_and_routeValues_object_should_set_saveRequestSettings()
		{
			builder.Save("routeName", new { id = 1 });

			settings.Save.RouteName.ShouldEqual("routeName");
			settings.Save.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Save_with_routeName_and_routeValues_object_should_return_builder()
		{
			builder.Save("routeName", new { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Save_with_action_should_set_saveRequestSettings()
		{
			builder.Save<UploadStubController>(c => c.Index());

			settings.Save.ControllerName.ShouldEqual("UploadStub");
			settings.Save.ActionName.ShouldEqual("Index");
		}

		[Fact]
		public void Save_with_action_should_return_builder()
		{
			builder.Save<UploadStubController>(c => c.Index()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void RemoveField_should_set_field()
		{
			builder.RemoveField("field");

			settings.RemoveField.ShouldEqual("field");
		}

		[Fact]
		public void RemoveField_should_return_builder()
		{
			builder.RemoveField("field").ShouldBeSameAs(builder);
		}

		[Fact]
		public void RemoveUrl_should_set_Url()
		{
			builder.RemoveUrl("/remove");

			settings.RemoveUrl.ShouldEqual("/remove");
		}

		[Fact]
		public void RemoveUrl_should_return_builder()
		{
			builder.RemoveUrl("/remove").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_action_controller_and_routeValues_should_set_removeRequestSettings()
		{
			builder.Remove("action", "controller", new RouteValueDictionary { { "id", 1 } });

			settings.Remove.ActionName.ShouldEqual("action");
			settings.Remove.ControllerName.ShouldEqual("controller");
			settings.Remove.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Remove_with_action_controller_and_routeValues_should_return_builder()
		{
			builder.Remove("action", "controller", new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_action_controller_and_routeValues_object_should_set_removeRequestSettings()
		{
			builder.Remove("action", "controller", new { id = 1 });

			settings.Remove.ActionName.ShouldEqual("action");
			settings.Remove.ControllerName.ShouldEqual("controller");
			settings.Remove.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Remove_with_action_controller_and_routeValues_object_should_return_builder()
		{
			builder.Remove("action", "controller", new { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_action_and_controller_object_should_set_removeRequestSettings()
		{
			builder.Remove("action", "controller");

			settings.Remove.ActionName.ShouldEqual("action");
			settings.Remove.ControllerName.ShouldEqual("controller");
		}

		[Fact]
		public void Remove_with_action_and_controller_object_should_return_builder()
		{
			builder.Remove("action", "controller").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_routeName_should_set_removeRequestSettings()
		{
			builder.Remove("routeName");

			settings.Remove.RouteName.ShouldEqual("routeName");
		}

		[Fact]
		public void Remove_with_routeName_should_return_builder()
		{
			builder.Remove("routeName").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_routeValues_should_set_removeRequestSettings()
		{
			builder.Remove(new RouteValueDictionary { { "id", 1 } });

			settings.Remove.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Remove_with_routeValues_should_return_builder()
		{
			builder.Remove(new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_routeName_and_routeValues_should_set_removeRequestSettings()
		{
			builder.Remove("routeName", new RouteValueDictionary { { "id", 1 } });

			settings.Remove.RouteName.ShouldEqual("routeName");
			settings.Remove.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Remove_with_routeName_and_routeValues_should_return_builder()
		{
			builder.Remove("routeName", new RouteValueDictionary()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_routeName_and_routeValues_object_should_set_removeRequestSettings()
		{
			builder.Remove("routeName", new { id = 1 });

			settings.Remove.RouteName.ShouldEqual("routeName");
			settings.Remove.RouteValues["id"].ShouldEqual(1);
		}

		[Fact]
		public void Remove_with_routeName_and_routeValues_object_should_return_builder()
		{
			builder.Remove("routeName", new { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_with_action_should_set_removeRequestSettings()
		{
			builder.Remove<UploadStubController>(c => c.Index());

			settings.Remove.ControllerName.ShouldEqual("UploadStub");
			settings.Remove.ActionName.ShouldEqual("Index");
		}

		[Fact]
		public void Remove_with_action_should_return_builder()
		{
			builder.Remove<UploadStubController>(c => c.Index()).ShouldBeSameAs(builder);
		}

		[Fact]
		public void WithCredentials_should_set_WithCredentials()
		{
			builder.WithCredentials(false);
			settings.WithCredentials.ShouldEqual(false);
		}

		[Fact]
		public void WithCredentials_should_return_builder()
		{
			builder.WithCredentials(false).ShouldBeSameAs(builder);
		}
	}
}
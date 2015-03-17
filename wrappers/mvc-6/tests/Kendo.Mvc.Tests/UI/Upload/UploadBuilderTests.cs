namespace Kendo.Mvc.UI.Html.Tests
{
	using System;
	using Xunit;
	using Kendo.Mvc.Infrastructure;
	using Kendo.Mvc.Infrastructure.Implementation;
	using Kendo.Mvc.UI;
	using Kendo.Mvc.UI.Fluent;
	using Kendo.Mvc.Tests;

	public class UploadBuilderTests
	{
		private readonly Upload upload;
		private readonly UploadBuilder builder;

		public UploadBuilderTests()
		{
			upload = new Upload(TestHelper.CreateViewContext());
			builder = new UploadBuilder(upload);
		}

		[Fact]
		public void ClientEvents_should_set_events()
		{
			Action<UploadEventBuilder> clientEventsAction = eventBuilder => eventBuilder.Upload("upload");
			builder.Events(clientEventsAction);
			((ClientHandlerDescriptor)upload.Events["upload"]).HandlerName.ShouldEqual("upload");
		}

		[Fact]
		public void ClientEvents_should_return_builder()
		{
			builder.Events(eventBuilder => { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Enable_should_set_Enabled()
		{
			builder.Enable(false);
			upload.Enabled.ShouldEqual(false);
		}

		[Fact]
		public void Multiple_should_set_Multiple()
		{
			builder.Multiple(false);
			upload.Multiple.ShouldEqual(false);
		}

		[Fact]
		public void ShowFileList_should_set_ShowFileList()
		{
			builder.ShowFileList(false);
			upload.ShowFileList.ShouldEqual(false);
		}

		[Fact]
		public void ShowFileList_should_return_builder()
		{
			builder.ShowFileList(false).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Async_should_set_async_settings()
		{
			builder.Async(async => async.Save("Default"));
			upload.Async.Save.RouteName.ShouldEqual("Default");
		}

		[Fact]
		public void Async_should_return_builder()
		{
			builder.Async(async => { }).ShouldBeSameAs(builder);
		}

		[Fact]
		public void Messages_should_set_messages()
		{
			builder.Messages(msgs => msgs.Select("select"));
			upload.Messages.Select.ShouldEqual("select");
		}

		[Fact]
		public void Messages_should_return_builder()
		{
			builder.Messages(msgs => { }).ShouldBeSameAs(builder);
		}
	}
}
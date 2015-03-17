namespace Kendo.Mvc.UI.Html.Tests
{
	using System;
	using Kendo.Mvc.UI;
	using Kendo.Mvc.UI.Fluent;
	using Xunit;

	public class UploadMessagesBuilderTests
    {
		private readonly UploadMessagesSettings messages;
		private readonly UploadMessagesSettingsBuilder builder;

		public UploadMessagesBuilderTests()
		{
			messages = new UploadMessagesSettings();
			builder = new UploadMessagesSettingsBuilder(messages);
		}

		[Fact]
		public void Cancel_should_set_Cancel()
		{
			builder.Cancel("message");

			messages.Cancel.ShouldEqual("message");
		}

		[Fact]
		public void Cancel_should_return_builder()
		{
			builder.Cancel("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void DropFilesHere_should_set_DropFilesHere()
		{
			builder.DropFilesHere("message");

			messages.DropFilesHere.ShouldEqual("message");
		}

		[Fact]
		public void DropFilesHere_should_return_builder()
		{
			builder.DropFilesHere("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Remove_should_set_Remove()
		{
			builder.Remove("message");

			messages.Remove.ShouldEqual("message");
		}

		[Fact]
		public void Remove_should_return_builder()
		{
			builder.Remove("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Retry_should_set_Retry()
		{
			builder.Retry("message");

			messages.Retry.ShouldEqual("message");
		}

		[Fact]
		public void Retry_should_return_builder()
		{
			builder.Retry("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void Select_should_set_Select()
		{
			builder.Select("message");

			messages.Select.ShouldEqual("message");
		}

		[Fact]
		public void Select_should_return_builder()
		{
			builder.Select("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void StatusFailed_should_set_StatusFailed()
		{
			builder.StatusFailed("message");

			messages.StatusFailed.ShouldEqual("message");
		}

		[Fact]
		public void StatusFailed_should_return_builder()
		{
			builder.StatusFailed("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void StatusUploaded_should_set_StatusUploaded()
		{
			builder.StatusUploaded("message");

			messages.StatusUploaded.ShouldEqual("message");
		}

		[Fact]
		public void StatusUploaded_should_return_builder()
		{
			builder.StatusUploaded("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void StatusUploading_should_set_StatusUploading()
		{
			builder.StatusUploading("message");

			messages.StatusUploading.ShouldEqual("message");
		}

		[Fact]
		public void StatusUploading_should_return_builder()
		{
			builder.StatusUploading("message").ShouldBeSameAs(builder);
		}

		[Fact]
		public void UploadSelectedFiles_should_set_UploadSelectedFiles()
		{
			builder.UploadSelectedFiles("message");

			messages.UploadSelectedFiles.ShouldEqual("message");
		}

		[Fact]
		public void UploadSelectedFiles_should_return_builder()
		{
			builder.UploadSelectedFiles("message").ShouldBeSameAs(builder);
		}
	}
}
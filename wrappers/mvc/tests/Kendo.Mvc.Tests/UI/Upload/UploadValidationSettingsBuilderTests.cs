namespace Kendo.Mvc.UI.Tests.Upload
{
    using Moq;
    using System.Web.Routing;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class UploadValidationSettingsBuilderTests
    {
        private readonly Mock<IUploadValidationSettings> settingsMock;
        private readonly UploadValidationSettingsBuilder builder;

        public UploadValidationSettingsBuilderTests()
        {

            settingsMock = new Mock<IUploadValidationSettings>();

            builder = new UploadValidationSettingsBuilder(settingsMock.Object);
        }

        [Fact]
        public void MinFileSize_should_set_MinFileSize()
        {
            builder.MinFileSize(1);
            settingsMock.VerifySet(s => s.MinFileSize = 1);
        }

        [Fact]
        public void MinFileSize_should_return_builder()
        {
            builder.MinFileSize(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxFileSize_should_set_MaxFileSize()
        {
            builder.MaxFileSize(1);
            settingsMock.VerifySet(s => s.MaxFileSize = 1);
        }

        [Fact]
        public void MaxFileSize_should_return_builder()
        {
            builder.MaxFileSize(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AllowedExtensions_should_set_AllowedExtensions()
        {
            builder.AllowedExtensions(new string[]{"a", "b"});
            settingsMock.VerifySet(s => s.AllowedExtensions = new string[] { "a", "b" });
        }

        [Fact]
        public void AllowedExtensions_should_return_builder()
        {
            builder.AllowedExtensions(new string[] { "a", "b" }).ShouldBeSameAs(builder);
        }
    }
}

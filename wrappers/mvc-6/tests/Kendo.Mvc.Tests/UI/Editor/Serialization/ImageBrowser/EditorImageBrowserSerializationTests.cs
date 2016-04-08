using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;
using Kendo.Mvc.Tests;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorImageBrowserSerializationTests
    {
        private readonly EditorImageBrowserSettings settings;

        public EditorImageBrowserSerializationTests()
        {
            var messages = new Mock<EditorImageBrowserMessagesSettings>();
            settings = new EditorImageBrowserSettings();
        }

        [Fact]
        public void Default_Transport_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("transport").ShouldBeFalse();
        }

        [Fact]
        public void FileTypes_should_be_serialized()
        {
            GetJson()["fileTypes"].ShouldEqual("*.png,*.gif,*.jpg,*.jpeg");
        }

        [Fact]
        public void Transport_Create_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Create = new EditorImageBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["create"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Destroy_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Destroy = new EditorImageBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["destroy"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Image_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Image = new EditorImageBrowserOperation() { Url = value };

            GetJson("transport")["imageUrl"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Image_Url_should_be_serialized_with_replacement()
        {
            var value = "%20%20%20%7B0%20%20%7D%20%20";
            EnableSerialization();

            settings.Image = new EditorImageBrowserOperation() { Url = value };

            GetJson("transport")["imageUrl"].ShouldEqual("{0}");
        }

        [Fact]
        public void Transport_Read_Url_should_be_serialized()
        {
            var value = "value";

            settings.Read = new EditorImageBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["read"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_UploadUrl_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Upload = new EditorImageBrowserOperation() { Url = value };

            GetJson("transport")["uploadUrl"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Thumbnail_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Thumbnail = new EditorImageBrowserOperation() { Url = value };

            GetJson("transport")["thumbnailUrl"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Type_should_be_serialized()
        {
            var value = "value";

            settings.Read = new EditorImageBrowserOperation(){ Url = value };

            GetJson("transport")["type"].ShouldEqual("imagebrowser-aspnetmvc");
        }

        private void EnableSerialization()
        {
            settings.Read = new EditorImageBrowserOperation() { Url = "url" };
        }

        private Dictionary<string, object> GetJson()
        {
            return settings.Serialize();
        }

        private Dictionary<string, object> GetJson(string key)
        {
            return ((Dictionary<string, object>) GetJson()[key]);
        }
    }
}
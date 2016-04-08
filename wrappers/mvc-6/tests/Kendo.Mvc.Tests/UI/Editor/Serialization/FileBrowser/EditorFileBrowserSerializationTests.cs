using System;
using Xunit;
using Kendo.Mvc.Extensions.Tests;
using System.Collections.Generic;
using Kendo.Mvc.Tests;
using Moq;

namespace Kendo.Mvc.UI.Tests
{
    public class EditorFileBrowserSerializationTests
    {
        private readonly EditorFileBrowserSettings settings;

        public EditorFileBrowserSerializationTests()
        {
            var messages = new Mock<EditorFileBrowserMessagesSettings>();
            settings = new EditorFileBrowserSettings();
        }

        [Fact]
        public void Default_Transport_should_not_be_serialized()
        {
            settings.Serialize().ContainsKey("transport").ShouldBeFalse();
        }

        [Fact]
        public void FileTypes_should_be_serialized()
        {
            GetJson()["fileTypes"].ShouldEqual("*.*");
        }

        [Fact]
        public void Transport_Create_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Create = new EditorFileBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["create"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Destroy_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Destroy = new EditorFileBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["destroy"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_File_Url_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.File = new EditorFileBrowserOperation() { Url = value };

            GetJson("transport")["fileUrl"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_File_Url_should_be_serialized_with_replacement()
        {
            var value = "%20%20%20%7B0%20%20%7D%20%20";
            EnableSerialization();

            settings.File = new EditorFileBrowserOperation() { Url = value };

            GetJson("transport")["fileUrl"].ShouldEqual("{0}");
        }

        [Fact]
        public void Transport_Read_Url_should_be_serialized()
        {
            var value = "value";

            settings.Read = new EditorFileBrowserOperation() { Url = value };

            ((Dictionary<string, object>) GetJson("transport")["read"])["url"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_UploadUrl_should_be_serialized()
        {
            var value = "value";
            EnableSerialization();

            settings.Upload = new EditorFileBrowserOperation() { Url = value };

            GetJson("transport")["uploadUrl"].ShouldEqual(value);
        }

        [Fact]
        public void Transport_Type_should_be_serialized()
        {
            var value = "value";

            settings.Read = new EditorFileBrowserOperation()
            {
                Url = value
            };

            GetJson("transport")["type"].ShouldEqual("filebrowser-aspnetmvc");
        }

        private void EnableSerialization()
        {
            settings.Read = new EditorFileBrowserOperation() { Url = "url" };
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
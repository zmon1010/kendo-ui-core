using Kendo.Mvc.Extensions.Tests;
using Xunit;

namespace Kendo.Mvc.UI.Tests
{
    public class TreeMapSettingsTests
    {
        private readonly TreeMap treeMap;

        public TreeMapSettingsTests()
        {
            treeMap = TreeMapTestHelper.CreateTreeMap();
        }

        [Fact]
        public void Default_autoBind_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("autoBind").ShouldBeFalse();
            });
        }

        [Fact]
        public void AutoBind_is_serialized()
        {
            treeMap.AutoBind = true;

            treeMap.AssertSettings(settings =>
            {
                settings["autoBind"].ShouldEqual(treeMap.AutoBind);
            });
        }

        [Fact]
        public void Default_theme_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("Theme").ShouldBeFalse();
            });
        }

        [Fact]
        public void Theme_is_serialized()
        {
            treeMap.Theme = "theme";

            treeMap.AssertSettings(settings =>
            {
                settings["theme"].ShouldEqual(treeMap.Theme);
            });
        }

        [Fact]
        public void Default_valueField_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("valueField").ShouldBeFalse();
            });
        }

        [Fact]
        public void ValueField_is_serialized()
        {
            treeMap.ValueField = "value";

            treeMap.AssertSettings(settings =>
            {
                settings["valueField"].ShouldEqual(treeMap.ValueField);
            });
        }

        [Fact]
        public void Default_colorField_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("colorField").ShouldBeFalse();
            });
        }

        [Fact]
        public void ColorField_is_serialized()
        {
            treeMap.ColorField = "value";

            treeMap.AssertSettings(settings =>
            {
                settings["colorField"].ShouldEqual(treeMap.ColorField);
            });
        }

        [Fact]
        public void Default_textField_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("textField").ShouldBeFalse();
            });
        }

        [Fact]
        public void TextField_is_serialized()
        {
            treeMap.TextField = "value";

            treeMap.AssertSettings(settings =>
            {
                settings["textField"].ShouldEqual(treeMap.TextField);
            });
        }

        [Fact]
        public void Default_template_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("template").ShouldBeFalse();
            });
        }

        [Fact]
        public void Template_is_serialized()
        {
            treeMap.Template = "<#= value #>";

            treeMap.AssertSettings(settings =>
            {
                settings["template"].ShouldBeSameAs(treeMap.Template);
            });
        }

        [Fact]
        public void Default_type_is_not_serialized()
        {
            treeMap.AssertSettings(settings =>
            {
                settings.ContainsKey("type").ShouldBeFalse();
            });
        }
    }
}
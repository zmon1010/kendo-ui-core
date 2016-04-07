using Xunit;
using Kendo.Mvc.Tests;
using Kendo.Mvc.Rendering;

namespace Kendo.Mvc.UI.Tests
{
    public class KendoHtmlGeneratorTests
    {
        private readonly KendoHtmlGenerator generator;

        public KendoHtmlGeneratorTests()
        {
            generator = KendoHtmlGeneratorTestHelper.CreateKendoHtmlGenerator();
        }

        [Fact]
        public void SanitizeId_replaces_dots()
        {
            generator.SanitizeId("person.name").ShouldEqual("person_name");
        }

        [Fact]
        public void SanitizeId_escapes_invalid_characters()
        {
            generator.SanitizeId("Name1?").ShouldEqual("Name1_");
        }

        [Fact]
        public void SanitizeId_returns_empty_string_if_name_is_empty()
        {
            generator.SanitizeId("").ShouldEqual("");
        }

        [Fact]
        public void SanitizeId_allows_client_template_syntax()
        {
            generator.SanitizeId("Name?#= test #").ShouldEqual("Name_#= test #");
        }

        [Fact]
        public void SanitizeId_allows_ternary_in_client_template()
        {
            generator.SanitizeId("Name?#= test ? test : '2' #").ShouldEqual("Name_#= test ? test : '2' #");
        }

        [Fact]
        public void SanitizeId_replaces_brackets()
        {
            generator.SanitizeId("Name[0].Property").ShouldEqual("Name_0__Property");
        }

        [Fact]
        public void SanitizeId_replaces_sharps()
        {
            generator.SanitizeId("Name?#").ShouldEqual("Name__");
        }

        [Fact]
        public void SanitizeId_does_not_replace_client_template_if_it_is_in_the_begining()
        {
            generator.SanitizeId("#:#Name?").ShouldEqual("#:#Name_");
        }

        [Fact]
        public void SanitizeId_does_not_allow_points()
        {
            generator.SanitizeId("Name.Name1?#= test.test1 #").ShouldEqual("Name_Name1_#= test.test1 #");
        }
    }
}
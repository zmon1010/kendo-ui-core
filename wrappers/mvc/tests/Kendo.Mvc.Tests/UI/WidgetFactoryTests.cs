namespace Kendo.Mvc.UI.Tests
{
    using System.Globalization;
    using System.Web.Mvc;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class WidgetFactoryTests
    {
        private readonly WidgetFactory _factory;
        private readonly HtmlHelper htmlHelper;

        public WidgetFactoryTests()
        {
            ViewContext viewContext = new ViewContext
                                          {
                                              HttpContext = TestHelper.CreateMockedHttpContext().Object,
                                              ViewData = new ViewDataDictionary()
                                          };

            htmlHelper = TestHelper.CreateHtmlHelper();
            _factory = new WidgetFactory(htmlHelper);
        }

        [Fact]
        public void DatePicker_should_return_new_instance()
        {
            Assert.NotNull(_factory.DatePicker());
        }

        [Fact]
        public void TimePicker_should_return_new_instance()
        {
            Assert.NotNull(_factory.TimePicker());
        }

        [Fact]
        public void Calendar_should_return_new_instance()
        {
            Assert.NotNull(_factory.Calendar());
        }

        [Fact]
        public void NumericTextBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.NumericTextBox<double>());
        }

        [Fact]
        public void Window_should_return_new_instance()
        {
            Assert.NotNull(_factory.Window());
        }

        [Fact]
        public void DropDownList_should_return_new_instance()
        {
            Assert.NotNull(_factory.DropDownList());
        }

        [Fact]
        public void ComboBox_should_return_new_instance()
        {
            Assert.NotNull(_factory.ComboBox());
        }

        [Fact]
        public void Autocomplete_should_return_new_instance()
        {
            Assert.NotNull(_factory.AutoComplete());
        }

        [Fact]
        public void Slider_should_return_new_instance()
        {
            Assert.NotNull(_factory.Slider<float>());
        }

        [Fact]
        public void RangeSlider_should_return_new_instance()
        {
            Assert.NotNull(_factory.RangeSlider<float>());
        }


        [Fact]
        public void RenderDeferredScripts_without_render_script_tags_returns_deferred_scripts_without_script_tags()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            var renderScriptTags = false;
            var output = _factory.DeferredScripts(renderScriptTags).ToHtmlString();
            output.ShouldNotContain("<script>");
            output.ShouldContain(".kendoRangeSlider(");
        }

        [Fact]
        public void RenderDeferredScripts_returns_deferred_scripts()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            var output = _factory.DeferredScripts().ToHtmlString();
            output.ShouldContain("<script>");
            output.ShouldContain(".kendoRangeSlider(");
        }

        [Fact]
        public void RenderDeferredScripts_does_not_return_non_deferred_scripts()
        {
            _factory.RangeSlider<float>()
                .Name("foo").Render();

            _factory.DeferredScripts().ToHtmlString().ShouldNotContain("<script>");
        }

        [Fact]
        public void DeferredScriptsFor_renders_scripts_for_widget()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            var output = _factory.DeferredScriptsFor("foo").ToHtmlString();
            output.ShouldContain("<script>");
            output.ShouldContain(".kendoRangeSlider(");
        }

        [Fact]
        public void DeferredScriptsFor_renders_scripts_only_for_the_specified_widget()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            _factory.Slider().Name("bar").Deferred().Render();

            var output = _factory.DeferredScriptsFor("foo").ToHtmlString();
            output.ShouldNotContain("bar");
        }

        [Fact]
        public void DeferredScriptsFor_does_not_render_script_tags_if_told_so()
        {
            _factory.RangeSlider<float>()
                .Deferred().Name("foo").Render();

            var output = _factory.DeferredScriptsFor("foo", false).ToHtmlString();

            output.ShouldNotContain("<script>");
        }

        [Fact]
        public void Culture_returns_current_culture_script()
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var cultureScript = _factory.Culture().ToHtmlString();
            cultureScript.ShouldContain(Infrastructure.CultureGenerator.Generate(culture.Name));
            cultureScript.IndexOf("<script>").ShouldEqual(0);           
        }

        [Fact]
        public void Culture_returns_current_culture_script_without_script_tag()
        {
            var culture = System.Threading.Thread.CurrentThread.CurrentCulture;
            var cultureScript = _factory.Culture(false).ToHtmlString();
            cultureScript.ShouldNotContain("script");
        }

        [Fact]
        public void Culture_returns_specified_culture_script()
        {
            var name = "bg-BG";
            var culture = new CultureInfo(name);
            var cultureScript = _factory.Culture(name).ToHtmlString();
            cultureScript.ShouldContain(Infrastructure.CultureGenerator.Generate(name));
            cultureScript.IndexOf("<script>").ShouldEqual(0);            
        }

        [Fact]
        public void Culture_returns_specified_culture_script_without_script_tag()
        {
            var name = "bg-BG";
            var culture = new CultureInfo(name);
            var cultureScript = _factory.Culture(name, false).ToHtmlString();
            cultureScript.ShouldContain(string.Format("kendo.cultures[\"{0}\"]=", name));
            cultureScript.ShouldNotContain("script");
        }
    }
}
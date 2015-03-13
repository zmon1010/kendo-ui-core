namespace Kendo.Mvc.UI.Tests.Grid
{
	using System;
	using Fluent;
	using Kendo.Mvc.Tests;
	using Xunit;

	public class GridBoundColumnBuilderTests
    {
        private readonly GridBoundColumn<Customer, int> column;
        private readonly GridBoundColumnBuilder<Customer> builder;
        
        public GridBoundColumnBuilderTests()
        {
            column = new GridBoundColumn<Customer, int>(new Grid<Customer>(TestHelper.CreateViewContext()), c=>c.Id);
            builder = new GridBoundColumnBuilder<Customer>(column, null, null);
        }

        [Fact]
        public void Header_text_sets_the_header_text_of_the_column()
        {
            builder.Title("Header");

            Assert.Equal("Header", column.Title);
        }


        [Fact]
        public void HeaderHtmlAttributes_sets_the_header_attributes_of_the_column()
        {
            builder.HeaderHtmlAttributes(new { @class = "test" });

            Assert.Equal("test", column.HeaderHtmlAttributes["class"]);
        }
       
        [Fact]
        public void FooterHtmlAttributes_sets_the_header_attributes_of_the_column()
        {
            builder.FooterHtmlAttributes(new { @class = "test" });

            Assert.Equal("test", column.FooterHtmlAttributes["class"]);
        }        
     

        [Fact]
        public void Format_sets_the_format_string_of_the_column()
        {
            builder.Format("{0}");
            Assert.Equal("{0}", column.Format);
        }

        [Fact]
        public void Sortable_sets_the_sortable_of_the_column()
        {
            builder.Sortable(false);

            Assert.False(column.Sortable);
        }

        [Fact]
        public void Encoded_sets_the_encoded_property()
        {
            builder.Encoded(false);
            Assert.False(column.Encoded);
        }        
 
        [Fact]
        public void Locked_sets_the_encoded_property()
        {
            builder.Locked();
            column.Locked.ShouldBeTrue();
        }

        [Fact]
        public void Lockable_sets_the_property()
        {
            builder.Lockable(false);
            column.Lockable.ShouldBeFalse();
        }  

        [Fact]
        public void HtmlAttributes_sets_the_html_attributes_of_the_column()
        {
            builder.HtmlAttributes(new { @class = "test" });

            Assert.Equal("test", column.HtmlAttributes["class"]);
        }    

        [Fact]
        public void Filterable_sets_the_filterable_property()
        {
            builder.Filterable(false);
            Assert.False(column.Filterable);
        }     

        [Fact]
        public void Should_be_able_to_set_title_to_empty_string()
        {
            builder.Title("");
            Assert.Equal("", builder.Column.Title);
        }	

		[Fact]
		public void Should_set_header_template()
		{
			var template = "my template";
            builder.ClientHeaderTemplate(template);

			column.ClientHeaderTemplate.ShouldEqual(template);
		}

		[Fact]
        public void Should_set_editor_template_name()
        {
            const string expectedValue = "SomeEditorName";
            builder.EditorTemplateName(expectedValue);

            column.EditorTemplateName.ShouldEqual(expectedValue);
        }
    }
}

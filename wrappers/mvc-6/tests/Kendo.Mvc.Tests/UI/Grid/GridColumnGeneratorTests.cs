namespace Kendo.Mvc.UI.Tests
{
	using System.ComponentModel.DataAnnotations;
	using System.Linq;
	using Kendo.Mvc.Extensions;
	using Kendo.Mvc.Tests;
	using Xunit;

	public class GridColumnGeneratorTests
    {
        private GridColumnGenerator<Customer> generator;

        public GridColumnGeneratorTests()
        {
            generator = new GridColumnGenerator<Customer>(new Grid<Customer>(TestHelper.CreateViewContext()));
        }

        [Fact]
        public void Should_create_bound_column_from_column_settings()
        {
            var columnSettings = new GridColumnSettings<Customer>
            {
                Member = "Name"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(columnSettings);
            Assert.Equal("Name", column.Member);
        }
        
        [Fact]
        public void Should_set_bound_column_properties()
        {
            var settings = new GridColumnSettings<Customer>
            {
                Member = "Name",
                Sortable = false,
                ClientTemplate = "foo",
                Encoded = false,
                Filterable = false,
                Format = "{0}",
                Groupable = false,
                HeaderHtmlAttributes = { },                
                Hidden = true,                
                HtmlAttributes = { },
                ReadOnly = true,
                Title = "foo",
                Visible = false,
                Width = "100"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(settings);
            Assert.Equal(column.Sortable, settings.Sortable);
            Assert.Equal(column.ClientTemplate, settings.ClientTemplate);
            Assert.Equal(column.Encoded, settings.Encoded);
            Assert.Equal(column.Filterable, settings.Filterable);
            Assert.Equal(column.Format, settings.Format);
            Assert.Equal(column.Groupable, settings.Groupable);            
            Assert.Equal(column.HeaderHtmlAttributes, settings.HeaderHtmlAttributes);            
            Assert.Equal(column.Hidden, settings.Hidden);
            
            Assert.Equal(column.HtmlAttributes, settings.HtmlAttributes);
           // Assert.Equal(column.ReadOnly, settings.ReadOnly);
            Assert.Equal(column.Title, settings.Title);
            
            Assert.Equal(column.Visible, settings.Visible);
            Assert.Equal(column.Width, settings.Width);
        }       

        [Fact]
        public void Member_should_set_title()
        {
            var settings = new GridColumnSettings<Customer>
            {
                Member = "Name"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(settings);
            Assert.Equal(column.Title, "Name");
        }        
       
        [Fact]
        public void Should_generate_columns_for_properties_of_nullable_bindable_type()
        {
            var grid = new Grid<NullableFoo>(TestHelper.CreateViewContext());
            grid.DataSource.Data = Enumerable.Empty<NullableFoo>();
            var columnGenerator = new GridColumnGenerator<NullableFoo>(grid);
            var generatedColumns = columnGenerator.GetColumns();

            generatedColumns.Count().ShouldEqual(1);
            generatedColumns.First().Member.ShouldEqual("Bar");
        }

        [Fact(Skip = "https://github.com/aspnet/Mvc/commit/8779cafbab39e9a57666a81e4eb25ebd70de7ae4")]		
        public void Should_generate_columns_in_the_specified_order()
        {
            var grid = new Grid<ColumnOrder>(TestHelper.CreateViewContext());
            grid.DataSource.Data = Enumerable.Empty<ColumnOrder>();

            var columnGenerator = new GridColumnGenerator<ColumnOrder>(grid);
            var columns = columnGenerator.GetColumns();

            columns.First().Member.ShouldEqual("Bar");
            columns.Last().Member.ShouldEqual("Foo");
        }

        private class ColumnOrder
        {
            [Display(Order=1)]
            public string Foo { get; set; }
            [Display(Order=0)]
            public string Bar { get; set; }
        }
        private class NullableFoo
        {
            public int? Bar { get; set; }
            public NonBindableValueType? NonBindableValueType { get; set; }
        }

        private struct NonBindableValueType
        {
        }
    }
}

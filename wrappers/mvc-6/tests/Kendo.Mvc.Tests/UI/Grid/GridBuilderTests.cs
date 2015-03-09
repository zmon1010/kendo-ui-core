namespace Kendo.Mvc.UI.Fluent.Tests
{
	using UI;
	using Xunit;
	using Kendo.Mvc.Tests;
	using System.Collections.Generic;

	public class GridBuilderTests
    {
        private readonly Grid<Customer> grid;
        private readonly GridBuilder<Customer> builder;

        public GridBuilderTests()
        {
            grid = new Grid<Customer>(TestHelper.CreateViewContext()); 
                       
            builder = new GridBuilder<Customer>(grid);
        }

        [Fact]
        public void Pager_enables_paging()
        {
            builder.Pageable();

            Assert.True(grid.Pageable.Enabled);
        }
      
        [Fact (Skip = "Not implemented")]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<Customer> customers = new [] { new Customer()};
        //    builder.BindTo(customers);

            Assert.Same(customers, grid.DataSource.Data);
        }

		[Fact(Skip = "Not implemented")]
		public void BindTo_sets_the_data_source_as_GridCustomGroupingWrapper_of_model_type_if_non_generic_enumerable_is_assigned()
        {
        //    builder.BindTo(new object[0]);

        //    Assert.IsType<CustomGroupingWrapper<Customer>>(grid.DataSource.Data);
        }

        [Fact]
        public void Columns_builds_the_columns_of_the_grid()
        {
            builder.Columns(columns => columns.Bound(c => c.Id));

            Assert.Equal(1, grid.Columns.Count);
        }

		[Fact(Skip = "Not implemented")]
		public void ProcessDataSource_sets_the_corresponding_property()
        {
        //    builder.EnableCustomBinding(false);

            Assert.Equal(false, grid.EnableCustomBinding);
        }
       
        [Fact]
        public void Sortable_sets_the_corresponding_property()
        {
            builder.Sortable();
            Assert.Equal(GridSortMode.SingleColumn, grid.Sortable.SortMode);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort()
        {
            builder.Sortable();
            Assert.Equal(true, grid.Sortable.AllowUnsort);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort_to_false()
        {
            builder.Sortable(sortable => sortable.AllowUnsort(false));
            Assert.Equal(false, grid.Sortable.AllowUnsort);
        }

        [Fact]
        public void ColumnResizeHandleWidth_sets_the_column_resize_handle_width()
        {
            var newWidth = 5;

            builder.ColumnResizeHandleWidth(newWidth);
            Assert.Equal(newWidth, grid.ColumnResizeHandleWidth);
        }

		[Fact]
		public void ClientRowTemplate_set_the_clientRowTemplate_value()
		{
			var template = "foo";

			builder.ClientRowTemplate(template);

			grid.ClientRowTemplate.ShouldEqual(template);
		}


		[Fact]
		public void ClientRowTemplates_are_set()
		{
			var template = "foo";
			var altTemplate = "bar";

			builder.ClientRowTemplate(template);
			builder.ClientAltRowTemplate(altTemplate);

			grid.ClientRowTemplate.ShouldEqual(template);
			grid.ClientAltRowTemplate.ShouldEqual(altTemplate);
		}

		[Fact]
		public void ClientAltRowTemplate_set_the_clientAltRowTemplate_value()
		{
			var template = "foo";

			builder.ClientAltRowTemplate(template);

			grid.ClientAltRowTemplate.ShouldEqual(template);
		}
		/*
				[Fact]
				public void PrefixUrlParameters_sets_the_corresponding_property()
				{
					builder.PrefixUrlParameters(false);
					Assert.Equal(false, grid.PrefixUrlParameters);
				}
				*/
	}
}
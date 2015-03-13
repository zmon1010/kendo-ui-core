namespace Kendo.Mvc.UI.Tests.Grid
{
	using System;
	using System.Collections.Generic;
	using System.ComponentModel;
	using System.ComponentModel.DataAnnotations;
	using System.Linq;
	using Kendo.Mvc.Tests;
	using Kendo.Mvc.UI;
	using Xunit;

	public class GridBoundColumnTests
    {
        public class Product
        {
            public string Name
            {
                get;
                set;
            }

            public Category Category
            {
                get;
                set;
            }

            public IList<Category> Categories
            {
                get;
                set;
            }

            public Category[] CategoriesArray
            {
                get;
                set;
            }
        }

        public class Category
        {
            public string Name
            {
                get;
                set;
            }

            public User Owner
            {
                get;
                set;
            }
        }

        public class User
        {
            [DisplayName("UserName")]
            [DisplayFormat(DataFormatString="{0}")]
            [ReadOnly(true)]
            public string Name
            {
                get;
                set;
            }

            public bool Active
            {
                get;
                set;
            }
        }
		private Grid<T> CreateGrid<T>() where T : class
		{
			return new Grid<T>(TestHelper.CreateViewContext());
		}

        [Fact]
        public void HeaderText_should_be_extracted_from_expression()
        {
            var column = new GridBoundColumn<Customer, int>(CreateGrid<Customer>(), c => c.Id);

            Assert.Equal("Id", column.Title);
        }

        [Fact]
        public void Name_should_be_extracted_from_expression()
        {
            var column = new GridBoundColumn<Customer, int>(CreateGrid<Customer>(), c => c.Id);
            Assert.Equal("Id", column.Member);
        }

        [Fact]
        public void Name_should_be_equal_to_member_when_complex_member_expression_is_supplied()
        {
            var column = new GridBoundColumn<Customer, int>(CreateGrid<Customer>(), c => c.RegisterAt.Day);

            Assert.Equal("RegisterAt.Day", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_nested_expression()
        {
            var column = new GridBoundColumn<Product, string>(CreateGrid<Product>(), p => p.Category.Owner.Name);

            Assert.Equal("Category.Owner.Name", column.Member);
        }
        [Fact]
        public void Name_should_be_extracted_correctly_from_indexer_expression()
        {
            var column = new GridBoundColumn<Product, string>(CreateGrid<Product>(), p => p.Categories[0].Owner.Name);

            Assert.Equal("Categories[0].Owner.Name", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_indexer_expression_with_bound_argument()
        {
            var argument = 0;

            var column = new GridBoundColumn<Product, string>(CreateGrid<Product>(), p => p.Categories[argument].Owner.Name);

            Assert.Equal("Categories[0].Owner.Name", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_array_access()
        {
            var column = new GridBoundColumn<Product, string>(CreateGrid<Product>(), p => p.CategoriesArray[0].Owner.Name);

            Assert.Equal("CategoriesArray[0].Owner.Name", column.Member);
        }

        [Fact]
        public void Type_should_be_set()
        {
            var column = new GridBoundColumn<Customer, int>(CreateGrid<Customer>(), c => c.Id);
            Assert.Equal(typeof(int), column.MemberType);
        }

        [Fact]
        public void Throws_on_invalid_expression()
        {
            Assert.Throws<InvalidOperationException>(() => new GridBoundColumn<Customer, string>(CreateGrid<Customer>(), c => c.Id.ToString()));
        }

        [Fact]
        public void ClientTemplate_sanitized()
        {
            var column = new GridBoundColumn<User, string>(CreateGrid<User>(), u => u.Name);

            column.ClientTemplate = "&lt;#= Name #>";
            Assert.Equal("<#= Name #>", column.ClientTemplate);
        }

        [Fact]
        public void Aggregates_property_is_correctly_serialized()
        {
            var grid = CreateGrid<User>();
            AggregateDescriptor aggregate = new AggregateDescriptor();
            aggregate.Member = "Name";
            aggregate.Aggregates.Add(new SumFunction { SourceField = "Name" });

            grid.DataSource.Aggregates.Add(aggregate);
            var column = new GridBoundColumn<User, string>(grid, u => u.Name);
            var json = column.ToJson();

            Assert.True(json.ContainsKey("aggregates"));
        }

        [Fact]
        public void Should_throw_if_method_call()
        {
            Assert.Throws<InvalidOperationException>(() => new GridBoundColumn<User, string>(CreateGrid<User>(), u => u.Active.ToString()));
        }
        
        [Fact]
        public void Should_support_parameter_expression()
        {
            new GridBoundColumn<User, User>(CreateGrid<User>(), u => u);
        }          
    }
}
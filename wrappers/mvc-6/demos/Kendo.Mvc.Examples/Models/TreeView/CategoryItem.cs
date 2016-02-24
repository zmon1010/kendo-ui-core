using System.Collections.Generic;

namespace Kendo.Mvc.Examples.Models
{
    public class CategoryItem
    {
        public string CategoryName { get; set; }
        public List<SubCategoryItem> SubCategories { get; set; }
    }
}
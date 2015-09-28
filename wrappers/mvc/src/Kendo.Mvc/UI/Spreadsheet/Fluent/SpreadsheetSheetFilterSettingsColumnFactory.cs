namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Filter for ASP.NET MVC
    /// </summary>
    public class SpreadsheetSheetFilterSettingsColumnFactory : IHideObjectMembers
    {
        private readonly List<SpreadsheetSheetFilterSettingsColumn> container;

        public SpreadsheetSheetFilterSettingsColumnFactory(List<SpreadsheetSheetFilterSettingsColumn> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual SpreadsheetSheetFilterSettingsColumnBuilder Add()
        {
            var item = new SpreadsheetSheetFilterSettingsColumn();

            container.Add(item);

            return new SpreadsheetSheetFilterSettingsColumnBuilder(item);
        }
        //<< Factory methods
    }
}


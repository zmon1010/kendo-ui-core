namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Column for ASP.NET MVC
    /// </summary>
    public class SpreadsheetSheetFilterSettingsColumnCriteriaFactory : IHideObjectMembers
    {
        private readonly List<SpreadsheetSheetFilterSettingsColumnCriteria> container;

        public SpreadsheetSheetFilterSettingsColumnCriteriaFactory(List<SpreadsheetSheetFilterSettingsColumnCriteria> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual SpreadsheetSheetFilterSettingsColumnCriteriaBuilder Add()
        {
            var item = new SpreadsheetSheetFilterSettingsColumnCriteria();

            container.Add(item);

            return new SpreadsheetSheetFilterSettingsColumnCriteriaBuilder(item);
        }
        //<< Factory methods
    }
}


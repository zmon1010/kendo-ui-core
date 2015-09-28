namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Spreadsheet for ASP.NET MVC
    /// </summary>
    public class SpreadsheetSheetFactory : IHideObjectMembers
    {
        private readonly List<SpreadsheetSheet> container;

        public SpreadsheetSheetFactory(List<SpreadsheetSheet> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual SpreadsheetSheetBuilder Add()
        {
            var item = new SpreadsheetSheet();

            container.Add(item);

            return new SpreadsheetSheetBuilder(item);
        }
        //<< Factory methods
    }
}


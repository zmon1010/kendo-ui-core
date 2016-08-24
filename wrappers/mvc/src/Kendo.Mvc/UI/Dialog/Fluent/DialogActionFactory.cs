namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Dialog for ASP.NET MVC
    /// </summary>
    public class DialogActionFactory : IHideObjectMembers
    {
        private readonly List<DialogAction> container;

        public DialogActionFactory(List<DialogAction> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item to the collection
        /// </summary>
        public virtual DialogActionBuilder Add()
        {
            var item = new DialogAction();

            container.Add(item);

            return new DialogActionBuilder(item);
        }
        //<< Factory methods
    }
}


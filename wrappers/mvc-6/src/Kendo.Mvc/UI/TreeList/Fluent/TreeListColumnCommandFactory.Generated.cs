using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Column
    /// </summary>
    public partial class TreeListColumnCommandFactory<T>
        
    {
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Custom()
        {
            var item = new TreeListColumnCommand<T>();
            Container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Edit()
        {
            var item = new TreeListColumnCommand<T>() { Name = "edit" };
            Container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the createChild action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> CreateChild()
        {
            var item = new TreeListColumnCommand<T>() { Name = "createChild" };
            Container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the destroy action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Destroy()
        {
            var item = new TreeListColumnCommand<T>() { Name = "destroy" };
            Container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }
    }
}

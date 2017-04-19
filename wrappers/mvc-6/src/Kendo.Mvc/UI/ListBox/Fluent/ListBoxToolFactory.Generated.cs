using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Editor.
    /// </summary>
    public partial class ListBoxToolFactory
    {

        /// <summary>
        /// Adds "MoveUp" tool.
        /// </summary>
        public virtual ListBoxToolFactory MoveUp()
        {
            Container.Add("moveUp");
            return this;
        }

        /// <summary>
        /// Adds "MoveDown" tool.
        /// </summary>
        public virtual ListBoxToolFactory MoveDown()
        {
            Container.Add("moveDown");
            return this;
        }

        /// <summary>
        /// Adds "Remove" tool.
        /// </summary>
        public virtual ListBoxToolFactory Remove()
        {
            Container.Add("remove");
            return this;
        }

        /// <summary>
        /// Adds "TransferAllFrom" tool.
        /// </summary>
        public virtual ListBoxToolFactory TransferAllFrom()
        {
            Container.Add("transferAllFrom");
            return this;
        }

        /// <summary>
        /// Adds "TransferAllTo" tool.
        /// </summary>
        public virtual ListBoxToolFactory TransferAllTo()
        {
            Container.Add("transferAllTo");
            return this;
        }

        /// <summary>
        /// Adds "TransferFrom" tool.
        /// </summary>
        public virtual ListBoxToolFactory TransferFrom()
        {
            Container.Add("transferFrom");
            return this;
        }

        /// <summary>
        /// Adds "TransferTo" tool.
        /// </summary>
        public virtual ListBoxToolFactory TransferTo()
        {
            Container.Add("transferTo");
            return this;
        }
    }
}

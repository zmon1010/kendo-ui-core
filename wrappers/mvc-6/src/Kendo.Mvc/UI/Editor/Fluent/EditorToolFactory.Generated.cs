using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq.Expressions;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Resources;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Editor.
    /// </summary>
    public partial class EditorToolFactory
    {
        public Editor Editor { get; set; }


        /// <summary>
        /// Adds bold tool.
        /// </summary>
        public virtual EditorToolFactory Bold()
        {
            AddButtonTool("bold");
            return this;
        }

        /// <summary>
        /// Removes all tools.
        /// </summary>
        public virtual EditorToolFactory Clear()
        {
            Container.Clear();
            return this;
        }

        /// <summary>
        /// Removes all tools.
        /// </summary>
        private void AddButtonTool(string name)
        {
            var item = new EditorTool() { Name = name };
            item.Editor = Editor;
            Container.Add(item);
        }
    }
}

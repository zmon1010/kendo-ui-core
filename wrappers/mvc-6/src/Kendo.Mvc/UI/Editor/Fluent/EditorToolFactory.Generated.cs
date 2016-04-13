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
        /// Adds "bold" tool.
        /// </summary>
        public virtual EditorToolFactory Bold()
        {
            AddButtonTool("bold");
            return this;
        }


        /// <summary>
        /// Adds "fontName" tool.
        /// </summary>
        public virtual EditorToolFactory FontName()
        {
            AddDropDownTool("fontName", null);
            return this;
        }

        /// <summary>
        /// Adds "fontName" tool.
        /// </summary>
        public virtual EditorToolFactory FontName(Action<EditorToolItemFactory> configurator)
        {
            AddDropDownTool("fontName", CreateDropDownToolItems(configurator));
            return this;
        }

        public EditorToolFactory TableEditing()
        {
            AddButtonTool("addColumnLeft");
            AddButtonTool("addColumnRight");
            AddButtonTool("addRowAbove");
            AddButtonTool("addRowBelow");
            AddButtonTool("createTable");
            AddButtonTool("deleteColumn");
            AddButtonTool("deleteRow");
            return this;
        }

        /// <summary>
        /// Adds a tool to the editor.
        /// </summary>
        private void AddButtonTool(string name)
        {
            var item = new EditorTool()
            {
                Editor = Editor,
                Name = name
            };
            Container.Add(item);
        }

        /// <summary>
        /// Adds a tool to the editor.
        /// </summary>
        private void AddDropDownTool(string name, List<EditorToolItem> items)
        {
            var item = new EditorTool()
            {
                Editor = Editor,
                Name = name,
                Items = items
            };
            Container.Add(item);
        }

        private List<EditorToolItem> CreateDropDownToolItems(Action<EditorToolItemFactory> configurator)
        {
            var items = new List<EditorToolItem>();
            configurator(new EditorToolItemFactory(items)
            {
                Editor = Editor
            });
            return items;
        }

        /// <summary>
        /// Removes all tools.
        /// </summary>
        public virtual EditorToolFactory Clear()
        {
            Container.Clear();
            return this;
        }
    }
}

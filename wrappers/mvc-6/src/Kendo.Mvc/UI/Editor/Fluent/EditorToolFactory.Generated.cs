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
            AddTool("bold");
            return this;
        }

        /// <summary>
        /// Adds "backColor" tool.
        /// </summary>
        public virtual EditorToolFactory BackColor()
        {
            AddTool("backColor");
            return this;
        }

        public EditorToolFactory BackColor(Action<EditorToolBuilder> configurator)
        {
            AddTool("backColor", configurator);
            return this;
        }

        /// <summary>
        /// Adds "foreColor" tool.
        /// </summary>
        public virtual EditorToolFactory ForeColor()
        {
            AddTool("foreColor");
            return this;
        }

        public EditorToolFactory ForeColor(Action<EditorToolBuilder> configurator)
        {
            AddTool("foreColor", configurator);
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
            AddTool("addColumnLeft");
            AddTool("addColumnRight");
            AddTool("addRowAbove");
            AddTool("addRowBelow");
            AddTool("createTable");
            AddTool("deleteColumn");
            AddTool("deleteRow");
            return this;
        }

        /// <summary>
        /// Adds a tool to the editor.
        /// </summary>
        private void AddTool(string name)
        {
            var item = new EditorTool()
            {
                Editor = Editor,
                Name = name
            };
            Container.Add(item);
        }

        private void AddTool(string name, Action<EditorToolBuilder> configurator)
        {
            var item = new EditorTool()
            {
                Editor = Editor,
                Name = name
            };

            configurator(new EditorToolBuilder(item));

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
        /// Remove all tools.
        /// </summary>
        public virtual EditorToolFactory Clear()
        {
            Container.Clear();
            return this;
        }
    }
}

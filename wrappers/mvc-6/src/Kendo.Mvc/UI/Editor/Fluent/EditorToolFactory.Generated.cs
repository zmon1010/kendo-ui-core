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
        /// Adds "cleanFormatting" tool.
        /// </summary>
        public virtual EditorToolFactory CleanFormatting()
        {
            AddTool("cleanFormatting");
            return this;
        }

        /// <summary>
        /// Adds "createLink" tool.
        /// </summary>
        public virtual EditorToolFactory CreateLink()
        {
            AddTool("createLink");
            return this;
        }

        /// <summary>
        /// Adds "indent" tool.
        /// </summary>
        public virtual EditorToolFactory Indent()
        {
            AddTool("indent");
            return this;
        }

        /// <summary>
        /// Adds "insertFile" tool.
        /// </summary>
        public virtual EditorToolFactory InsertFile()
        {
            AddTool("insertFile");
            return this;
        }

        /// <summary>
        /// Adds "insertImage" tool.
        /// </summary>
        public virtual EditorToolFactory InsertImage()
        {
            AddTool("insertImage");
            return this;
        }

        /// <summary>
        /// Adds "insertOrderedList" tool.
        /// </summary>
        public virtual EditorToolFactory InsertOrderedList()
        {
            AddTool("insertOrderedList");
            return this;
        }

        /// <summary>
        /// Adds "insertUnorderedList" tool.
        /// </summary>
        public virtual EditorToolFactory InsertUnorderedList()
        {
            AddTool("insertUnorderedList");
            return this;
        }

        /// <summary>
        /// Adds "italic" tool.
        /// </summary>
        public virtual EditorToolFactory Italic()
        {
            AddTool("italic");
            return this;
        }

        /// <summary>
        /// Adds "justifyCenter" tool.
        /// </summary>
        public virtual EditorToolFactory JustifyCenter()
        {
            AddTool("justifyCenter");
            return this;
        }

        /// <summary>
        /// Adds "justifyFull" tool.
        /// </summary>
        public virtual EditorToolFactory JustifyFull()
        {
            AddTool("justifyFull");
            return this;
        }

        /// <summary>
        /// Adds "justifyLeft" tool.
        /// </summary>
        public virtual EditorToolFactory JustifyLeft()
        {
            AddTool("justifyLeft");
            return this;
        }

        /// <summary>
        /// Adds "justifyRight" tool.
        /// </summary>
        public virtual EditorToolFactory JustifyRight()
        {
            AddTool("justifyRight");
            return this;
        }

        /// <summary>
        /// Adds "outdent" tool.
        /// </summary>
        public virtual EditorToolFactory Outdent()
        {
            AddTool("outdent");
            return this;
        }

        /// <summary>
        /// Adds "pdf" tool.
        /// </summary>
        public virtual EditorToolFactory Pdf()
        {
            AddTool("pdf");
            return this;
        }

        /// <summary>
        /// Adds "print" tool.
        /// </summary>
        public virtual EditorToolFactory Print()
        {
            AddTool("print");
            return this;
        }

        /// <summary>
        /// Adds "separator" tool.
        /// </summary>
        public virtual EditorToolFactory Separator()
        {
            AddTool("separator");
            return this;
        }

        /// <summary>
        /// Adds "strikethrough" tool.
        /// </summary>
        public virtual EditorToolFactory Strikethrough()
        {
            AddTool("strikethrough");
            return this;
        }

        /// <summary>
        /// Adds "subscript" tool.
        /// </summary>
        public virtual EditorToolFactory Subscript()
        {
            AddTool("subscript");
            return this;
        }

        /// <summary>
        /// Adds "superscript" tool.
        /// </summary>
        public virtual EditorToolFactory Superscript()
        {
            AddTool("superscript");
            return this;
        }

        /// <summary>
        /// Adds "underline" tool.
        /// </summary>
        public virtual EditorToolFactory Underline()
        {
            AddTool("underline");
            return this;
        }

        /// <summary>
        /// Adds "unlink" tool.
        /// </summary>
        public virtual EditorToolFactory Unlink()
        {
            AddTool("unlink");
            return this;
        }

        /// <summary>
        /// Adds "viewHtml" tool.
        /// </summary>
        public virtual EditorToolFactory ViewHtml()
        {
            AddTool("viewHtml");
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

        /// <summary>
        /// Adds "fontSize" tool.
        /// </summary>
        public virtual EditorToolFactory FontSize()
        {
            AddDropDownTool("fontSize", null);
            return this;
        }

        /// <summary>
        /// Adds "fontSize" tool.
        /// </summary>
        public virtual EditorToolFactory FontSize(Action<EditorToolItemFactory> configurator)
        {
            AddDropDownTool("fontSize", CreateDropDownToolItems(configurator));
            return this;
        }

        /// <summary>
        /// Adds "formatting" tool.
        /// </summary>
        public virtual EditorToolFactory Formatting()
        {
            AddDropDownTool("formatting", null);
            return this;
        }

        /// <summary>
        /// Adds "formatting" tool.
        /// </summary>
        public virtual EditorToolFactory Formatting(Action<EditorToolItemFactory> configurator)
        {
            AddDropDownTool("formatting", CreateDropDownToolItems(configurator));
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

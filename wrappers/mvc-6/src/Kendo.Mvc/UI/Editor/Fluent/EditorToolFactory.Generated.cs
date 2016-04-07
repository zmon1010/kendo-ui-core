using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for adding items to Kendo UI Editor
    /// </summary>
    public partial class EditorToolFactory
        
    {

        public Editor Editor { get; set; }

        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual EditorToolBuilder Custom()
        {
            var item = new EditorTool();
            item.Editor = Editor;
            Container.Add(item);

            return new EditorToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the undo action.
        /// </summary>
        public virtual EditorToolBuilder Undo()
        {
            var item = new EditorTool() { Name = "undo" };
            item.Editor = Editor;
            Container.Add(item);

            return new EditorToolBuilder(item);
        }

        /// <summary>
        /// Adds an item for the redo action.
        /// </summary>
        public virtual EditorToolBuilder Redo()
        {
            var item = new EditorTool() { Name = "redo" };
            item.Editor = Editor;
            Container.Add(item);

            return new EditorToolBuilder(item);
        }
    }
}

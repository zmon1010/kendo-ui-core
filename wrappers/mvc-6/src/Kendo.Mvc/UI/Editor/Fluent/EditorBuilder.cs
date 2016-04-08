using System;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring the Kendo UI Editor
    /// </summary>
    public partial class EditorBuilder: WidgetBuilderBase<Editor, EditorBuilder>
        
    {
        public EditorBuilder(Editor component) : base(component)
        {
        }

        // Place custom settings here

        /// <summary>
        /// Sets the CSS files that will be registered in the Editor's iframe
        /// </summary>
        /// <code lang="CS">
        /// @(Html.Kendo().Editor()
        ///             .Name("Editor")
        ///             .StyleSheets(styleSheets => styleSheets.Add("editorStyles.css"))
        /// );
        /// </code>        
        public EditorBuilder StyleSheets(Action<EditorStyleSheetBuilder> configurator)
        {
            configurator(new EditorStyleSheetBuilder(Component.StyleSheets));
            
            return this;
        }
    }
}


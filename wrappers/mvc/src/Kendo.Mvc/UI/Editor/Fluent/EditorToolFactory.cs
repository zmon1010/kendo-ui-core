namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Creates series for the <see cref="Editor" />.
    /// </summary>
    public class EditorToolFactory : IHideObjectMembers
    {
        private readonly EditorToolGroup group;

        /// <summary>
        /// Initializes a new instance of the <see cref="EditorToolFactory"/> class.
        /// </summary>
        /// <param name="group">The group.</param>
        public EditorToolFactory(EditorToolGroup group)
        {
            this.group = group;
        }

        /// <summary>
        /// Adds a custom template tool.
        /// </summary>
        public EditorToolFactory CustomTemplate(Action<EditorCustomTemplateToolBuilder> configurator)
        {
            var tool = new EditorCustomTemplateTool();
            configurator(new EditorCustomTemplateToolBuilder(tool));
            group.Tools.Add(tool);

            return this;
        }

        /// <summary>
        /// Adds a custom button tool.
        /// </summary>
        public EditorToolFactory CustomButton(Action<EditorCustomButtonToolBuilder> configurator)
        {
            var tool = new EditorCustomButtonTool();
            configurator(new EditorCustomButtonToolBuilder(tool));
            group.Tools.Add(tool);

            return this;
        }

        /// <summary>
        /// Clears all tools.
        /// </summary>
        public EditorToolFactory Clear()
        {
            group.Tools.Clear();

            return this;
        }

        /// <summary>
        /// Adds Bold tool.
        /// </summary>
        public EditorToolFactory Bold()
        {
            return Button("bold");
        }

        /// <summary>
        /// Adds Italic tool.
        /// </summary>
        public EditorToolFactory Italic()
        {
            return Button("italic");
        }

        /// <summary>
        /// Adds Underline tool.
        /// </summary>
        public EditorToolFactory Underline()
        {
            return Button("underline");
        }

        /// <summary>
        /// Adds Strikethrough tool.
        /// </summary>
        public EditorToolFactory Strikethrough()
        {
            return Button("strikethrough");
        }

        /// <summary>
        /// Adds JustifyLeft tool.
        /// </summary>
        public EditorToolFactory JustifyLeft()
        {
            return Button("justifyLeft");
        }

        /// <summary>
        /// Adds JustifyRight tool.
        /// </summary>
        public EditorToolFactory JustifyRight()
        {
            return Button("justifyRight");
        }

        /// <summary>
        /// Adds JustifyCenter tool.
        /// </summary>
        public EditorToolFactory JustifyCenter()
        {
            return Button("justifyCenter");
        }

        /// <summary>
        /// Adds JustifyFull tool.
        /// </summary>
        public EditorToolFactory JustifyFull()
        {
            return Button("justifyFull");
        }

        /// <summary>
        /// Adds InsertUnorderedList tool.
        /// </summary>
        public EditorToolFactory InsertUnorderedList()
        {
            return Button("insertUnorderedList");
        }

        /// <summary>
        /// Adds Indent tool.
        /// </summary>
        public EditorToolFactory Indent()
        {
            return Button("indent");
        }

        /// <summary>
        /// Adds Pdf tool.
        /// </summary>
        public EditorToolFactory Pdf()
        {
            return Button("pdf");
        }

        /// <summary>
        /// Adds Import tool.
        /// </summary>
        public EditorToolFactory Import()
        {
            return Button("import");
        }

        /// <summary>
        /// Adds ExportAs tool.
        /// </summary>
        public EditorToolFactory ExportAs()
        {
            return SelectBox("exportAs", null);
        }

        /// <summary>
        /// Adds ExportAs tool.
        /// </summary>
        public EditorToolFactory ExportAs(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return SelectBox("exportAs", items);
        }

        /// <summary>
        /// Adds Outdent tool.
        /// </summary>
        public EditorToolFactory Outdent()
        {
            return Button("outdent");
        }

        /// <summary>
        /// Adds InsertOrderedList tool.
        /// </summary>
        public EditorToolFactory InsertOrderedList()
        {
            return Button("insertOrderedList");
        }

        /// <summary>
        /// Adds InsertImage tool.
        /// </summary>
        public EditorToolFactory InsertImage()
        {
            return Button("insertImage");
        }

        /// <summary>
        /// Adds InsertFile tool.
        /// </summary>
        public EditorToolFactory InsertFile()
        {
            return Button("insertFile");
        }

        /// <summary>
        /// Adds CreateLink tool.
        /// </summary>
        public EditorToolFactory CreateLink()
        {
            return Button("createLink");
        }

        /// <summary>
        /// Adds Unlink tool.
        /// </summary>
        public EditorToolFactory Unlink()
        {
            return Button("unlink");
        }

        /// <summary>
        /// Adds SubScript tool.
        /// </summary>
        public EditorToolFactory SubScript()
        {
            return Button("subscript");
        }

        /// <summary>
        /// Adds SuperScript tool.
        /// </summary>
        public EditorToolFactory SuperScript()
        {
            return Button("superscript");
        }

        /// <summary>
        /// Adds ViewHtml tool.
        /// </summary>
        public EditorToolFactory ViewHtml()
        {
            return Button("viewHtml");
        }

        /// <summary>
        /// Adds Print tool.
        /// </summary>
        public EditorToolFactory Print()
        {
            return Button("print");
        }

        /// <summary>
        /// Adds FontName tool.
        /// </summary>
        public EditorToolFactory FontName()
        {
            return ComboBox("fontName", null);
        }

        /// <summary>
        /// Adds FontName tool.
        /// </summary>
        public EditorToolFactory FontName(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return ComboBox("fontName", items);
        }

        /// <summary>
        /// Adds FontSize tool.
        /// </summary>
        public EditorToolFactory FontSize()
        {
            return ComboBox("fontSize", null);
        }

        /// <summary>
        /// Adds FontSize tool.
        /// </summary>
        public EditorToolFactory FontSize(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return ComboBox("fontSize", items);
        }

        /// <summary>
        /// Adds Formatting tool.
        /// </summary>
        public EditorToolFactory Formatting()
        {
            return SelectBox("formatting", null);
        }

        /// <summary>
        /// Adds Formatting tool.
        /// </summary>
        public EditorToolFactory Formatting(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return SelectBox("formatting", items);
        }

        /// <summary>
        /// Adds FormatBlock tool.
        /// </summary>
        [Obsolete("The FormatBlock tool is deprecated, please use the Formatting tool instead. For more information, visit http://docs.telerik.com/kendo-ui/getting-started/changes-and-backward-compatibility")]
        public EditorToolFactory FormatBlock()
        {
            return SelectBox("formatBlock", null);
        }

        /// <summary>
        /// Adds FormatBlock tool.
        /// </summary>
        [Obsolete("The FormatBlock tool is deprecated, please use the Formatting tool instead. For more information, visit http://docs.telerik.com/kendo-ui/getting-started/changes-and-backward-compatibility")]
        public EditorToolFactory FormatBlock(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return SelectBox("formatBlock", items);
        }

        /// <summary>
        /// Adds Snippets tool.
        /// </summary>
        public EditorToolFactory Snippets(Action<EditorSnippetBuilder> configurator)
        {
            var items = new List<DropDownListItem>();

            var builder = new EditorSnippetBuilder(items, DI.Current.Resolve<IVirtualPathProvider>());

            configurator(builder);

            return SelectBox("insertHtml", items);
        }

        /// <summary>
        /// Adds Styles tool.
        /// </summary>
        [Obsolete("The Styles tool is deprecated, please use the Formatting tool instead. For more information, visit http://docs.telerik.com/kendo-ui/getting-started/changes-and-backward-compatibility")]
        public EditorToolFactory Styles(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownListItem>();

            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return SelectBox("style", items);
        }

        /// <summary>
        /// Adds FontColor tool.
        /// </summary>
        public EditorToolFactory FontColor()
        {
            return ColorPicker("foreColor");
        }

        /// <summary>
        /// Adds FontColor tool.
        /// </summary>
        public EditorToolFactory FontColor(Action<EditorColorPickerToolBuilder> configurator)
        {
            return ColorPicker("foreColor", configurator);
        }

        /// <summary>
        /// Adds BackColor tool.
        /// </summary>
        public EditorToolFactory BackColor()
        {
            return ColorPicker("backColor");
        }

        /// <summary>
        /// Adds BackColor tool.
        /// </summary>
        public EditorToolFactory BackColor(Action<EditorColorPickerToolBuilder> configurator)
        {
            return ColorPicker("backColor", configurator);
        }

        /// <summary>
        /// Adds TableEditing tools.
        /// </summary>
        public EditorToolFactory TableEditing()
        {
            Button("tableWizard");
            Button("createTable");
            Button("addColumnLeft");
            Button("addColumnRight");
            Button("addRowAbove");
            Button("addRowBelow");
            Button("deleteRow");
            Button("deleteColumn");

            return this;
        }

        /// <summary>
        /// Adds a separator.
        /// </summary>
        public EditorToolFactory Separator()
        {
            group.Tools.Add(new EditorTool(("separator")));

            return this;
        }

        /// <summary>
        /// Adds CleanFormatting tool.
        /// </summary>
        public EditorToolFactory CleanFormatting()
        {
            return Button("cleanFormatting");
        }

        private EditorToolFactory Button(string text)
        {
            group.Tools.Add(new EditorTool(text));

            return this;
        }

        private EditorToolFactory ComboBox(string identifier, IList<DropDownListItem> items)
        {
            group.Tools.Add(new EditorListTool(identifier, items));

            return this;
        }

        private EditorToolFactory SelectBox(string identifier, IList<DropDownListItem> items)
        {
            group.Tools.Add(new EditorListTool(identifier, items));

            return this;
        }

        private EditorToolFactory ColorPicker(string identifier)
        {
            group.Tools.Add(new EditorTool(identifier));

            return this;
        }

        private EditorToolFactory ColorPicker(string identifier, Action<EditorColorPickerToolBuilder> configurator)
        {
            var tool = new EditorColorPickerTool(identifier);

            configurator(new EditorColorPickerToolBuilder(tool));

            group.Tools.Add(tool);

            return this;
        }
    }
}
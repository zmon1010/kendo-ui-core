namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the EditorMessagesSettings settings.
    /// </summary>
    public class EditorMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly EditorMessagesSettings container;

        public EditorMessagesSettingsBuilder(EditorMessagesSettings settings)
        {
            container = settings;
        }

        public EditorMessagesSettingsBuilder Bold(string message)
        {
            container.Bold = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Italic(string message)
        {
            container.Italic = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Underline(string message)
        {
            container.Underline = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Strikethrough(string message)
        {
            container.Strikethrough = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Superscript(string message)
        {
            container.Superscript = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Subscript(string message)
        {
            container.Subscript = message;
            return this;
        }

        public EditorMessagesSettingsBuilder JustifyCenter(string message)
        {
            container.JustifyCenter = message;
            return this;
        }

        public EditorMessagesSettingsBuilder JustifyLeft(string message)
        {
            container.JustifyLeft = message;
            return this;
        }

        public EditorMessagesSettingsBuilder JustifyRight(string message)
        {
            container.JustifyRight = message;
            return this;
        }

        public EditorMessagesSettingsBuilder JustifyFull(string message)
        {
            container.JustifyFull = message;
            return this;
        }

        public EditorMessagesSettingsBuilder InsertOrderedList(string message)
        {
            container.InsertOrderedList = message;
            return this;
        }

        public EditorMessagesSettingsBuilder InsertUnorderedList(string message)
        {
            container.InsertUnorderedList = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Indent(string message)
        {
            container.Indent = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Outdent(string message)
        {
            container.Outdent = message;
            return this;
        }

        public EditorMessagesSettingsBuilder CreateLink(string message)
        {
            container.CreateLink = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Unlink(string message)
        {
            container.Unlink = message;
            return this;
        }

        public EditorMessagesSettingsBuilder InsertImage(string message)
        {
            container.InsertImage = message;
            return this;
        }

        public EditorMessagesSettingsBuilder InsertHtml(string message)
        {
            container.InsertHtml = message;
            return this;
        }

        public EditorMessagesSettingsBuilder FontName(string message)
        {
            container.FontName = message;
            return this;
        }

        public EditorMessagesSettingsBuilder FontNameInherit(string message)
        {
            container.FontNameInherit = message;
            return this;
        }

        public EditorMessagesSettingsBuilder FontSize(string message)
        {
            container.FontSize = message;
            return this;
        }

        public EditorMessagesSettingsBuilder FontSizeInherit(string message)
        {
            container.FontSizeInherit = message;
            return this;
        }

        public EditorMessagesSettingsBuilder FormatBlock(string message)
        {
            container.FormatBlock = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Formatting(string message)
        {
            container.Formatting = message;
            return this;
        }

        public EditorMessagesSettingsBuilder BackColor(string message)
        {
            container.BackColor = message;
            return this;
        }

        public EditorMessagesSettingsBuilder ForeColor(string message)
        {
            container.ForeColor = message;
            return this;
        }

        public EditorMessagesSettingsBuilder Styles(string message)
        {
            container.Styles = message;
            return this;
        }

        public EditorMessagesSettingsBuilder ViewHtml(string message)
        {
            container.ViewHtml = message;
            return this;
        }

        public EditorMessagesSettingsBuilder ImageBrowser(Action<EditorImageBrowserMessagesBuilder> configurator)
        {
            configurator(new EditorImageBrowserMessagesBuilder(container.ImageBrowserMessages));

            return this;
        }

        public EditorMessagesSettingsBuilder FileBrowser(Action<EditorFileBrowserMessagesBuilder> configurator)
        {
            configurator(new EditorFileBrowserMessagesBuilder(container.FileBrowserMessages));

            return this;
        }

        public EditorMessagesSettingsBuilder ImageWebAddress(string message)
        {
            container.ImageWebAddress = message;

            return this;
        }

        public EditorMessagesSettingsBuilder ImageAltText(string message)
        {
            container.ImageAltText = message;

            return this;
        }

        public EditorMessagesSettingsBuilder LinkWebAddress(string message)
        {
            container.LinkWebAddress = message;

            return this;
        }

        public EditorMessagesSettingsBuilder LinkText(string message)
        {
            container.LinkText = message;

            return this;
        }

        public EditorMessagesSettingsBuilder LinkToolTip(string message)
        {
            container.LinkToolTip = message;

            return this;
        }

        public EditorMessagesSettingsBuilder LinkOpenInNewWindow(string message)
        {
            container.LinkOpenInNewWindow = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DialogInsert(string message)
        {
            container.DialogInsert = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DialogButtonSeparator(string message)
        {
            container.DialogButtonSeparator = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DialogCancel(string message)
        {
            container.DialogCancel = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DialogUpdate(string message)
        {
            container.DialogUpdate = message;

            return this;
        }

        public EditorMessagesSettingsBuilder CreateTable(string message)
        {
            container.CreateTable = message;

            return this;
        }

        public EditorMessagesSettingsBuilder AddColumnLeft(string message)
        {
            container.AddColumnLeft = message;

            return this;
        }

        public EditorMessagesSettingsBuilder AddColumnRight(string message)
        {
            container.AddColumnRight = message;

            return this;
        }

        public EditorMessagesSettingsBuilder AddRowAbove(string message)
        {
            container.AddRowAbove = message;

            return this;
        }

        public EditorMessagesSettingsBuilder AddRowBelow(string message)
        {
            container.AddRowBelow = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DeleteColumn(string message)
        {
            container.DeleteColumn = message;

            return this;
        }

        public EditorMessagesSettingsBuilder DeleteRow(string message)
        {
            container.DeleteRow = message;

            return this;
        }

        //>> Fields
        
        /// <summary>
        /// The title of the tool that applies styling to elements. Deprecated.
        /// </summary>
        /// <param name="value">The value that configures the style.</param>
        public EditorMessagesSettingsBuilder Style(string value)
        {
            container.Style = value;

            return this;
        }
        
        /// <summary>
        /// The title of the iframe editing area when a sandboxed editor is used. Used as a hint for screen readers.
        /// </summary>
        /// <param name="value">The value that configures the editareatitle.</param>
        public EditorMessagesSettingsBuilder EditAreaTitle(string value)
        {
            container.EditAreaTitle = value;

            return this;
        }
        
        /// <summary>
        /// The caption for the image width in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value that configures the imagewidth.</param>
        public EditorMessagesSettingsBuilder ImageWidth(string value)
        {
            container.ImageWidth = value;

            return this;
        }
        
        /// <summary>
        /// The caption for the image height in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value that configures the imageheight.</param>
        public EditorMessagesSettingsBuilder ImageHeight(string value)
        {
            container.ImageHeight = value;

            return this;
        }
        
        /// <summary>
        /// The caption for the file URL in the insertFile dialog.
        /// </summary>
        /// <param name="value">The value that configures the filewebaddress.</param>
        public EditorMessagesSettingsBuilder FileWebAddress(string value)
        {
            container.FileWebAddress = value;

            return this;
        }
        
        /// <summary>
        /// The caption for the file title in the insertFile dialog.
        /// </summary>
        /// <param name="value">The value that configures the filetitle.</param>
        public EditorMessagesSettingsBuilder FileTitle(string value)
        {
            container.FileTitle = value;

            return this;
        }
        
        /// <summary>
        /// The status text of the tool that inserts tables, which indicates the dimensions of the inserted table.
        /// </summary>
        /// <param name="value">The value that configures the createtablehint.</param>
        public EditorMessagesSettingsBuilder CreateTableHint(string value)
        {
            container.CreateTableHint = value;

            return this;
        }
        
        //<< Fields
    }
}


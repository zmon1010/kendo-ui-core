using System;
using System.Collections.Generic;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring EditorMessagesSettings
    /// </summary>
    public partial class EditorMessagesSettingsBuilder
        
    {
        /// <summary>
        /// The title of the tool that makes text bold.
        /// </summary>
        /// <param name="value">The value for Bold</param>
        public EditorMessagesSettingsBuilder Bold(string value)
        {
            Container.Bold = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that makes text italicized.
        /// </summary>
        /// <param name="value">The value for Italic</param>
        public EditorMessagesSettingsBuilder Italic(string value)
        {
            Container.Italic = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that underlines text.
        /// </summary>
        /// <param name="value">The value for Underline</param>
        public EditorMessagesSettingsBuilder Underline(string value)
        {
            Container.Underline = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that strikes through text.
        /// </summary>
        /// <param name="value">The value for Strikethrough</param>
        public EditorMessagesSettingsBuilder Strikethrough(string value)
        {
            Container.Strikethrough = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that makes text superscript.
        /// </summary>
        /// <param name="value">The value for Superscript</param>
        public EditorMessagesSettingsBuilder Superscript(string value)
        {
            Container.Superscript = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that makes text subscript.
        /// </summary>
        /// <param name="value">The value for Subscript</param>
        public EditorMessagesSettingsBuilder Subscript(string value)
        {
            Container.Subscript = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that aligns text in the center.
        /// </summary>
        /// <param name="value">The value for JustifyCenter</param>
        public EditorMessagesSettingsBuilder JustifyCenter(string value)
        {
            Container.JustifyCenter = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that aligns text on the left.
        /// </summary>
        /// <param name="value">The value for JustifyLeft</param>
        public EditorMessagesSettingsBuilder JustifyLeft(string value)
        {
            Container.JustifyLeft = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that aligns text on the right.
        /// </summary>
        /// <param name="value">The value for JustifyRight</param>
        public EditorMessagesSettingsBuilder JustifyRight(string value)
        {
            Container.JustifyRight = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that justifies text both left and right.
        /// </summary>
        /// <param name="value">The value for JustifyFull</param>
        public EditorMessagesSettingsBuilder JustifyFull(string value)
        {
            Container.JustifyFull = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts an unordered list.
        /// </summary>
        /// <param name="value">The value for InsertUnorderedList</param>
        public EditorMessagesSettingsBuilder InsertUnorderedList(string value)
        {
            Container.InsertUnorderedList = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts an ordered list.
        /// </summary>
        /// <param name="value">The value for InsertOrderedList</param>
        public EditorMessagesSettingsBuilder InsertOrderedList(string value)
        {
            Container.InsertOrderedList = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that indents the content.
        /// </summary>
        /// <param name="value">The value for Indent</param>
        public EditorMessagesSettingsBuilder Indent(string value)
        {
            Container.Indent = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that outdents the content.
        /// </summary>
        /// <param name="value">The value for Outdent</param>
        public EditorMessagesSettingsBuilder Outdent(string value)
        {
            Container.Outdent = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that creates hyperlinks.
        /// </summary>
        /// <param name="value">The value for CreateLink</param>
        public EditorMessagesSettingsBuilder CreateLink(string value)
        {
            Container.CreateLink = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that removes hyperlinks.
        /// </summary>
        /// <param name="value">The value for Unlink</param>
        public EditorMessagesSettingsBuilder Unlink(string value)
        {
            Container.Unlink = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts images.
        /// </summary>
        /// <param name="value">The value for InsertImage</param>
        public EditorMessagesSettingsBuilder InsertImage(string value)
        {
            Container.InsertImage = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts links to files.
        /// </summary>
        /// <param name="value">The value for InsertFile</param>
        public EditorMessagesSettingsBuilder InsertFile(string value)
        {
            Container.InsertFile = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts HTML snippets.
        /// </summary>
        /// <param name="value">The value for InsertHtml</param>
        public EditorMessagesSettingsBuilder InsertHtml(string value)
        {
            Container.InsertHtml = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that shows the editor value as HTML.
        /// </summary>
        /// <param name="value">The value for ViewHtml</param>
        public EditorMessagesSettingsBuilder ViewHtml(string value)
        {
            Container.ViewHtml = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that changes the text font.
        /// </summary>
        /// <param name="value">The value for FontName</param>
        public EditorMessagesSettingsBuilder FontName(string value)
        {
            Container.FontName = value;
            return this;
        }

        /// <summary>
        /// The text that is shown when the text font will be inherited from the surrounding page.
        /// </summary>
        /// <param name="value">The value for FontNameInherit</param>
        public EditorMessagesSettingsBuilder FontNameInherit(string value)
        {
            Container.FontNameInherit = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that changes the text size.
        /// </summary>
        /// <param name="value">The value for FontSize</param>
        public EditorMessagesSettingsBuilder FontSize(string value)
        {
            Container.FontSize = value;
            return this;
        }

        /// <summary>
        /// The text that is shown when the text size will be inherited from the surrounding page.
        /// </summary>
        /// <param name="value">The value for FontSizeInherit</param>
        public EditorMessagesSettingsBuilder FontSizeInherit(string value)
        {
            Container.FontSizeInherit = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that lets users choose block formats. Deprecated.
        /// </summary>
        /// <param name="value">The value for FormatBlock</param>
        public EditorMessagesSettingsBuilder FormatBlock(string value)
        {
            Container.FormatBlock = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that lets users choose block formats.
        /// </summary>
        /// <param name="value">The value for Formatting</param>
        public EditorMessagesSettingsBuilder Formatting(string value)
        {
            Container.Formatting = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that changes the text color.
        /// </summary>
        /// <param name="value">The value for ForeColor</param>
        public EditorMessagesSettingsBuilder ForeColor(string value)
        {
            Container.ForeColor = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that changes the text background color.
        /// </summary>
        /// <param name="value">The value for BackColor</param>
        public EditorMessagesSettingsBuilder BackColor(string value)
        {
            Container.BackColor = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that applies styling to elements. Deprecated.
        /// </summary>
        /// <param name="value">The value for Style</param>
        public EditorMessagesSettingsBuilder Style(string value)
        {
            Container.Style = value;
            return this;
        }

        /// <summary>
        /// The message shown in the file- or imageBrowser when a folder is empty.
        /// </summary>
        /// <param name="value">The value for EmptyFolder</param>
        public EditorMessagesSettingsBuilder EmptyFolder(string value)
        {
            Container.EmptyFolder = value;
            return this;
        }

        /// <summary>
        /// The caption of the upload button in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for UploadFile</param>
        public EditorMessagesSettingsBuilder UploadFile(string value)
        {
            Container.UploadFile = value;
            return this;
        }

        /// <summary>
        /// The title of the iframe editing area when a sandboxed editor is used. Used as a hint for screen readers.
        /// </summary>
        /// <param name="value">The value for EditAreaTitle</param>
        public EditorMessagesSettingsBuilder EditAreaTitle(string value)
        {
            Container.EditAreaTitle = value;
            return this;
        }

        /// <summary>
        /// The caption of the sorting order in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for OrderBy</param>
        public EditorMessagesSettingsBuilder OrderBy(string value)
        {
            Container.OrderBy = value;
            return this;
        }

        /// <summary>
        /// The sorting order by size in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for OrderBySize</param>
        public EditorMessagesSettingsBuilder OrderBySize(string value)
        {
            Container.OrderBySize = value;
            return this;
        }

        /// <summary>
        /// The sorting order by name in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for OrderByName</param>
        public EditorMessagesSettingsBuilder OrderByName(string value)
        {
            Container.OrderByName = value;
            return this;
        }

        /// <summary>
        /// The error message shown when an invalid file type has been selected in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for InvalidFileType</param>
        public EditorMessagesSettingsBuilder InvalidFileType(string value)
        {
            Container.InvalidFileType = value;
            return this;
        }

        /// <summary>
        /// The confirmation message shown when deleting files in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for DeleteFile</param>
        public EditorMessagesSettingsBuilder DeleteFile(string value)
        {
            Container.DeleteFile = value;
            return this;
        }

        /// <summary>
        /// The confirmation message shown when overwriting files in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for OverwriteFile</param>
        public EditorMessagesSettingsBuilder OverwriteFile(string value)
        {
            Container.OverwriteFile = value;
            return this;
        }

        /// <summary>
        /// The error message shown when the target directory is not found in the file- or imageBrowser.
        /// </summary>
        /// <param name="value">The value for DirectoryNotFound</param>
        public EditorMessagesSettingsBuilder DirectoryNotFound(string value)
        {
            Container.DirectoryNotFound = value;
            return this;
        }

        /// <summary>
        /// The caption for the image URL in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value for ImageWebAddress</param>
        public EditorMessagesSettingsBuilder ImageWebAddress(string value)
        {
            Container.ImageWebAddress = value;
            return this;
        }

        /// <summary>
        /// The caption for the image alternate text in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value for ImageAltText</param>
        public EditorMessagesSettingsBuilder ImageAltText(string value)
        {
            Container.ImageAltText = value;
            return this;
        }

        /// <summary>
        /// The caption for the image width in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value for ImageWidth</param>
        public EditorMessagesSettingsBuilder ImageWidth(string value)
        {
            Container.ImageWidth = value;
            return this;
        }

        /// <summary>
        /// The caption for the image height in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value for ImageHeight</param>
        public EditorMessagesSettingsBuilder ImageHeight(string value)
        {
            Container.ImageHeight = value;
            return this;
        }

        /// <summary>
        /// The caption for the file URL in the insertFile dialog.
        /// </summary>
        /// <param name="value">The value for FileWebAddress</param>
        public EditorMessagesSettingsBuilder FileWebAddress(string value)
        {
            Container.FileWebAddress = value;
            return this;
        }

        /// <summary>
        /// The caption for the file title in the insertFile dialog.
        /// </summary>
        /// <param name="value">The value for FileTitle</param>
        public EditorMessagesSettingsBuilder FileTitle(string value)
        {
            Container.FileTitle = value;
            return this;
        }

        /// <summary>
        /// The caption for the URL in the createLink dialog.
        /// </summary>
        /// <param name="value">The value for LinkWebAddress</param>
        public EditorMessagesSettingsBuilder LinkWebAddress(string value)
        {
            Container.LinkWebAddress = value;
            return this;
        }

        /// <summary>
        /// The caption for the link text in the createLink dialog.
        /// </summary>
        /// <param name="value">The value for LinkText</param>
        public EditorMessagesSettingsBuilder LinkText(string value)
        {
            Container.LinkText = value;
            return this;
        }

        /// <summary>
        /// The caption for the link Tooltip in the createLink dialog.
        /// </summary>
        /// <param name="value">The value for LinkToolTip</param>
        public EditorMessagesSettingsBuilder LinkToolTip(string value)
        {
            Container.LinkToolTip = value;
            return this;
        }

        /// <summary>
        /// The caption for the checkbox for opening the link in a new window in the createLink dialog.
        /// </summary>
        /// <param name="value">The value for LinkOpenInNewWindow</param>
        public EditorMessagesSettingsBuilder LinkOpenInNewWindow(string value)
        {
            Container.LinkOpenInNewWindow = value;
            return this;
        }

        /// <summary>
        /// The label of the update button in all editor dialogs.
        /// </summary>
        /// <param name="value">The value for DialogUpdate</param>
        public EditorMessagesSettingsBuilder DialogUpdate(string value)
        {
            Container.DialogUpdate = value;
            return this;
        }

        /// <summary>
        /// The label of the insert button in all editor dialogs.
        /// </summary>
        /// <param name="value">The value for DialogInsert</param>
        public EditorMessagesSettingsBuilder DialogInsert(string value)
        {
            Container.DialogInsert = value;
            return this;
        }

        /// <summary>
        /// The label of the cancel button in all editor dialogs.
        /// </summary>
        /// <param name="value">The value for DialogCancel</param>
        public EditorMessagesSettingsBuilder DialogCancel(string value)
        {
            Container.DialogCancel = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that inserts tables.
        /// </summary>
        /// <param name="value">The value for CreateTable</param>
        public EditorMessagesSettingsBuilder CreateTable(string value)
        {
            Container.CreateTable = value;
            return this;
        }

        /// <summary>
        /// The status text of the tool that inserts tables, which indicates the dimensions of the inserted table.
        /// </summary>
        /// <param name="value">The value for CreateTableHint</param>
        public EditorMessagesSettingsBuilder CreateTableHint(string value)
        {
            Container.CreateTableHint = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that adds table columns on the left of the selection.
        /// </summary>
        /// <param name="value">The value for AddColumnLeft</param>
        public EditorMessagesSettingsBuilder AddColumnLeft(string value)
        {
            Container.AddColumnLeft = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that adds table columns on the right of the selection.
        /// </summary>
        /// <param name="value">The value for AddColumnRight</param>
        public EditorMessagesSettingsBuilder AddColumnRight(string value)
        {
            Container.AddColumnRight = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that adds table rows above the selection.
        /// </summary>
        /// <param name="value">The value for AddRowAbove</param>
        public EditorMessagesSettingsBuilder AddRowAbove(string value)
        {
            Container.AddRowAbove = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that adds table rows below the selection.
        /// </summary>
        /// <param name="value">The value for AddRowBelow</param>
        public EditorMessagesSettingsBuilder AddRowBelow(string value)
        {
            Container.AddRowBelow = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that deletes selected table rows.
        /// </summary>
        /// <param name="value">The value for DeleteRow</param>
        public EditorMessagesSettingsBuilder DeleteRow(string value)
        {
            Container.DeleteRow = value;
            return this;
        }

        /// <summary>
        /// The title of the tool that deletes selected table columns.
        /// </summary>
        /// <param name="value">The value for DeleteColumn</param>
        public EditorMessagesSettingsBuilder DeleteColumn(string value)
        {
            Container.DeleteColumn = value;
            return this;
        }

    }
}

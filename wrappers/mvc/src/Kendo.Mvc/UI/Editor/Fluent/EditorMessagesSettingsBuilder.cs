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

        public EditorMessagesSettingsBuilder CleanFormatting(string message)
        {
            container.CleanFormatting = message;

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

        public EditorMessagesSettingsBuilder InsertFile(string message)
        {
            container.InsertFile = message;

            return this;
        }

        //>> Fields
        
        /// <summary>
        /// The title of the Accessibility in the Table Wizard dialog.
        /// </summary>
        /// <param name="value">The value that configures the accessibilitytab.</param>
        public EditorMessagesSettingsBuilder AccessibilityTab(string value)
        {
            container.AccessibilityTab = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the aligncenter.</param>
        public EditorMessagesSettingsBuilder AlignCenter(string value)
        {
            container.AlignCenter = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the aligncenterbottom.</param>
        public EditorMessagesSettingsBuilder AlignCenterBottom(string value)
        {
            container.AlignCenterBottom = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the aligncentermiddle.</param>
        public EditorMessagesSettingsBuilder AlignCenterMiddle(string value)
        {
            container.AlignCenterMiddle = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the aligncentertop.</param>
        public EditorMessagesSettingsBuilder AlignCenterTop(string value)
        {
            container.AlignCenterTop = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignleft.</param>
        public EditorMessagesSettingsBuilder AlignLeft(string value)
        {
            container.AlignLeft = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignleftbottom.</param>
        public EditorMessagesSettingsBuilder AlignLeftBottom(string value)
        {
            container.AlignLeftBottom = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignleftmiddle.</param>
        public EditorMessagesSettingsBuilder AlignLeftMiddle(string value)
        {
            container.AlignLeftMiddle = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignlefttop.</param>
        public EditorMessagesSettingsBuilder AlignLeftTop(string value)
        {
            container.AlignLeftTop = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that removes the cell text's alignment.
        /// </summary>
        /// <param name="value">The value that configures the alignremove.</param>
        public EditorMessagesSettingsBuilder AlignRemove(string value)
        {
            container.AlignRemove = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignright.</param>
        public EditorMessagesSettingsBuilder AlignRight(string value)
        {
            container.AlignRight = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignrightbottom.</param>
        public EditorMessagesSettingsBuilder AlignRightBottom(string value)
        {
            container.AlignRightBottom = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignrightmiddle.</param>
        public EditorMessagesSettingsBuilder AlignRightMiddle(string value)
        {
            container.AlignRightMiddle = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignrighttop.</param>
        public EditorMessagesSettingsBuilder AlignRightTop(string value)
        {
            container.AlignRightTop = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that aligns the cell text.
        /// </summary>
        /// <param name="value">The value that configures the alignment.</param>
        public EditorMessagesSettingsBuilder Alignment(string value)
        {
            container.Alignment = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Associate cells with headers tool.
        /// </summary>
        /// <param name="value">The value that configures the associatecellswithheaders.</param>
        public EditorMessagesSettingsBuilder AssociateCellsWithHeaders(string value)
        {
            container.AssociateCellsWithHeaders = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that changes the text background of the tables/cells.
        /// </summary>
        /// <param name="value">The value that configures the background.</param>
        public EditorMessagesSettingsBuilder Background(string value)
        {
            container.Background = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that changes the border of tables.
        /// </summary>
        /// <param name="value">The value that configures the border.</param>
        public EditorMessagesSettingsBuilder Border(string value)
        {
            container.Border = value;

            return this;
        }
        
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
        /// The title of the tool that adds caption to tables.
        /// </summary>
        /// <param name="value">The value that configures the caption.</param>
        public EditorMessagesSettingsBuilder Caption(string value)
        {
            container.Caption = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that applies margin to table cells.
        /// </summary>
        /// <param name="value">The value that configures the cellmargin.</param>
        public EditorMessagesSettingsBuilder CellMargin(string value)
        {
            container.CellMargin = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that applies padding to table cells.
        /// </summary>
        /// <param name="value">The value that configures the cellpadding.</param>
        public EditorMessagesSettingsBuilder CellPadding(string value)
        {
            container.CellPadding = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that applies spacing to table cells.
        /// </summary>
        /// <param name="value">The value that configures the cellspacing.</param>
        public EditorMessagesSettingsBuilder CellSpacing(string value)
        {
            container.CellSpacing = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Cell tab in Table Wizard dialog.
        /// </summary>
        /// <param name="value">The value that configures the celltab.</param>
        public EditorMessagesSettingsBuilder CellTab(string value)
        {
            container.CellTab = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Collapse borders option in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the collapseborders.</param>
        public EditorMessagesSettingsBuilder CollapseBorders(string value)
        {
            container.CollapseBorders = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Columns tool in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the columns.</param>
        public EditorMessagesSettingsBuilder Columns(string value)
        {
            container.Columns = value;

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
        
        /// <summary>
        /// The title of the CSS Class dropdown tool.
        /// </summary>
        /// <param name="value">The value that configures the cssclass.</param>
        public EditorMessagesSettingsBuilder CssClass(string value)
        {
            container.CssClass = value;

            return this;
        }
        
        /// <summary>
        /// The title of the OK buttons in editor's dialogs.
        /// </summary>
        /// <param name="value">The value that configures the dialogok.</param>
        public EditorMessagesSettingsBuilder DialogOk(string value)
        {
            container.DialogOk = value;

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
        /// The caption for the file title in the insertFile dialog.
        /// </summary>
        /// <param name="value">The value that configures the filetitle.</param>
        public EditorMessagesSettingsBuilder FileTitle(string value)
        {
            container.FileTitle = value;

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
        /// The title of the height fields.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public EditorMessagesSettingsBuilder Height(string value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The title of the id fields.
        /// </summary>
        /// <param name="value">The value that configures the id.</param>
        public EditorMessagesSettingsBuilder Id(string value)
        {
            container.Id = value;

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
        /// The caption for the image width in the insertImage dialog.
        /// </summary>
        /// <param name="value">The value that configures the imagewidth.</param>
        public EditorMessagesSettingsBuilder ImageWidth(string value)
        {
            container.ImageWidth = value;

            return this;
        }
        
        /// <summary>
        /// The title of the tool that shows the overflow tools.
        /// </summary>
        /// <param name="value">The value that configures the overflowanchor.</param>
        public EditorMessagesSettingsBuilder OverflowAnchor(string value)
        {
            container.OverflowAnchor = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Rows field in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the rows.</param>
        public EditorMessagesSettingsBuilder Rows(string value)
        {
            container.Rows = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Select All Cells tool.
        /// </summary>
        /// <param name="value">The value that configures the selectallcells.</param>
        public EditorMessagesSettingsBuilder SelectAllCells(string value)
        {
            container.SelectAllCells = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Summary field in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the summary.</param>
        public EditorMessagesSettingsBuilder Summary(string value)
        {
            container.Summary = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Table tab in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the tabletab.</param>
        public EditorMessagesSettingsBuilder TableTab(string value)
        {
            container.TableTab = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Table Wizard tool.
        /// </summary>
        /// <param name="value">The value that configures the tablewizard.</param>
        public EditorMessagesSettingsBuilder TableWizard(string value)
        {
            container.TableWizard = value;

            return this;
        }
        
        /// <summary>
        /// The label of the Units dropdowns in TableWizard dialog.
        /// </summary>
        /// <param name="value">The value that configures the units.</param>
        public EditorMessagesSettingsBuilder Units(string value)
        {
            container.Units = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Width fields.
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public EditorMessagesSettingsBuilder Width(string value)
        {
            container.Width = value;

            return this;
        }
        
        /// <summary>
        /// The title of the Wrap Text option in Table Wizard.
        /// </summary>
        /// <param name="value">The value that configures the wraptext.</param>
        public EditorMessagesSettingsBuilder WrapText(string value)
        {
            container.WrapText = value;

            return this;
        }
        
        //<< Fields
    }
}


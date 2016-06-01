using Kendo.Mvc.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Mvc.UI
{
    /// <summary>
    /// Kendo UI EditorMessagesSettings class
    /// </summary>
    public partial class EditorMessagesSettings 
    {
        public string Bold { get; set; }

        public string Italic { get; set; }

        public string Underline { get; set; }

        public string Strikethrough { get; set; }

        public string Superscript { get; set; }

        public string Subscript { get; set; }

        public string JustifyCenter { get; set; }

        public string JustifyLeft { get; set; }

        public string JustifyRight { get; set; }

        public string JustifyFull { get; set; }

        public string InsertUnorderedList { get; set; }

        public string InsertOrderedList { get; set; }

        public string Indent { get; set; }

        public string Outdent { get; set; }

        public string CreateLink { get; set; }

        public string Unlink { get; set; }

        public string InsertImage { get; set; }

        public string InsertFile { get; set; }

        public string InsertHtml { get; set; }

        public string ViewHtml { get; set; }

        public string FontName { get; set; }

        public string FontNameInherit { get; set; }

        public string FontSize { get; set; }

        public string FontSizeInherit { get; set; }

        public string FormatBlock { get; set; }

        public string Formatting { get; set; }

        public string ForeColor { get; set; }

        public string BackColor { get; set; }

        public string Style { get; set; }

        public string EmptyFolder { get; set; }

        public string UploadFile { get; set; }

        public string EditAreaTitle { get; set; }

        public string OrderBy { get; set; }

        public string OrderBySize { get; set; }

        public string OrderByName { get; set; }

        public string InvalidFileType { get; set; }

        public string DeleteFile { get; set; }

        public string OverwriteFile { get; set; }

        public string DirectoryNotFound { get; set; }

        public string ImageWebAddress { get; set; }

        public string ImageAltText { get; set; }

        public string ImageWidth { get; set; }

        public string ImageHeight { get; set; }

        public string FileWebAddress { get; set; }

        public string FileTitle { get; set; }

        public string LinkWebAddress { get; set; }

        public string LinkText { get; set; }

        public string LinkToolTip { get; set; }

        public string LinkOpenInNewWindow { get; set; }

        public string DialogUpdate { get; set; }

        public string DialogInsert { get; set; }

        public string DialogCancel { get; set; }

        public string CreateTable { get; set; }

        public string CreateTableHint { get; set; }

        public string AddColumnLeft { get; set; }

        public string AddColumnRight { get; set; }

        public string AddRowAbove { get; set; }

        public string AddRowBelow { get; set; }

        public string DeleteRow { get; set; }

        public string DeleteColumn { get; set; }


        public Editor Editor { get; set; }

        protected Dictionary<string, object> SerializeSettings()
        {
            var settings = new Dictionary<string, object>();

            if (Bold?.HasValue() == true)
            {
                settings["bold"] = Bold;
            }

            if (Italic?.HasValue() == true)
            {
                settings["italic"] = Italic;
            }

            if (Underline?.HasValue() == true)
            {
                settings["underline"] = Underline;
            }

            if (Strikethrough?.HasValue() == true)
            {
                settings["strikethrough"] = Strikethrough;
            }

            if (Superscript?.HasValue() == true)
            {
                settings["superscript"] = Superscript;
            }

            if (Subscript?.HasValue() == true)
            {
                settings["subscript"] = Subscript;
            }

            if (JustifyCenter?.HasValue() == true)
            {
                settings["justifyCenter"] = JustifyCenter;
            }

            if (JustifyLeft?.HasValue() == true)
            {
                settings["justifyLeft"] = JustifyLeft;
            }

            if (JustifyRight?.HasValue() == true)
            {
                settings["justifyRight"] = JustifyRight;
            }

            if (JustifyFull?.HasValue() == true)
            {
                settings["justifyFull"] = JustifyFull;
            }

            if (InsertUnorderedList?.HasValue() == true)
            {
                settings["insertUnorderedList"] = InsertUnorderedList;
            }

            if (InsertOrderedList?.HasValue() == true)
            {
                settings["insertOrderedList"] = InsertOrderedList;
            }

            if (Indent?.HasValue() == true)
            {
                settings["indent"] = Indent;
            }

            if (Outdent?.HasValue() == true)
            {
                settings["outdent"] = Outdent;
            }

            if (CreateLink?.HasValue() == true)
            {
                settings["createLink"] = CreateLink;
            }

            if (Unlink?.HasValue() == true)
            {
                settings["unlink"] = Unlink;
            }

            if (InsertImage?.HasValue() == true)
            {
                settings["insertImage"] = InsertImage;
            }

            if (InsertFile?.HasValue() == true)
            {
                settings["insertFile"] = InsertFile;
            }

            if (InsertHtml?.HasValue() == true)
            {
                settings["insertHtml"] = InsertHtml;
            }

            if (ViewHtml?.HasValue() == true)
            {
                settings["viewHtml"] = ViewHtml;
            }

            if (FontName?.HasValue() == true)
            {
                settings["fontName"] = FontName;
            }

            if (FontNameInherit?.HasValue() == true)
            {
                settings["fontNameInherit"] = FontNameInherit;
            }

            if (FontSize?.HasValue() == true)
            {
                settings["fontSize"] = FontSize;
            }

            if (FontSizeInherit?.HasValue() == true)
            {
                settings["fontSizeInherit"] = FontSizeInherit;
            }

            if (FormatBlock?.HasValue() == true)
            {
                settings["formatBlock"] = FormatBlock;
            }

            if (Formatting?.HasValue() == true)
            {
                settings["formatting"] = Formatting;
            }

            if (ForeColor?.HasValue() == true)
            {
                settings["foreColor"] = ForeColor;
            }

            if (BackColor?.HasValue() == true)
            {
                settings["backColor"] = BackColor;
            }

            if (Style?.HasValue() == true)
            {
                settings["style"] = Style;
            }

            if (EmptyFolder?.HasValue() == true)
            {
                settings["emptyFolder"] = EmptyFolder;
            }

            if (UploadFile?.HasValue() == true)
            {
                settings["uploadFile"] = UploadFile;
            }

            if (EditAreaTitle?.HasValue() == true)
            {
                settings["editAreaTitle"] = EditAreaTitle;
            }

            if (OrderBy?.HasValue() == true)
            {
                settings["orderBy"] = OrderBy;
            }

            if (OrderBySize?.HasValue() == true)
            {
                settings["orderBySize"] = OrderBySize;
            }

            if (OrderByName?.HasValue() == true)
            {
                settings["orderByName"] = OrderByName;
            }

            if (InvalidFileType?.HasValue() == true)
            {
                settings["invalidFileType"] = InvalidFileType;
            }

            if (DeleteFile?.HasValue() == true)
            {
                settings["deleteFile"] = DeleteFile;
            }

            if (OverwriteFile?.HasValue() == true)
            {
                settings["overwriteFile"] = OverwriteFile;
            }

            if (DirectoryNotFound?.HasValue() == true)
            {
                settings["directoryNotFound"] = DirectoryNotFound;
            }

            if (ImageWebAddress?.HasValue() == true)
            {
                settings["imageWebAddress"] = ImageWebAddress;
            }

            if (ImageAltText?.HasValue() == true)
            {
                settings["imageAltText"] = ImageAltText;
            }

            if (ImageWidth?.HasValue() == true)
            {
                settings["imageWidth"] = ImageWidth;
            }

            if (ImageHeight?.HasValue() == true)
            {
                settings["imageHeight"] = ImageHeight;
            }

            if (FileWebAddress?.HasValue() == true)
            {
                settings["fileWebAddress"] = FileWebAddress;
            }

            if (FileTitle?.HasValue() == true)
            {
                settings["fileTitle"] = FileTitle;
            }

            if (LinkWebAddress?.HasValue() == true)
            {
                settings["linkWebAddress"] = LinkWebAddress;
            }

            if (LinkText?.HasValue() == true)
            {
                settings["linkText"] = LinkText;
            }

            if (LinkToolTip?.HasValue() == true)
            {
                settings["linkToolTip"] = LinkToolTip;
            }

            if (LinkOpenInNewWindow?.HasValue() == true)
            {
                settings["linkOpenInNewWindow"] = LinkOpenInNewWindow;
            }

            if (DialogUpdate?.HasValue() == true)
            {
                settings["dialogUpdate"] = DialogUpdate;
            }

            if (DialogInsert?.HasValue() == true)
            {
                settings["dialogInsert"] = DialogInsert;
            }

            if (DialogCancel?.HasValue() == true)
            {
                settings["dialogCancel"] = DialogCancel;
            }

            if (CreateTable?.HasValue() == true)
            {
                settings["createTable"] = CreateTable;
            }

            if (CreateTableHint?.HasValue() == true)
            {
                settings["createTableHint"] = CreateTableHint;
            }

            if (AddColumnLeft?.HasValue() == true)
            {
                settings["addColumnLeft"] = AddColumnLeft;
            }

            if (AddColumnRight?.HasValue() == true)
            {
                settings["addColumnRight"] = AddColumnRight;
            }

            if (AddRowAbove?.HasValue() == true)
            {
                settings["addRowAbove"] = AddRowAbove;
            }

            if (AddRowBelow?.HasValue() == true)
            {
                settings["addRowBelow"] = AddRowBelow;
            }

            if (DeleteRow?.HasValue() == true)
            {
                settings["deleteRow"] = DeleteRow;
            }

            if (DeleteColumn?.HasValue() == true)
            {
                settings["deleteColumn"] = DeleteColumn;
            }

            return settings;
        }
    }
}

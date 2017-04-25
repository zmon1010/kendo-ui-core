
package com.kendoui.taglib.editor;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.EditorTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        EditorTag parent = (EditorTag)findParentWithClass(EditorTag.class);


        parent.setMessages(this);

//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize
//<< initialize

        super.initialize();
    }

    @Override
    public void destroy() {
//>> destroy
//<< destroy

        super.destroy();
    }

//>> Attributes

    public static String tagName() {
        return "editor-messages";
    }

    public java.lang.String getAccessibilityTab() {
        return (java.lang.String)getProperty("accessibilityTab");
    }

    public void setAccessibilityTab(java.lang.String value) {
        setProperty("accessibilityTab", value);
    }

    public java.lang.String getAddColumnLeft() {
        return (java.lang.String)getProperty("addColumnLeft");
    }

    public void setAddColumnLeft(java.lang.String value) {
        setProperty("addColumnLeft", value);
    }

    public java.lang.String getAddColumnRight() {
        return (java.lang.String)getProperty("addColumnRight");
    }

    public void setAddColumnRight(java.lang.String value) {
        setProperty("addColumnRight", value);
    }

    public java.lang.String getAddRowAbove() {
        return (java.lang.String)getProperty("addRowAbove");
    }

    public void setAddRowAbove(java.lang.String value) {
        setProperty("addRowAbove", value);
    }

    public java.lang.String getAddRowBelow() {
        return (java.lang.String)getProperty("addRowBelow");
    }

    public void setAddRowBelow(java.lang.String value) {
        setProperty("addRowBelow", value);
    }

    public java.lang.String getAlignCenter() {
        return (java.lang.String)getProperty("alignCenter");
    }

    public void setAlignCenter(java.lang.String value) {
        setProperty("alignCenter", value);
    }

    public java.lang.String getAlignCenterBottom() {
        return (java.lang.String)getProperty("alignCenterBottom");
    }

    public void setAlignCenterBottom(java.lang.String value) {
        setProperty("alignCenterBottom", value);
    }

    public java.lang.String getAlignCenterMiddle() {
        return (java.lang.String)getProperty("alignCenterMiddle");
    }

    public void setAlignCenterMiddle(java.lang.String value) {
        setProperty("alignCenterMiddle", value);
    }

    public java.lang.String getAlignCenterTop() {
        return (java.lang.String)getProperty("alignCenterTop");
    }

    public void setAlignCenterTop(java.lang.String value) {
        setProperty("alignCenterTop", value);
    }

    public java.lang.String getAlignLeft() {
        return (java.lang.String)getProperty("alignLeft");
    }

    public void setAlignLeft(java.lang.String value) {
        setProperty("alignLeft", value);
    }

    public java.lang.String getAlignLeftBottom() {
        return (java.lang.String)getProperty("alignLeftBottom");
    }

    public void setAlignLeftBottom(java.lang.String value) {
        setProperty("alignLeftBottom", value);
    }

    public java.lang.String getAlignLeftMiddle() {
        return (java.lang.String)getProperty("alignLeftMiddle");
    }

    public void setAlignLeftMiddle(java.lang.String value) {
        setProperty("alignLeftMiddle", value);
    }

    public java.lang.String getAlignLeftTop() {
        return (java.lang.String)getProperty("alignLeftTop");
    }

    public void setAlignLeftTop(java.lang.String value) {
        setProperty("alignLeftTop", value);
    }

    public java.lang.String getAlignRemove() {
        return (java.lang.String)getProperty("alignRemove");
    }

    public void setAlignRemove(java.lang.String value) {
        setProperty("alignRemove", value);
    }

    public java.lang.String getAlignRight() {
        return (java.lang.String)getProperty("alignRight");
    }

    public void setAlignRight(java.lang.String value) {
        setProperty("alignRight", value);
    }

    public java.lang.String getAlignRightBottom() {
        return (java.lang.String)getProperty("alignRightBottom");
    }

    public void setAlignRightBottom(java.lang.String value) {
        setProperty("alignRightBottom", value);
    }

    public java.lang.String getAlignRightMiddle() {
        return (java.lang.String)getProperty("alignRightMiddle");
    }

    public void setAlignRightMiddle(java.lang.String value) {
        setProperty("alignRightMiddle", value);
    }

    public java.lang.String getAlignRightTop() {
        return (java.lang.String)getProperty("alignRightTop");
    }

    public void setAlignRightTop(java.lang.String value) {
        setProperty("alignRightTop", value);
    }

    public java.lang.String getAlignment() {
        return (java.lang.String)getProperty("alignment");
    }

    public void setAlignment(java.lang.String value) {
        setProperty("alignment", value);
    }

    public java.lang.String getAssociateCellsWithHeaders() {
        return (java.lang.String)getProperty("associateCellsWithHeaders");
    }

    public void setAssociateCellsWithHeaders(java.lang.String value) {
        setProperty("associateCellsWithHeaders", value);
    }

    public java.lang.String getBackColor() {
        return (java.lang.String)getProperty("backColor");
    }

    public void setBackColor(java.lang.String value) {
        setProperty("backColor", value);
    }

    public java.lang.String getBackground() {
        return (java.lang.String)getProperty("background");
    }

    public void setBackground(java.lang.String value) {
        setProperty("background", value);
    }

    public java.lang.String getBold() {
        return (java.lang.String)getProperty("bold");
    }

    public void setBold(java.lang.String value) {
        setProperty("bold", value);
    }

    public java.lang.String getBorder() {
        return (java.lang.String)getProperty("border");
    }

    public void setBorder(java.lang.String value) {
        setProperty("border", value);
    }

    public java.lang.String getCaption() {
        return (java.lang.String)getProperty("caption");
    }

    public void setCaption(java.lang.String value) {
        setProperty("caption", value);
    }

    public java.lang.String getCellMargin() {
        return (java.lang.String)getProperty("cellMargin");
    }

    public void setCellMargin(java.lang.String value) {
        setProperty("cellMargin", value);
    }

    public java.lang.String getCellPadding() {
        return (java.lang.String)getProperty("cellPadding");
    }

    public void setCellPadding(java.lang.String value) {
        setProperty("cellPadding", value);
    }

    public java.lang.String getCellSpacing() {
        return (java.lang.String)getProperty("cellSpacing");
    }

    public void setCellSpacing(java.lang.String value) {
        setProperty("cellSpacing", value);
    }

    public java.lang.String getCellTab() {
        return (java.lang.String)getProperty("cellTab");
    }

    public void setCellTab(java.lang.String value) {
        setProperty("cellTab", value);
    }

    public java.lang.String getCleanFormatting() {
        return (java.lang.String)getProperty("cleanFormatting");
    }

    public void setCleanFormatting(java.lang.String value) {
        setProperty("cleanFormatting", value);
    }

    public java.lang.String getCollapseBorders() {
        return (java.lang.String)getProperty("collapseBorders");
    }

    public void setCollapseBorders(java.lang.String value) {
        setProperty("collapseBorders", value);
    }

    public java.lang.String getColumns() {
        return (java.lang.String)getProperty("columns");
    }

    public void setColumns(java.lang.String value) {
        setProperty("columns", value);
    }

    public java.lang.String getCreateLink() {
        return (java.lang.String)getProperty("createLink");
    }

    public void setCreateLink(java.lang.String value) {
        setProperty("createLink", value);
    }

    public java.lang.String getCreateTable() {
        return (java.lang.String)getProperty("createTable");
    }

    public void setCreateTable(java.lang.String value) {
        setProperty("createTable", value);
    }

    public java.lang.String getCreateTableHint() {
        return (java.lang.String)getProperty("createTableHint");
    }

    public void setCreateTableHint(java.lang.String value) {
        setProperty("createTableHint", value);
    }

    public java.lang.String getCssClass() {
        return (java.lang.String)getProperty("cssClass");
    }

    public void setCssClass(java.lang.String value) {
        setProperty("cssClass", value);
    }

    public java.lang.String getDeleteColumn() {
        return (java.lang.String)getProperty("deleteColumn");
    }

    public void setDeleteColumn(java.lang.String value) {
        setProperty("deleteColumn", value);
    }

    public java.lang.String getDeleteRow() {
        return (java.lang.String)getProperty("deleteRow");
    }

    public void setDeleteRow(java.lang.String value) {
        setProperty("deleteRow", value);
    }

    public java.lang.String getDialogCancel() {
        return (java.lang.String)getProperty("dialogCancel");
    }

    public void setDialogCancel(java.lang.String value) {
        setProperty("dialogCancel", value);
    }

    public java.lang.String getDialogInsert() {
        return (java.lang.String)getProperty("dialogInsert");
    }

    public void setDialogInsert(java.lang.String value) {
        setProperty("dialogInsert", value);
    }

    public java.lang.String getDialogOk() {
        return (java.lang.String)getProperty("dialogOk");
    }

    public void setDialogOk(java.lang.String value) {
        setProperty("dialogOk", value);
    }

    public java.lang.String getDialogUpdate() {
        return (java.lang.String)getProperty("dialogUpdate");
    }

    public void setDialogUpdate(java.lang.String value) {
        setProperty("dialogUpdate", value);
    }

    public java.lang.String getEditAreaTitle() {
        return (java.lang.String)getProperty("editAreaTitle");
    }

    public void setEditAreaTitle(java.lang.String value) {
        setProperty("editAreaTitle", value);
    }

    public java.lang.String getFileTitle() {
        return (java.lang.String)getProperty("fileTitle");
    }

    public void setFileTitle(java.lang.String value) {
        setProperty("fileTitle", value);
    }

    public java.lang.String getFileWebAddress() {
        return (java.lang.String)getProperty("fileWebAddress");
    }

    public void setFileWebAddress(java.lang.String value) {
        setProperty("fileWebAddress", value);
    }

    public java.lang.String getFontName() {
        return (java.lang.String)getProperty("fontName");
    }

    public void setFontName(java.lang.String value) {
        setProperty("fontName", value);
    }

    public java.lang.String getFontNameInherit() {
        return (java.lang.String)getProperty("fontNameInherit");
    }

    public void setFontNameInherit(java.lang.String value) {
        setProperty("fontNameInherit", value);
    }

    public java.lang.String getFontSize() {
        return (java.lang.String)getProperty("fontSize");
    }

    public void setFontSize(java.lang.String value) {
        setProperty("fontSize", value);
    }

    public java.lang.String getFontSizeInherit() {
        return (java.lang.String)getProperty("fontSizeInherit");
    }

    public void setFontSizeInherit(java.lang.String value) {
        setProperty("fontSizeInherit", value);
    }

    public java.lang.String getForeColor() {
        return (java.lang.String)getProperty("foreColor");
    }

    public void setForeColor(java.lang.String value) {
        setProperty("foreColor", value);
    }

    public java.lang.String getFormatBlock() {
        return (java.lang.String)getProperty("formatBlock");
    }

    public void setFormatBlock(java.lang.String value) {
        setProperty("formatBlock", value);
    }

    public java.lang.String getFormatting() {
        return (java.lang.String)getProperty("formatting");
    }

    public void setFormatting(java.lang.String value) {
        setProperty("formatting", value);
    }

    public java.lang.String getHeight() {
        return (java.lang.String)getProperty("height");
    }

    public void setHeight(java.lang.String value) {
        setProperty("height", value);
    }

    public java.lang.String getId() {
        return (java.lang.String)getProperty("id");
    }

    public void setId(java.lang.String value) {
        setProperty("id", value);
    }

    public java.lang.String getImageAltText() {
        return (java.lang.String)getProperty("imageAltText");
    }

    public void setImageAltText(java.lang.String value) {
        setProperty("imageAltText", value);
    }

    public java.lang.String getImageHeight() {
        return (java.lang.String)getProperty("imageHeight");
    }

    public void setImageHeight(java.lang.String value) {
        setProperty("imageHeight", value);
    }

    public java.lang.String getImageWebAddress() {
        return (java.lang.String)getProperty("imageWebAddress");
    }

    public void setImageWebAddress(java.lang.String value) {
        setProperty("imageWebAddress", value);
    }

    public java.lang.String getImageWidth() {
        return (java.lang.String)getProperty("imageWidth");
    }

    public void setImageWidth(java.lang.String value) {
        setProperty("imageWidth", value);
    }

    public java.lang.String getIndent() {
        return (java.lang.String)getProperty("indent");
    }

    public void setIndent(java.lang.String value) {
        setProperty("indent", value);
    }

    public java.lang.String getInsertFile() {
        return (java.lang.String)getProperty("insertFile");
    }

    public void setInsertFile(java.lang.String value) {
        setProperty("insertFile", value);
    }

    public java.lang.String getInsertHtml() {
        return (java.lang.String)getProperty("insertHtml");
    }

    public void setInsertHtml(java.lang.String value) {
        setProperty("insertHtml", value);
    }

    public java.lang.String getInsertImage() {
        return (java.lang.String)getProperty("insertImage");
    }

    public void setInsertImage(java.lang.String value) {
        setProperty("insertImage", value);
    }

    public java.lang.String getInsertOrderedList() {
        return (java.lang.String)getProperty("insertOrderedList");
    }

    public void setInsertOrderedList(java.lang.String value) {
        setProperty("insertOrderedList", value);
    }

    public java.lang.String getInsertUnorderedList() {
        return (java.lang.String)getProperty("insertUnorderedList");
    }

    public void setInsertUnorderedList(java.lang.String value) {
        setProperty("insertUnorderedList", value);
    }

    public java.lang.String getItalic() {
        return (java.lang.String)getProperty("italic");
    }

    public void setItalic(java.lang.String value) {
        setProperty("italic", value);
    }

    public java.lang.String getJustifyCenter() {
        return (java.lang.String)getProperty("justifyCenter");
    }

    public void setJustifyCenter(java.lang.String value) {
        setProperty("justifyCenter", value);
    }

    public java.lang.String getJustifyFull() {
        return (java.lang.String)getProperty("justifyFull");
    }

    public void setJustifyFull(java.lang.String value) {
        setProperty("justifyFull", value);
    }

    public java.lang.String getJustifyLeft() {
        return (java.lang.String)getProperty("justifyLeft");
    }

    public void setJustifyLeft(java.lang.String value) {
        setProperty("justifyLeft", value);
    }

    public java.lang.String getJustifyRight() {
        return (java.lang.String)getProperty("justifyRight");
    }

    public void setJustifyRight(java.lang.String value) {
        setProperty("justifyRight", value);
    }

    public java.lang.String getLinkOpenInNewWindow() {
        return (java.lang.String)getProperty("linkOpenInNewWindow");
    }

    public void setLinkOpenInNewWindow(java.lang.String value) {
        setProperty("linkOpenInNewWindow", value);
    }

    public java.lang.String getLinkText() {
        return (java.lang.String)getProperty("linkText");
    }

    public void setLinkText(java.lang.String value) {
        setProperty("linkText", value);
    }

    public java.lang.String getLinkToolTip() {
        return (java.lang.String)getProperty("linkToolTip");
    }

    public void setLinkToolTip(java.lang.String value) {
        setProperty("linkToolTip", value);
    }

    public java.lang.String getLinkWebAddress() {
        return (java.lang.String)getProperty("linkWebAddress");
    }

    public void setLinkWebAddress(java.lang.String value) {
        setProperty("linkWebAddress", value);
    }

    public java.lang.String getOutdent() {
        return (java.lang.String)getProperty("outdent");
    }

    public void setOutdent(java.lang.String value) {
        setProperty("outdent", value);
    }

    public java.lang.String getOverflowAnchor() {
        return (java.lang.String)getProperty("overflowAnchor");
    }

    public void setOverflowAnchor(java.lang.String value) {
        setProperty("overflowAnchor", value);
    }

    public java.lang.String getPrint() {
        return (java.lang.String)getProperty("print");
    }

    public void setPrint(java.lang.String value) {
        setProperty("print", value);
    }

    public java.lang.String getRows() {
        return (java.lang.String)getProperty("rows");
    }

    public void setRows(java.lang.String value) {
        setProperty("rows", value);
    }

    public java.lang.String getSelectAllCells() {
        return (java.lang.String)getProperty("selectAllCells");
    }

    public void setSelectAllCells(java.lang.String value) {
        setProperty("selectAllCells", value);
    }

    public java.lang.String getStrikethrough() {
        return (java.lang.String)getProperty("strikethrough");
    }

    public void setStrikethrough(java.lang.String value) {
        setProperty("strikethrough", value);
    }

    public java.lang.String getStyle() {
        return (java.lang.String)getProperty("style");
    }

    public void setStyle(java.lang.String value) {
        setProperty("style", value);
    }

    public java.lang.String getSubscript() {
        return (java.lang.String)getProperty("subscript");
    }

    public void setSubscript(java.lang.String value) {
        setProperty("subscript", value);
    }

    public java.lang.String getSummary() {
        return (java.lang.String)getProperty("summary");
    }

    public void setSummary(java.lang.String value) {
        setProperty("summary", value);
    }

    public java.lang.String getSuperscript() {
        return (java.lang.String)getProperty("superscript");
    }

    public void setSuperscript(java.lang.String value) {
        setProperty("superscript", value);
    }

    public java.lang.String getTableTab() {
        return (java.lang.String)getProperty("tableTab");
    }

    public void setTableTab(java.lang.String value) {
        setProperty("tableTab", value);
    }

    public java.lang.String getTableWizard() {
        return (java.lang.String)getProperty("tableWizard");
    }

    public void setTableWizard(java.lang.String value) {
        setProperty("tableWizard", value);
    }

    public java.lang.String getUnderline() {
        return (java.lang.String)getProperty("underline");
    }

    public void setUnderline(java.lang.String value) {
        setProperty("underline", value);
    }

    public java.lang.String getUnits() {
        return (java.lang.String)getProperty("units");
    }

    public void setUnits(java.lang.String value) {
        setProperty("units", value);
    }

    public java.lang.String getUnlink() {
        return (java.lang.String)getProperty("unlink");
    }

    public void setUnlink(java.lang.String value) {
        setProperty("unlink", value);
    }

    public java.lang.String getViewHtml() {
        return (java.lang.String)getProperty("viewHtml");
    }

    public void setViewHtml(java.lang.String value) {
        setProperty("viewHtml", value);
    }

    public java.lang.String getWidth() {
        return (java.lang.String)getProperty("width");
    }

    public void setWidth(java.lang.String value) {
        setProperty("width", value);
    }

    public java.lang.String getWrapText() {
        return (java.lang.String)getProperty("wrapText");
    }

    public void setWrapText(java.lang.String value) {
        setProperty("wrapText", value);
    }

//<< Attributes

}

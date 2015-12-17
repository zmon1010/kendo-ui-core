
package com.kendoui.taglib.spreadsheet;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.SpreadsheetTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class PdfTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        SpreadsheetTag parent = (SpreadsheetTag)findParentWithClass(SpreadsheetTag.class);


        parent.setPdf(this);

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
        return "spreadsheet-pdf";
    }

    public void setMargin(com.kendoui.taglib.spreadsheet.PdfMarginTag value) {
        setProperty("margin", value);
    }

    public java.lang.String getArea() {
        return (java.lang.String)getProperty("area");
    }

    public void setArea(java.lang.String value) {
        setProperty("area", value);
    }

    public java.lang.String getAuthor() {
        return (java.lang.String)getProperty("author");
    }

    public void setAuthor(java.lang.String value) {
        setProperty("author", value);
    }

    public java.lang.String getCreator() {
        return (java.lang.String)getProperty("creator");
    }

    public void setCreator(java.lang.String value) {
        setProperty("creator", value);
    }

    public java.util.Date getDate() {
        return (java.util.Date)getProperty("date");
    }

    public void setDate(java.util.Date value) {
        setProperty("date", value);
    }

    public java.lang.String getFileName() {
        return (java.lang.String)getProperty("fileName");
    }

    public void setFileName(java.lang.String value) {
        setProperty("fileName", value);
    }

    public boolean getFitWidth() {
        return (Boolean)getProperty("fitWidth");
    }

    public void setFitWidth(boolean value) {
        setProperty("fitWidth", value);
    }

    public boolean getForceProxy() {
        return (Boolean)getProperty("forceProxy");
    }

    public void setForceProxy(boolean value) {
        setProperty("forceProxy", value);
    }

    public boolean getGuidelines() {
        return (Boolean)getProperty("guidelines");
    }

    public void setGuidelines(boolean value) {
        setProperty("guidelines", value);
    }

    public boolean getHcenter() {
        return (Boolean)getProperty("hCenter");
    }

    public void setHcenter(boolean value) {
        setProperty("hCenter", value);
    }

    public java.lang.String getKeywords() {
        return (java.lang.String)getProperty("keywords");
    }

    public void setKeywords(java.lang.String value) {
        setProperty("keywords", value);
    }

    public boolean getLandscape() {
        return (Boolean)getProperty("landscape");
    }

    public void setLandscape(boolean value) {
        setProperty("landscape", value);
    }

    public java.lang.Object getPaperSize() {
        return (java.lang.Object)getProperty("paperSize");
    }

    public void setPaperSize(java.lang.Object value) {
        setProperty("paperSize", value);
    }

    public java.lang.String getProxyTarget() {
        return (java.lang.String)getProperty("proxyTarget");
    }

    public void setProxyTarget(java.lang.String value) {
        setProperty("proxyTarget", value);
    }

    public java.lang.String getProxyURL() {
        return (java.lang.String)getProperty("proxyURL");
    }

    public void setProxyURL(java.lang.String value) {
        setProperty("proxyURL", value);
    }

    public java.lang.String getSubject() {
        return (java.lang.String)getProperty("subject");
    }

    public void setSubject(java.lang.String value) {
        setProperty("subject", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

    public boolean getVcenter() {
        return (Boolean)getProperty("vCenter");
    }

    public void setVcenter(boolean value) {
        setProperty("vCenter", value);
    }

//<< Attributes

}

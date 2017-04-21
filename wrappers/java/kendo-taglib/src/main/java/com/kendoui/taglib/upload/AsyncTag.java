
package com.kendoui.taglib.upload;

import com.kendoui.taglib.BaseTag;

import com.kendoui.taglib.UploadTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AsyncTag extends BaseTag /* interfaces *//* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        UploadTag parent = (UploadTag)findParentWithClass(UploadTag.class);


        parent.setAsync(this);

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
        return "upload-async";
    }

    public float getAutoRetryAfter() {
        return (Float)getProperty("autoRetryAfter");
    }

    public void setAutoRetryAfter(float value) {
        setProperty("autoRetryAfter", value);
    }

    public boolean getAutoUpload() {
        return (Boolean)getProperty("autoUpload");
    }

    public void setAutoUpload(boolean value) {
        setProperty("autoUpload", value);
    }

    public boolean getBatch() {
        return (Boolean)getProperty("batch");
    }

    public void setBatch(boolean value) {
        setProperty("batch", value);
    }

    public float getChunkSize() {
        return (Float)getProperty("chunkSize");
    }

    public void setChunkSize(float value) {
        setProperty("chunkSize", value);
    }

    public boolean getConcurrent() {
        return (Boolean)getProperty("concurrent");
    }

    public void setConcurrent(boolean value) {
        setProperty("concurrent", value);
    }

    public float getMaxAutoRetries() {
        return (Float)getProperty("maxAutoRetries");
    }

    public void setMaxAutoRetries(float value) {
        setProperty("maxAutoRetries", value);
    }

    public java.lang.String getRemoveField() {
        return (java.lang.String)getProperty("removeField");
    }

    public void setRemoveField(java.lang.String value) {
        setProperty("removeField", value);
    }

    public java.lang.String getRemoveUrl() {
        return (java.lang.String)getProperty("removeUrl");
    }

    public void setRemoveUrl(java.lang.String value) {
        setProperty("removeUrl", value);
    }

    public java.lang.String getRemoveVerb() {
        return (java.lang.String)getProperty("removeVerb");
    }

    public void setRemoveVerb(java.lang.String value) {
        setProperty("removeVerb", value);
    }

    public java.lang.String getSaveField() {
        return (java.lang.String)getProperty("saveField");
    }

    public void setSaveField(java.lang.String value) {
        setProperty("saveField", value);
    }

    public java.lang.String getSaveUrl() {
        return (java.lang.String)getProperty("saveUrl");
    }

    public void setSaveUrl(java.lang.String value) {
        setProperty("saveUrl", value);
    }

    public boolean getUseArrayBuffer() {
        return (Boolean)getProperty("useArrayBuffer");
    }

    public void setUseArrayBuffer(boolean value) {
        setProperty("useArrayBuffer", value);
    }

    public boolean getWithCredentials() {
        return (Boolean)getProperty("withCredentials");
    }

    public void setWithCredentials(boolean value) {
        setProperty("withCredentials", value);
    }

//<< Attributes

}

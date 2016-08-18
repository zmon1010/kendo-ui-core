
package com.kendoui.taglib.upload;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.UploadTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class ValidationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        UploadTag parent = (UploadTag)findParentWithClass(UploadTag.class);


        parent.setValidation(this);

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
        return "upload-validation";
    }

    public java.lang.Object getAllowedExtensions() {
        return (java.lang.Object)getProperty("allowedExtensions");
    }

    public void setAllowedExtensions(java.lang.Object value) {
        setProperty("allowedExtensions", value);
    }

    public float getMaxFileSize() {
        return (Float)getProperty("maxFileSize");
    }

    public void setMaxFileSize(float value) {
        setProperty("maxFileSize", value);
    }

    public float getMinFileSize() {
        return (Float)getProperty("minFileSize");
    }

    public void setMinFileSize(float value) {
        setProperty("minFileSize", value);
    }

//<< Attributes

}

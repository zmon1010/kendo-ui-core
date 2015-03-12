
package com.kendoui.taglib.grid;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.GridTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AllowCopyTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        GridTag parent = (GridTag)findParentWithClass(GridTag.class);


        parent.setAllowCopy(this);

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
        return "grid-allowCopy";
    }

    public java.lang.Object getDelimeter() {
        return (java.lang.Object)getProperty("delimeter");
    }

    public void setDelimeter(java.lang.Object value) {
        setProperty("delimeter", value);
    }

//<< Attributes

}

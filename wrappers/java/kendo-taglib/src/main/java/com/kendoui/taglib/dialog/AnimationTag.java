
package com.kendoui.taglib.dialog;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.DialogTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        DialogTag parent = (DialogTag)findParentWithClass(DialogTag.class);


        parent.setAnimation(this);

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
        return "dialog-animation";
    }

    public void setClose(com.kendoui.taglib.dialog.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.dialog.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}

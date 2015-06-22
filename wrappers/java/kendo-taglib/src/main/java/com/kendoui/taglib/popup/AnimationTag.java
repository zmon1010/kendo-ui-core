
package com.kendoui.taglib.popup;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.PopupTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class AnimationTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        PopupTag parent = (PopupTag)findParentWithClass(PopupTag.class);


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
        return "popup-animation";
    }

    public void setClose(com.kendoui.taglib.popup.AnimationCloseTag value) {
        setProperty("close", value);
    }

    public void setOpen(com.kendoui.taglib.popup.AnimationOpenTag value) {
        setProperty("open", value);
    }

//<< Attributes

}

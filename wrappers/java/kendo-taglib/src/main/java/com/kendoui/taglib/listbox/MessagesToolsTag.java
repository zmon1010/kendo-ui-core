
package com.kendoui.taglib.listbox;


import com.kendoui.taglib.BaseTag;






import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesToolsTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MessagesTag parent = (MessagesTag)findParentWithClass(MessagesTag.class);


        parent.setTools(this);

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
        return "listBox-messages-tools";
    }

    public java.lang.String getMoveDown() {
        return (java.lang.String)getProperty("moveDown");
    }

    public void setMoveDown(java.lang.String value) {
        setProperty("moveDown", value);
    }

    public java.lang.String getMoveUp() {
        return (java.lang.String)getProperty("moveUp");
    }

    public void setMoveUp(java.lang.String value) {
        setProperty("moveUp", value);
    }

    public java.lang.String getRemove() {
        return (java.lang.String)getProperty("remove");
    }

    public void setRemove(java.lang.String value) {
        setProperty("remove", value);
    }

    public java.lang.String getTransferAllFrom() {
        return (java.lang.String)getProperty("transferAllFrom");
    }

    public void setTransferAllFrom(java.lang.String value) {
        setProperty("transferAllFrom", value);
    }

    public java.lang.String getTransferAllTo() {
        return (java.lang.String)getProperty("transferAllTo");
    }

    public void setTransferAllTo(java.lang.String value) {
        setProperty("transferAllTo", value);
    }

    public java.lang.String getTransferFrom() {
        return (java.lang.String)getProperty("transferFrom");
    }

    public void setTransferFrom(java.lang.String value) {
        setProperty("transferFrom", value);
    }

    public java.lang.String getTransferTo() {
        return (java.lang.String)getProperty("transferTo");
    }

    public void setTransferTo(java.lang.String value) {
        setProperty("transferTo", value);
    }

//<< Attributes

}

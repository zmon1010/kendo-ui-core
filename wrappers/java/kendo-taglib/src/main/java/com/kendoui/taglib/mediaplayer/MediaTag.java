
package com.kendoui.taglib.mediaplayer;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MediaPlayerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MediaTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MediaPlayerTag parent = (MediaPlayerTag)findParentWithClass(MediaPlayerTag.class);


        parent.setMedia(this);

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
        return "mediaPlayer-media";
    }

    public java.lang.String getSource() {
        return (java.lang.String)getProperty("source");
    }

    public void setSource(java.lang.String value) {
        setProperty("source", value);
    }

    public java.lang.String getTitle() {
        return (java.lang.String)getProperty("title");
    }

    public void setTitle(java.lang.String value) {
        setProperty("title", value);
    }

//<< Attributes

}

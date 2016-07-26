
package com.kendoui.taglib.mediaplayer;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.MediaPlayerTag;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MessagesTag extends  BaseTag  /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag


        MediaPlayerTag parent = (MediaPlayerTag)findParentWithClass(MediaPlayerTag.class);


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
        return "mediaPlayer-messages";
    }

    public java.lang.String getFullscreen() {
        return (java.lang.String)getProperty("fullscreen");
    }

    public void setFullscreen(java.lang.String value) {
        setProperty("fullscreen", value);
    }

    public java.lang.String getMute() {
        return (java.lang.String)getProperty("mute");
    }

    public void setMute(java.lang.String value) {
        setProperty("mute", value);
    }

    public java.lang.String getPause() {
        return (java.lang.String)getProperty("pause");
    }

    public void setPause(java.lang.String value) {
        setProperty("pause", value);
    }

    public java.lang.String getPlay() {
        return (java.lang.String)getProperty("play");
    }

    public void setPlay(java.lang.String value) {
        setProperty("play", value);
    }

    public java.lang.String getQuality() {
        return (java.lang.String)getProperty("quality");
    }

    public void setQuality(java.lang.String value) {
        setProperty("quality", value);
    }

    public java.lang.String getVolume() {
        return (java.lang.String)getProperty("volume");
    }

    public void setVolume(java.lang.String value) {
        setProperty("volume", value);
    }

//<< Attributes

}

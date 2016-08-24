
package com.kendoui.taglib;




import javax.servlet.jsp.JspException;

import com.kendoui.taglib.json.Function;
import com.kendoui.taglib.mediaplayer.EndFunctionTag;
import com.kendoui.taglib.mediaplayer.PauseFunctionTag;
import com.kendoui.taglib.mediaplayer.PlayFunctionTag;
import com.kendoui.taglib.mediaplayer.ReadyFunctionTag;
import com.kendoui.taglib.mediaplayer.TimeChangeFunctionTag;
import com.kendoui.taglib.mediaplayer.VolumeChangeFunctionTag;

@SuppressWarnings("serial")
public class MediaPlayerTag extends WidgetTag /* interfaces *//* interfaces */ {

    public MediaPlayerTag() {
        super("MediaPlayer");
    }
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
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
        return "mediaPlayer";
    }

    public void setMedia(com.kendoui.taglib.mediaplayer.MediaTag value) {
        setProperty("media", value);
    }

    public void setMessages(com.kendoui.taglib.mediaplayer.MessagesTag value) {
        setProperty("messages", value);
    }

    public void setEnd(EndFunctionTag value) {
        setEvent("end", value.getBody());
    }

    public void setPause(PauseFunctionTag value) {
        setEvent("pause", value.getBody());
    }

    public void setPlay(PlayFunctionTag value) {
        setEvent("play", value.getBody());
    }

    public void setReady(ReadyFunctionTag value) {
        setEvent("ready", value.getBody());
    }

    public void setTimeChange(TimeChangeFunctionTag value) {
        setEvent("timeChange", value.getBody());
    }

    public void setVolumeChange(VolumeChangeFunctionTag value) {
        setEvent("volumeChange", value.getBody());
    }

    public boolean getAutoPlay() {
        return (Boolean)getProperty("autoPlay");
    }

    public void setAutoPlay(boolean value) {
        setProperty("autoPlay", value);
    }

    public boolean getAutoRepeat() {
        return (Boolean)getProperty("autoRepeat");
    }

    public void setAutoRepeat(boolean value) {
        setProperty("autoRepeat", value);
    }

    public boolean getForwardSeek() {
        return (Boolean)getProperty("forwardSeek");
    }

    public void setForwardSeek(boolean value) {
        setProperty("forwardSeek", value);
    }

    public boolean getFullScreen() {
        return (Boolean)getProperty("fullScreen");
    }

    public void setFullScreen(boolean value) {
        setProperty("fullScreen", value);
    }

    public boolean getMute() {
        return (Boolean)getProperty("mute");
    }

    public void setMute(boolean value) {
        setProperty("mute", value);
    }

    public boolean getNavigatable() {
        return (Boolean)getProperty("navigatable");
    }

    public void setNavigatable(boolean value) {
        setProperty("navigatable", value);
    }

    public float getVolume() {
        return (Float)getProperty("volume");
    }

    public void setVolume(float value) {
        setProperty("volume", value);
    }

    public String getEnd() {
        Function property = ((Function)getProperty("end"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setEnd(String value) {
        setProperty("end", new Function(value));
    }

    public String getPause() {
        Function property = ((Function)getProperty("pause"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPause(String value) {
        setProperty("pause", new Function(value));
    }

    public String getPlay() {
        Function property = ((Function)getProperty("play"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setPlay(String value) {
        setProperty("play", new Function(value));
    }

    public String getReady() {
        Function property = ((Function)getProperty("ready"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setReady(String value) {
        setProperty("ready", new Function(value));
    }

    public String getTimeChange() {
        Function property = ((Function)getProperty("timeChange"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setTimeChange(String value) {
        setProperty("timeChange", new Function(value));
    }

    public String getVolumeChange() {
        Function property = ((Function)getProperty("volumeChange"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setVolumeChange(String value) {
        setProperty("volumeChange", new Function(value));
    }

//<< Attributes

}

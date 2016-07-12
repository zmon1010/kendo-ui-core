
package com.kendoui.taglib;




import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class MediaPlayerTag extends WidgetTag /* interfaces */implements DataBoundWidget/* interfaces */ {

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

    public boolean getAutoBind() {
        return (Boolean)getProperty("autoBind");
    }

    public void setAutoBind(boolean value) {
        setProperty("autoBind", value);
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

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
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

    public boolean getPlaylist() {
        return (Boolean)getProperty("playlist");
    }

    public void setPlaylist(boolean value) {
        setProperty("playlist", value);
    }

    public float getVolume() {
        return (Float)getProperty("volume");
    }

    public void setVolume(float value) {
        setProperty("volume", value);
    }

//<< Attributes

}

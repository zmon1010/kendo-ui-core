
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

    public void setDataSource(DataSourceTag dataSource) {
        setProperty("dataSource", dataSource);
    }

//<< Attributes

}

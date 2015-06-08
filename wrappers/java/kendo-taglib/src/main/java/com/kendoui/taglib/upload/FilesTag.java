
package com.kendoui.taglib.upload;


import com.kendoui.taglib.BaseTag;



import com.kendoui.taglib.UploadTag;


import java.util.ArrayList;
import java.util.Map;
import java.util.List;

import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class FilesTag extends BaseTag /* interfaces */ /* interfaces */ {
    
    @Override
    public int doEndTag() throws JspException {
//>> doEndTag
//<< doEndTag

        return super.doEndTag();
    }

    @Override
    public void initialize() {
//>> initialize

        files = new ArrayList<Map<String, Object>>();

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

    private List<Map<String, Object>> files;

    public List<Map<String, Object>> files() {
        return files;
    }

    public static String tagName() {
        return "upload-files";
    }

    public void addFile(FileTag value) {
        files.add(value.properties());
    }

//<< Attributes

}

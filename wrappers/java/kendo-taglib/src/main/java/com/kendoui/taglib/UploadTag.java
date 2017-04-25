
package com.kendoui.taglib;


import com.kendoui.taglib.upload.*;


import com.kendoui.taglib.html.Element;
import com.kendoui.taglib.html.Input;
import com.kendoui.taglib.json.Function;


import javax.servlet.jsp.JspException;

@SuppressWarnings("serial")
public class UploadTag extends WidgetTag /* interfaces *//* interfaces */ {

    public UploadTag() {
        super("Upload");
    }
    
    @Override
    public Element<?> createElement() {
        return new Input().attr("name", getName()).attr("type", "file");
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
        return "upload";
    }

    public void setAsync(com.kendoui.taglib.upload.AsyncTag value) {
        setProperty("async", value);
    }

    public void setFiles(FilesTag value) {

        setProperty("files", value.files());

    }

    public void setLocalization(com.kendoui.taglib.upload.LocalizationTag value) {
        setProperty("localization", value);
    }

    public void setValidation(com.kendoui.taglib.upload.ValidationTag value) {
        setProperty("validation", value);
    }

    public void setCancel(CancelFunctionTag value) {
        setEvent("cancel", value.getBody());
    }

    public void setClear(ClearFunctionTag value) {
        setEvent("clear", value.getBody());
    }

    public void setComplete(CompleteFunctionTag value) {
        setEvent("complete", value.getBody());
    }

    public void setError(ErrorFunctionTag value) {
        setEvent("error", value.getBody());
    }

    public void setPause(PauseFunctionTag value) {
        setEvent("pause", value.getBody());
    }

    public void setProgress(ProgressFunctionTag value) {
        setEvent("progress", value.getBody());
    }

    public void setRemove(RemoveFunctionTag value) {
        setEvent("remove", value.getBody());
    }

    public void setResume(ResumeFunctionTag value) {
        setEvent("resume", value.getBody());
    }

    public void setSelect(SelectFunctionTag value) {
        setEvent("select", value.getBody());
    }

    public void setSuccess(SuccessFunctionTag value) {
        setEvent("success", value.getBody());
    }

    public void setUpload(UploadFunctionTag value) {
        setEvent("upload", value.getBody());
    }

    public boolean getDirectory() {
        return (Boolean)getProperty("directory");
    }

    public void setDirectory(boolean value) {
        setProperty("directory", value);
    }

    public boolean getDirectoryDrop() {
        return (Boolean)getProperty("directoryDrop");
    }

    public void setDirectoryDrop(boolean value) {
        setProperty("directoryDrop", value);
    }

    public java.lang.String getDropZone() {
        return (java.lang.String)getProperty("dropZone");
    }

    public void setDropZone(java.lang.String value) {
        setProperty("dropZone", value);
    }

    public boolean getEnabled() {
        return (Boolean)getProperty("enabled");
    }

    public void setEnabled(boolean value) {
        setProperty("enabled", value);
    }

    public boolean getMultiple() {
        return (Boolean)getProperty("multiple");
    }

    public void setMultiple(boolean value) {
        setProperty("multiple", value);
    }

    public boolean getShowFileList() {
        return (Boolean)getProperty("showFileList");
    }

    public void setShowFileList(boolean value) {
        setProperty("showFileList", value);
    }

    public java.lang.String getTemplate() {
        return (java.lang.String)getProperty("template");
    }

    public void setTemplate(java.lang.String value) {
        setProperty("template", value);
    }

    public String getCancel() {
        Function property = ((Function)getProperty("cancel"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setCancel(String value) {
        setProperty("cancel", new Function(value));
    }

    public String getClear() {
        Function property = ((Function)getProperty("clear"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setClear(String value) {
        setProperty("clear", new Function(value));
    }

    public String getComplete() {
        Function property = ((Function)getProperty("complete"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setComplete(String value) {
        setProperty("complete", new Function(value));
    }

    public String getError() {
        Function property = ((Function)getProperty("error"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setError(String value) {
        setProperty("error", new Function(value));
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

    public String getProgress() {
        Function property = ((Function)getProperty("progress"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setProgress(String value) {
        setProperty("progress", new Function(value));
    }

    public String getRemove() {
        Function property = ((Function)getProperty("remove"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setRemove(String value) {
        setProperty("remove", new Function(value));
    }

    public String getResume() {
        Function property = ((Function)getProperty("resume"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setResume(String value) {
        setProperty("resume", new Function(value));
    }

    public String getSelect() {
        Function property = ((Function)getProperty("select"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSelect(String value) {
        setProperty("select", new Function(value));
    }

    public String getSuccess() {
        Function property = ((Function)getProperty("success"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setSuccess(String value) {
        setProperty("success", new Function(value));
    }

    public String getUpload() {
        Function property = ((Function)getProperty("upload"));
        if (property != null) {
            return property.getBody();
        }
        return null;
    }

    public void setUpload(String value) {
        setProperty("upload", new Function(value));
    }

//<< Attributes

}

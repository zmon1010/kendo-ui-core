<?php

namespace Kendo\UI;

class UploadAsync extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The selected files will be uploaded immediately by default. You can change this behavior by setting autoUpload to false.
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function autoUpload($value) {
        return $this->setProperty('autoUpload', $value);
    }

    /**
    * The selected files will be uploaded in separate requests, if this is supported by the browser.
You can change this behavior by setting batch to true, in which case all selected files will be uploaded in one request.The batch mode applies to multiple files, which are selected at the same time.
Files selected one after the other will be uploaded in separate requests.
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function batch($value) {
        return $this->setProperty('batch', $value);
    }

    /**
    * When the property is set the selected files will be uploaded chunk by chunk with the declared size. 
Each request sends a separate file blob and additional string metadata to the server. 
This metadata is a stringified JSON and contains chunkIndex, contentType, totalFileSize, totalChunks, uploadUid properties that
allow validating and combining the file on the server side. The response also returns a JSON object with uploaded and fileUid properties
that notifies the client which should be the next chunk.
    * @param float $value
    * @return \Kendo\UI\UploadAsync
    */
    public function chunkSize($value) {
        return $this->setProperty('chunkSize', $value);
    }

    /**
    * By default the selected files are uploaded one after another. When set to 'true' all 
the selected files start uploading simultaneously.
(The property is available when the async.chunkSize is set.)
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function concurrent($value) {
        return $this->setProperty('concurrent', $value);
    }

    /**
    * It sets the number of attempts that will be performed if an upload is failing.
The property is only used when the async.retryAfter property is also defined.
    * @param float $value
    * @return \Kendo\UI\UploadAsync
    */
    public function maxRetries($value) {
        return $this->setProperty('maxRetries', $value);
    }

    /**
    * If the property is set the failed upload request will be repeated after the declared amount of ticks.
    * @param float $value
    * @return \Kendo\UI\UploadAsync
    */
    public function retryAfter($value) {
        return $this->setProperty('retryAfter', $value);
    }

    /**
    * The name of the form field submitted to the Remove URL.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeField($value) {
        return $this->setProperty('removeField', $value);
    }

    /**
    * The URL of the handler responsible for removing uploaded files (if any). The handler must accept POST
requests containing one or more "fileNames" fields specifying the files to be deleted.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeUrl($value) {
        return $this->setProperty('removeUrl', $value);
    }

    /**
    * The HTTP verb to be used by the remove action.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function removeVerb($value) {
        return $this->setProperty('removeVerb', $value);
    }

    /**
    * The name of the form field submitted to the save URL. The default value is the input name.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function saveField($value) {
        return $this->setProperty('saveField', $value);
    }

    /**
    * The URL of the handler that will receive the submitted files. The handler must accept POST requests
containing one or more fields with the same name as the original input name.
    * @param string $value
    * @return \Kendo\UI\UploadAsync
    */
    public function saveUrl($value) {
        return $this->setProperty('saveUrl', $value);
    }

    /**
    * Controls whether to send credentials (cookies, headers) for cross-site requests.
This option will be ignored if the browser doesn't support File API.
    * @param boolean $value
    * @return \Kendo\UI\UploadAsync
    */
    public function withCredentials($value) {
        return $this->setProperty('withCredentials', $value);
    }

//<< Properties
}

?>

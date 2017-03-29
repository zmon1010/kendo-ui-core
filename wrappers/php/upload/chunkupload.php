<?php
require_once '../lib/Kendo/Autoload.php';

function console_log( $data ){
  echo '<script>';
  echo 'console.log('. $data  .')';
  echo '</script>';
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $type = $_GET['type'];

    if ($type == 'chunksave') {
        $files = $_FILES['files'];

        if(!is_null($_POST['metadata'])){
            $metaData = json_decode($_POST['metadata']);

            // Save the uploaded files
            $file = $files['tmp_name'];

            $content = file_get_contents($file);
        //  file_put_contents( $metaData->fileName, $content, FILE_APPEND);

            $object = new stdClass();
            $object->uploaded = $metaData->totalChunks <= $metaData->chunkIndex;
            $object->fileUid = $metaData->uploadUid;

            $jsonstring = json_encode($object);
            echo $jsonstring;
        } else{
             $files = $_FILES['files'];
            // Save the uploaded files
            /*
            for ($index = 0; $index < count($files['name']); $index++) {
                $file = $files['tmp_name'][$index];
                if (is_uploaded_file($file)) {
                    move_uploaded_file($file, './' . $files['name'][$index]);
                }
            }
            */
        }
        

    } else if ($type == 'remove') {
        $fileNames = $_POST['fileNames'];
        // Delete uploaded files
        /*
        for ($index = 0; $index < count($fileNames); $index++) {
            unlink('./' . $fileNames[$index]);
        }
        */
    }

    // Return an empty string to signify success
    echo '';

    exit;
}
require_once '../include/header.php';
?>
<div class="demo-section k-content">
<div id="example">
    <div>
        <div class="demo-section k-content">
            <input name="files" id="files" type="file" />
        </div>
    </div>
    <script>
                $(document).ready(function() {
                    $("#files").kendoUpload({
                        async: {
                            chunkSize: 11000,// bytes
                            saveUrl: 'chunkupload.php?type=chunksave',
                            removeUrl: 'async.php?type=remove',
                            autoUpload: true
                        }
                    });
                });
    </script>
</div>
</div>
<?php require_once '../include/footer.php'; ?>

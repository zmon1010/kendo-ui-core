<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$media = new \Kendo\UI\MediaPlayerMedia('MediaPlayerMedia') ;
$media ->source("https://www.youtube.com/watch?v=gNlya720gbk");
$media ->title("Digital Transformation: A New Way of Thinking");
$mediaPlayer = new \Kendo\UI\MediaPlayer('MediaPlayer') ;
$mediaPlayer->media($media)
            ->play('onPlay')
            ->pause('onPause')
            ->end('onEnd')
            ->ready('onReady')
            ->timeChange('onTimeChange')
            ->volumeChange('onVolumeChange');
$mediaPlayer->autoPlay(true);
?>

<div class="demo-section k-content wide">
<?php
echo $mediaPlayer->render();
?>
</div>

<div class="demo-section">
    <h3 class="title">Console log</h3>
    <div class="console"></div>
</div>

<script>
    function onPlay() {
        kendoConsole.log("event :: play");
    }

    function onPause() {
        kendoConsole.log("event :: pause");
    }

    function onEnd() {
        kendoConsole.log("event :: end");
    }

    function onReady() {
        kendoConsole.log("event :: ready");
    }

    function onTimeChange() {
        kendoConsole.log("event :: timeChange");
    }

    function onVolumeChange() {
        kendoConsole.log("event :: volumeChange");
    }
</script>
<style>
    .k-mediaplayer {
        margin: 0 auto;
        width: 640px;
        height: 360px;
    }
</style>  
<?php require_once '../include/footer.php'; ?>

<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$media = new \Kendo\UI\MediaPlayerMedia('MediaPlayerMedia') ;
$media ->source("https://www.youtube.com/watch?v=gNlya720gbk");
$media ->title("Digital Transformation: A New Way of Thinking");
$mediaPlayer = new \Kendo\UI\MediaPlayer('MediaPlayer') ;
$mediaPlayer->media($media);
$mediaPlayer->autoPlay(true);
$mediaPlayer->navigatable(true);

echo $mediaPlayer->render();
?>

<?php require_once '../include/footer.php'; ?>

<style>
    .k-mediaplayer {
        float: left;
        width: 640px;
        height: 360px;
    }
</style>
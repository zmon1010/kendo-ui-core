<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$media = new \Kendo\UI\MediaPlayerMedia('MediaPlayerMedia') ;
$media ->source("../content/web/mediaplayer/Video1.mp4");
$media ->title("Digital Transformation: A New Way of Thinking");
$mediaPlayer = new \Kendo\UI\MediaPlayer('MediaPlayer') ;
$mediaPlayer->media($media);
$mediaPlayer->autoPlay(true);

echo $mediaPlayer->render();
?>

<?php require_once '../include/footer.php'; ?>


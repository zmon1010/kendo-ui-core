<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$data = array(
          array('url' => '../content/web/mediaplayer/Video1.mp4', 'title' => "Digital Transformation: A New Way of Thinking",'poster' => "../content/web/mediaplayer/Video1.jpg"),
          array('url' => '../content/web/mediaplayer/Video2.mp4', 'title' => "Learn How York Solved Its Database Problem",'poster' => "../content/web/mediaplayer/Video2.jpg"),
          array('url' => '../content/web/mediaplayer/Video3.mp4', 'title' => "A Clear Vision for Digital Transformation",'poster' => "../content/web/mediaplayer/Video3.jpg")
      );

$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($data);

$mediaPlayer = new \Kendo\UI\MediaPlayer('MediaPlayer') ;
$mediaPlayer->dataSource($dataSource);
$mediaPlayer->autoPlay(true);
$mediaPlayer->playlist(true);

echo $mediaPlayer->render();
?>

<?php require_once '../include/footer.php'; ?>


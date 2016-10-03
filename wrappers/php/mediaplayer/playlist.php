<?php
require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

$mediaPlayer = new \Kendo\UI\MediaPlayer('mediaPlayer');
$mediaPlayer->autoPlay(true);
?>

<div class="demo-section k-content wide" style="max-width: 925px;">
<?php
echo $mediaPlayer->render();

$data = array(
          array('source' => 'https://www.youtube.com/watch?v=N3P6MyvL-t4', 'title' => "Telerik Platform - Enterprise Mobility. Unshackled.",'poster' => "http://img.youtube.com/vi/N3P6MyvL-t4/1.jpg"),
          array('source' => 'https://www.youtube.com/watch?v=_S63eCewxRg', 'title' => "Learn How York Solved Its Database Problem",'poster' => "http://img.youtube.com/vi/_S63eCewxRg/1.jpg"),
          array('source' => 'https://www.youtube.com/watch?v=DYsiJRmIQZw', 'title' => "Responsive Website Delivers for Reeves Import Motorcars",'poster' => "http://img.youtube.com/vi/DYsiJRmIQZw/1.jpg"),
          array('source' => 'https://www.youtube.com/watch?v=gNlya720gbk', 'title' => "Digital Transformation: A New Way of Thinking",'poster' => "http://img.youtube.com/vi/gNlya720gbk/1.jpg"),
          array('source' => 'https://www.youtube.com/watch?v=rLtTuFbuf1c', 'title' => "Take a Tour of the Telerik Platform",'poster' => "http://img.youtube.com/vi/rLtTuFbuf1c/1.jpg"),
          array('source' => 'https://www.youtube.com/watch?v=CpHKm2NruYc', 'title' => "Why Telerik Analytics - Key Benefits for your applications",'poster' => "https://i.ytimg.com/vi/CpHKm2NruYc/1.jpg")
      );
$dataSource = new \Kendo\Data\DataSource();
$dataSource->data($data);

$listview = new \Kendo\UI\ListView('listView');
$listview->dataSource($dataSource)
            ->selectable(true)
            ->templateId('template')
            ->dataBound("onDataBound")
            ->change("onChange");
            
echo "<div class='k-list-container playlist'>";
echo $listview->render();
echo "</div>";
?>
</div>

<script type="text/x-kendo-template" id="template">
    <div class="k-item k-state-default" onmouseover="$(this).addClass('k-state-hover')"
        onmouseout="$(this).removeClass('k-state-hover')">
        <span>
            <img src="#:poster#" />
            <h5>#:title#</h5>
        </span>
    </div>
</script>

<script>
    function onChange() {
        var index = this.select().index();
        var dataItem = this.dataSource.view()[index];
        $("#mediaPlayer").data("kendoMediaPlayer").media(dataItem);
    }

    function onDataBound() {
        this.select(this.element.children().first());
    }
</script>

<style>
    .k-mediaplayer {
        float: left;
        height: 360px;
        box-sizing: border-box;
        width: 70%;
    }
    .playlist {
        float: left;
        height: 360px;
        overflow: auto;
        width: 30%;
    }
    @media(max-width: 800px) {
        .playlist,
        .k-mediaplayer {
            width: 100%;
        }
    }
    .playlist .k-item {
        border-bottom-style: solid;
        border-bottom-width: 1px;
        padding: 14px 15px;
    }
    .playlist .k-item:last-child {
        border-bottom-width: 0;
    }
    .playlist span {
        cursor: pointer;
        display: block;
        overflow: hidden;
        text-decoration: none;
    }
    .playlist span img {
        border: 0 none;
        display: block;
        height: 56px;
        object-fit: cover;
        width: 100px;
        float: left;
    }
    .playlist h5 {
        display: block;
        font-weight: normal;
        margin: 0;
        overflow: hidden;
        padding-left: 10px;
        text-align: left;
    }
</style>

<?php require_once '../include/footer.php'; ?>
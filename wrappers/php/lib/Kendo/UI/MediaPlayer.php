<?php

namespace Kendo\UI;

class MediaPlayer extends \Kendo\UI\Widget {
    public function name() {
        return 'MediaPlayer';
    }
//>> Properties

    /**
    * Sets the data source of the MediaPlayer.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }


//<< Properties
}

?>

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

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
data source is fired.
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * If set to true the widget will start playing the video\vidoes after initializing
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function autoPlay($value) {
        return $this->setProperty('autoPlay', $value);
    }

    /**
    * If set to true the widget will start playing the video\vidoes after initializing
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function autoRepeat($value) {
        return $this->setProperty('autoRepeat', $value);
    }

    /**
    * A value between 0 and 100 that specifies the volume of the video
    * @param float $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function volume($value) {
        return $this->setProperty('volume', $value);
    }

    /**
    * If set to true the widget will enter in full-sreen mode
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function fullScreen($value) {
        return $this->setProperty('fullScreen', $value);
    }

    /**
    * If set to true the video will be played without sound
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function mute($value) {
        return $this->setProperty('mute', $value);
    }

    /**
    * If set to true the fowr
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function forwardSeek($value) {
        return $this->setProperty('forwardSeek', $value);
    }

    /**
    * If set to true a playlist for the videos inside the data source will be created
    * @param boolean $value
    * @return \Kendo\UI\MediaPlayer
    */
    public function playlist($value) {
        return $this->setProperty('playlist', $value);
    }


//<< Properties
}

?>

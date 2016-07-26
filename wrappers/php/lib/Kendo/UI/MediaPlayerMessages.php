<?php

namespace Kendo\UI;

class MediaPlayerMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Pause button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function pause($value) {
        return $this->setProperty('pause', $value);
    }

    /**
    * Play button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function play($value) {
        return $this->setProperty('play', $value);
    }

    /**
    * Volume/Mute button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function mute($value) {
        return $this->setProperty('mute', $value);
    }

    /**
    * Volume slider button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function volume($value) {
        return $this->setProperty('volume', $value);
    }

    /**
    * Quality button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function quality($value) {
        return $this->setProperty('quality', $value);
    }

    /**
    * Fullscreen button tooltip message
    * @param string $value
    * @return \Kendo\UI\MediaPlayerMessages
    */
    public function fullscreen($value) {
        return $this->setProperty('fullscreen', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class EditorResizable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The minimum height that the editor can be resized to.
    * @param float $value
    * @return \Kendo\UI\EditorResizable
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * The maximum height that the editor can be resized to.
    * @param float $value
    * @return \Kendo\UI\EditorResizable
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

//<< Properties
}

?>

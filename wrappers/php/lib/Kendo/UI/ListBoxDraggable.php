<?php

namespace Kendo\UI;

class ListBoxDraggable extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Provides a way for customization of the draggable item hint. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If hint is not provided the widget will clone dragged item and use it as a hint.
    * @param \Kendo\JavaScriptFunction|string| $value
    * @return \Kendo\UI\ListBoxDraggable
    */
    public function hint($value) {
        return $this->setProperty('hint', $value);
    }

    /**
    * Provides a way for customization of the ListBox item placeholder. If a function is supplied, it receives one argument - the draggable element's jQuery object.
If placeholder is not provided the widget will clone dragged item, remove its ID attribute, set its visibility to hidden and use it as a placeholder.
    * @param \Kendo\JavaScriptFunction|string| $value
    * @return \Kendo\UI\ListBoxDraggable
    */
    public function placeholder($value) {
        return $this->setProperty('placeholder', $value);
    }

//<< Properties
}

?>

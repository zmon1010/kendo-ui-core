<?php

namespace Kendo\UI;

class ListBoxToolbar extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The relative position of the ListBox element at which the toolbar will be displayed. The possible values are "left", "right", "top", and "bottom".
    * @param string $value
    * @return \Kendo\UI\ListBoxToolbar
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * A collection of tools that are used to interact with the ListBox.The built-in tools are:
    * @param array $value
    * @return \Kendo\UI\ListBoxToolbar
    */
    public function tools($value) {
        return $this->setProperty('tools', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class ListBoxToolbar extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The position relative to the ListBox element, at which the toolbar will be shown. Predefined values are "bottom", "top", "left", "right".
    * @param string $value
    * @return \Kendo\UI\ListBoxToolbar
    */
    public function position($value) {
        return $this->setProperty('position', $value);
    }

    /**
    * An Array value with the list of tools displayed in the ListBox's Toolbar. Tools are built-in ("moveUp", "moveDown", "remove", "transferAllFrom", "transferAllTo", "transferFrom", "transferTo").The "moveUp" tool moves up the item that is currently selected by the end user.The "moveDown" tool moves down the item that is currently selected by the end user.The "remove" tool removes the item(s) that are currently selected by the end user.The "transferAllFrom" tool moves all items from current ListBox widget to the target widget related with connectWith option.The "transferAllTo" tool moves all items from target widget related with connectWith option to the current ListBox widget.The "transferFrom" tool moves all selected items from current ListBox widget to the target widget related with connectWith option.The "transferTo" tool moves all selected items from target widget related with connectWith option to the current ListBox widget.
    * @param array $value
    * @return \Kendo\UI\ListBoxToolbar
    */
    public function tools($value) {
        return $this->setProperty('tools', $value);
    }

//<< Properties
}

?>

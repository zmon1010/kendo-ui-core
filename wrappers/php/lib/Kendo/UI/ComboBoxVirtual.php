<?php

namespace Kendo\UI;

class ComboBoxVirtual extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Specifies the height of the virtual item. If not specified the framework will automatically calculate the itemHeight based on the theme used.
    * @param float $value
    * @return \Kendo\UI\ComboBoxVirtual
    */
    public function itemHeight($value) {
        return $this->setProperty('itemHeight', $value);
    }

    /**
    * Sets the valueMapper option of the ComboBoxVirtual.
    * Required!
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ComboBoxVirtual
    */
    public function valueMapper($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('valueMapper', $value);
    }

//<< Properties
}

?>

<?php

namespace Kendo\UI;

class Alert extends \Kendo\UI\Widget {
    public function name() {
        return 'Alert';
    }
//>> Properties

    /**
    * Defines the text of the labels that are shown within the alert dialog. Used primarily for localization.
    * @param \Kendo\UI\AlertMessages|array $value
    * @return \Kendo\UI\Alert
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }


//<< Properties
}

?>

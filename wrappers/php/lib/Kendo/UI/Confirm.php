<?php

namespace Kendo\UI;

class Confirm extends \Kendo\UI\Widget {
    public function name() {
        return 'Confirm';
    }
//>> Properties

    /**
    * Defines the text of the labels that are shown within the confirm dialog. Used primarily for localization.
    * @param \Kendo\UI\ConfirmMessages|array $value
    * @return \Kendo\UI\Confirm
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }


//<< Properties
}

?>

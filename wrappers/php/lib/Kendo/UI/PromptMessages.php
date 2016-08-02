<?php

namespace Kendo\UI;

class PromptMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The title of the OK button.
    * @param string $value
    * @return \Kendo\UI\PromptMessages
    */
    public function okText($value) {
        return $this->setProperty('okText', $value);
    }

    /**
    * The title of the Cancel button.
    * @param string $value
    * @return \Kendo\UI\PromptMessages
    */
    public function cancel($value) {
        return $this->setProperty('cancel', $value);
    }

//<< Properties
}

?>

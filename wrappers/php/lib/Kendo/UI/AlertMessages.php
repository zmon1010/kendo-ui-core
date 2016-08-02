<?php

namespace Kendo\UI;

class AlertMessages extends \Kendo\SerializableObject {
//>> Properties

    /**
    * The title of the OK button.
    * @param string $value
    * @return \Kendo\UI\AlertMessages
    */
    public function okText($value) {
        return $this->setProperty('okText', $value);
    }

//<< Properties
}

?>

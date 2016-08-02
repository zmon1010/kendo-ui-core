<?php

namespace Kendo\UI;

class Prompt extends \Kendo\UI\Widget {
    public function name() {
        return 'Prompt';
    }
//>> Properties

    /**
    * Defines the text of the labels that are shown within the prompt dialog. Used primarily for localization.
    * @param \Kendo\UI\PromptMessages|array $value
    * @return \Kendo\UI\Prompt
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }


//<< Properties
}

?>

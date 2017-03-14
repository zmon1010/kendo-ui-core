<?php

namespace Kendo\UI;

class DateInput extends \Kendo\UI\Widget {
    public function name() {
        return 'DateInput';
    }
//>> Properties

    /**
    * Specifies the format, which is used to format the value of the DateInput displayed in the input. The format also will be used to parse the input.
    * @param string $value
    * @return \Kendo\UI\DateInput
    */
    public function format($value) {
        return $this->setProperty('format', $value);
    }

    /**
    * Specifies the maximum date, which the calendar can show.
    * @param date $value
    * @return \Kendo\UI\DateInput
    */
    public function max($value) {
        return $this->setProperty('max', $value);
    }

    /**
    * Specifies the minimum date that the calendar can show.
    * @param date $value
    * @return \Kendo\UI\DateInput
    */
    public function min($value) {
        return $this->setProperty('min', $value);
    }

    /**
    * Specifies the selected date.
    * @param date $value
    * @return \Kendo\UI\DateInput
    */
    public function value($value) {
        return $this->setProperty('value', $value);
    }

    /**
    * Sets the change event of the DateInput.
    * Fires when the selected date is changed
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\DateInput
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }


//<< Properties
}

?>

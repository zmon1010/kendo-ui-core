<?php

namespace Kendo\UI;

class ListBox extends \Kendo\UI\Widget {
    public function name() {
        return 'ListBox';
    }

    protected function createElement() {
        return new \Kendo\Html\Element('select');
    }
//>> Properties

    /**
    * If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the data source is fired. By default the widget will bind to the data source specified in the configuration.
    * @param boolean $value
    * @return \Kendo\UI\ListBox
    */
    public function autoBind($value) {
        return $this->setProperty('autoBind', $value);
    }

    /**
    * A selector which determines that the target ListBox should be used when items are transferred from and to the current ListBox. The connectWith option defines one-way relationship - if the developer wants a two-way connection, then the connectWith option should be set on both widgets.
    * @param string $value
    * @return \Kendo\UI\ListBox
    */
    public function connectWith($value) {
        return $this->setProperty('connectWith', $value);
    }

    /**
    * Sets the data source of the ListBox.
    * @param array|\Kendo\Data\DataSource $value
    * @return \Kendo\UI\ListBox
    */
    public function dataSource($value) {
        return $this->setProperty('dataSource', $value);
    }

    /**
    * The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.
    * @param string $value
    * @return \Kendo\UI\ListBox
    */
    public function dataTextField($value) {
        return $this->setProperty('dataTextField', $value);
    }

    /**
    * The field of the data item that provides the value of the widget.
    * @param string $value
    * @return \Kendo\UI\ListBox
    */
    public function dataValueField($value) {
        return $this->setProperty('dataValueField', $value);
    }

    /**
    * Indicates if the widget items can be draged and droped.
    * @param boolean|\Kendo\UI\ListBoxDraggable|array $value
    * @return \Kendo\UI\ListBox
    */
    public function draggable($value) {
        return $this->setProperty('draggable', $value);
    }

    /**
    * Array of id strings which determines the ListBox widgets that can drag and drop their items to the current ListBox widget. The dropSources option describes one way relationship, if the developer wants a two way connection then the dropSources option should be set on both widgets.
    * @param array $value
    * @return \Kendo\UI\ListBox
    */
    public function dropSources($value) {
        return $this->setProperty('dropSources', $value);
    }

    /**
    * Indicates whether keyboard navigation is enabled/disabled.
    * @param boolean $value
    * @return \Kendo\UI\ListBox
    */
    public function navigatable($value) {
        return $this->setProperty('navigatable', $value);
    }

    /**
    * Defines the localization texts for the ListBox. Used primarily for localization.
    * @param \Kendo\UI\ListBoxMessages|array $value
    * @return \Kendo\UI\ListBox
    */
    public function messages($value) {
        return $this->setProperty('messages', $value);
    }

    /**
    * Indicates whether selection is single or multiple. Possible values:
    * @param string $value
    * @return \Kendo\UI\ListBox
    */
    public function selectable($value) {
        return $this->setProperty('selectable', $value);
    }

    /**
    * Sets the template option of the ListBox.
    * Specifies ListBox item template.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function template($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('template', $value);
    }

    /**
    * Defines settings for displaying a toolbar for the ListBox widget, which allows a set of predefined actions to be executed. By default, the toolbar isn't shown. Populating the tools array will show the toolbar and the corresponding tools.
    * @param \Kendo\UI\ListBoxToolbar|array $value
    * @return \Kendo\UI\ListBox
    */
    public function toolbar($value) {
        return $this->setProperty('toolbar', $value);
    }

    /**
    * Sets the add event of the ListBox.
    * Fires before an item is added to the ListBox.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function addEvent($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('add', $value);
    }

    /**
    * Sets the change event of the ListBox.
    * Fires when the ListBox selection has changed.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function change($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('change', $value);
    }

    /**
    * Sets the dataBound event of the ListBox.
    * Fires when the ListBox has received data from the data source and it is already rendered.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function dataBound($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dataBound', $value);
    }

    /**
    * Sets the dragstart event of the ListBox.
    * Fires when ListBox item(s) drag starts.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function dragstart($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragstart', $value);
    }

    /**
    * Sets the drag event of the ListBox.
    * Fires when ListBox's placeholder changes its position.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function drag($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drag', $value);
    }

    /**
    * Sets the drop event of the ListBox.
    * Fired when ListBox item is dropped over one of the drop targets.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function drop($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('drop', $value);
    }

    /**
    * Sets the dragend event of the ListBox.
    * Fires when item dragging ends but before the item's position is changed in the DOM. This event is suitable for preventing the drag action.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function dragend($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('dragend', $value);
    }

    /**
    * Sets the remove event of the ListBox.
    * Fires before an item is removed from the ListBox.The event handler function context (available via the this keyword) will be set to the widget instance.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function remove($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('remove', $value);
    }

    /**
    * Sets the reorder event of the ListBox.
    * Fires when items in the widget are reordered.
    * @param string|\Kendo\JavaScriptFunction $value Can be a JavaScript function definition or name.
    * @return \Kendo\UI\ListBox
    */
    public function reorder($value) {
        if (is_string($value)) {
            $value = new \Kendo\JavaScriptFunction($value);
        }

        return $this->setProperty('reorder', $value);
    }


//<< Properties
}

?>

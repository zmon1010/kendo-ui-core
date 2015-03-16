<?php

namespace Kendo\Dataviz\UI;

class DiagramConnectionDefaults extends \Kendo\SerializableObject {
//>> Properties

    /**
    * Defines the label displayed on the connection path.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsContent|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function content($value) {
        return $this->setProperty('content', $value);
    }

    /**
    * Defines the editing behavior of the connections.
    * @param boolean|\Kendo\Dataviz\UI\DiagramConnectionDefaultsEditable|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function editable($value) {
        return $this->setProperty('editable', $value);
    }

    /**
    * The connection end cap fill options or color.
    * @param string|\Kendo\Dataviz\UI\DiagramConnectionDefaultsEndCap.fill|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function endCap.fill($value) {
        return $this->setProperty('endCap.fill', $value);
    }

    /**
    * The connection end cap stroke options or color.
    * @param string|\Kendo\Dataviz\UI\DiagramConnectionDefaultsEndCap.stroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function endCap.stroke($value) {
        return $this->setProperty('endCap.stroke', $value);
    }

    /**
    * Defines the hover configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsHover|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function hover($value) {
        return $this->setProperty('hover', $value);
    }

    /**
    * Defines the connection selection configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsSelection|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function selection($value) {
        return $this->setProperty('selection', $value);
    }

    /**
    * The connection start cap configuration or type name.
    * @param string|\Kendo\Dataviz\UI\DiagramConnectionDefaultsStartCap|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function startCap($value) {
        return $this->setProperty('startCap', $value);
    }

    /**
    * Defines the stroke configuration.
    * @param \Kendo\Dataviz\UI\DiagramConnectionDefaultsStroke|array $value
    * @return \Kendo\Dataviz\UI\DiagramConnectionDefaults
    */
    public function stroke($value) {
        return $this->setProperty('stroke', $value);
    }

//<< Properties
}

?>

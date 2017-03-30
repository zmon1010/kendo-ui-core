<?php

require_once '../lib/Kendo/Autoload.php';
require_once '../include/header.php';
?>
 <div class="demo-section k-content">
    <h4>Select date</h4>
<?php
$dateInput = new \Kendo\UI\DateInput('dateinput');
$dateInput->change('change');

echo $dateInput->render();
?>
<div class="box">                
     <h4>Console log</h4>
     <div class="console"></div>
</div>
<script>
    function open() {
        kendoConsole.log("Open");
    }

    function close() {
        kendoConsole.log("Close");
    }

    function change() {
        kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));
    }
</script>
<?php require_once '../include/footer.php'; ?>

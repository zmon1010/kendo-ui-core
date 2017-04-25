<?php

require_once '../lib/Kendo/Autoload.php';

require_once '../include/header.php';

?>

<div id="example" role="application">
    <div class="demo-section k-content wide">
<?php
    $attendees = array(
        "Steven White",
        "Nancy King",
        "Nancy Davolio",
        "Robert Davolio",
        "Michael Leverling",
        "Andrew Callahan",
        "Michael Suyama"
    );

    $listBoxToolbar = new \Kendo\UI\ListBoxToolbar();
    $listBoxToolbar->position("right");
    $listBoxToolbar->tools(array("moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom"));

    $listBoxOptional = new \Kendo\UI\ListBox('optional');

    $listBoxOptional->toolbar($listBoxToolbar)
                    ->dataSource($attendees)
                    ->connectWith("#selected");

    echo $listBoxOptional->render();

    $listBoxSelected = new \Kendo\UI\ListBox('selected');
    $listBoxSelected->dataSource(array())
                    ->selectable("multiple");

    echo $listBoxSelected->render();
?>
    </div>
</div>

<style>
    #example .demo-section {
        max-width: none;
        width: 515px;
    }

    #example .k-listbox {
        width: 236px;
        height: 310px;
    }

    #example .k-listbox:first-child {
        width: 270px;
        margin-right: 1px;
    }
</style>
<?php require_once '../include/footer.php'; ?>
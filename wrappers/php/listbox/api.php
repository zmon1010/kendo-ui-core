<?php

require_once '../lib/DataSourceResult.php';
require_once '../lib/Kendo/Autoload.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    header('Content-Type: application/json');

    $result = new DataSourceResult('sqlite:..//sample.db');
    $result = $result->read('Products', array('ProductID', 'ProductName'));
    echo json_encode($result['data'], JSON_NUMERIC_CHECK);

    exit;
}

require_once '../include/header.php';

?>

<div id="example" role="application">
    <div class="demo-section k-content">
<?php
    $dataSource = new \Kendo\Data\DataSource();

    $transport = new \Kendo\Data\DataSourceTransport();

    $read = new \Kendo\Data\DataSourceTransportRead();

    $read->url('api.php?type=read')
         ->contentType('application/json')
         ->type('POST');

    $transport->read($read);

    $dataSource->transport($transport)
               ->pageSize(10);

    $listbox1 = new \Kendo\UI\ListBox('listbox1');
    $listbox1->dataSource($dataSource)
             ->connectWith("listbox2")
             ->dataValueField("ProductID")
             ->dataTextField("ProductName");

    echo $listbox1->render();

    $listbox2 = new \Kendo\UI\ListBox('listbox2');

    $listbox2->dataSource(array())
             ->dataValueField("ProductID")
             ->dataTextField("ProductName");

    echo $listbox2->render();
?>
    </div>
</div>

<div class="demo-section box wide">
    <div class="box-col">
        <h4>Transfer items</h4>
        <ul class="options">
            <li>
                <button id="transfer" class="k-button">Transfer</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Reorder items</h4>
        <ul class="options">
            <li>
                <button id="reorder" class="k-button">Reorder</button>
            </li>
        </ul>
    </div>
    <div class="box-col">
        <h4>Enable / Disable items</h4>
        <ul class="options">
            <li>
                <button id="enable" class="k-button">Enable</button>
                <button id="disable" class="k-button">Disable</button>
            </li>
        </ul>
    </div>
</div>

<script>
    $(document).ready(function () {
        $("#transfer").click(function () {
            var listbox1 = $("#listbox1").data("kendoListBox");
            var listbox2 = $("#listbox2").data("kendoListBox");
            if (!listbox1.wrapper.find(".k-item:first").hasClass("k-state-disabled")) {
                if (listbox1.select().length > 0) { //Transfer selected item
                    listbox2.add(listbox1.dataItem(listbox1.select()));
                    listbox1.remove(listbox1.select());
                }
                else { //Transfer first item if there is no selection
                    listbox2.add(listbox1.dataItem($(".k-item:first")));
                    listbox1.remove($(".k-item:first"));
                }
            }
        });

        $("#reorder").click(function () {
            var listbox1 = $("#listbox1").data("kendoListBox");
            if (!listbox1.wrapper.find(".k-item:first").hasClass("k-state-disabled")) {
                if (listbox1.select().length > 0) { //Move selected item at the end
                    listbox1.reorder(listbox1.select(), listbox1.items().length - 1);
                }
                else { //Move the fisrt item at the end if there is no selection
                    listbox1.reorder(".k-item:first", listbox1.items().length - 1);
                }
            }
        });

        $("#enable").click(function () {
            $("#listbox1").data("kendoListBox").enable(".k-item", true);
        });

        $("#disable").click(function () {
            $("#listbox1").data("kendoListBox").enable(".k-item", false);
        });
    });
</script>

<style>
    #example .demo-section {
        max-width: none;
        width: 515px;
    }

    #example .k-listbox {
        width: 255px;
        height: 310px;
    }

    #example .k-listbox:first-child {
        margin-right: 1px;
    }
</style>
<?php require_once '../include/footer.php'; ?>
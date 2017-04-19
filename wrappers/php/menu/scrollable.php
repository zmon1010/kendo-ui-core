<?php

require_once '../include/header.php';
require_once '../lib/Kendo/Autoload.php';

?>
<div class="demo-section k-content">
        <h4>Scrollable menu</h4>
<?php
    $menu = new \Kendo\UI\Menu('menu');

    $menu->scrollable(true);

    $first = new \Kendo\UI\MenuItem("First Item");
    $first->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4"),
        new \Kendo\UI\MenuItem("Sub Item 5")
    );
    $menu->addItem($first);

    $second = new \Kendo\UI\MenuItem("Second Item");
    $second->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4"),
        new \Kendo\UI\MenuItem("Sub Item 5")
    );
    $menu->addItem($second);

    $third = new \Kendo\UI\MenuItem("Third Item");
    $menu->addItem($third);
    
    $fourth = new \Kendo\UI\MenuItem("Fourth Item");
    $fourth->addItem(
        new \Kendo\UI\MenuItem("Sub Item 1"),
        new \Kendo\UI\MenuItem("Sub Item 2"),
        new \Kendo\UI\MenuItem("Sub Item 3"),
        new \Kendo\UI\MenuItem("Sub Item 4"),
        new \Kendo\UI\MenuItem("Sub Item 5")
    );
    $menu->addItem($fourth);
    
    $fifth = new \Kendo\UI\MenuItem("Fifth Item");
    $menu->addItem($fifth);

    echo $menu->render();
?>

</div>

<?php require_once '../include/footer.php'; ?>
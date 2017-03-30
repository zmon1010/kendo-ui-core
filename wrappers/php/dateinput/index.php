<?php

require_once '../lib/Kendo/Autoload.php';
require_once '../include/header.php';
?>
<div class="demo-section k-content">
        <h4>Show e-mails from:</h4>
<?php
$dateInput = new \Kendo\UI\DateInput('dateinput');

$dateInput->value(new DateTime('10/10/2011', new DateTimeZone('UTC')))
           ->attr('style', 'width: 100%');

echo $dateInput->render();
?>
<h4 style="margin-top: 2em;">Add to archive mail from:</h4>

<?php
$dateinput2 = new \Kendo\UI\DateInput('dateinput2');

$dateinput2->format('MMMM yyyy')
            ->attr('style', 'width: 100%');

echo $dateinput2->render();
?>
</div>
<?php require_once '../include/footer.php'; ?>

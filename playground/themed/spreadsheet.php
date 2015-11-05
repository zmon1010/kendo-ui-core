<?php include("header.php") ?>

<style>
    #spreadsheet { width: 390px; height: 290px; }
</style>

<div id='spreadsheet'></div>
<script>
    var spread = $('#spreadsheet').kendoSpreadsheet({ rows: 4, columns: 4 }).getKendoSpreadsheet();
    var sheet = spread.activeSheet();

    sheet.range("A1").value(123);
</script>

<?php include("footer.php") ?>

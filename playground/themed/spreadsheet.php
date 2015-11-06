<?php include("header.php") ?>

<style>
    #spreadsheet { width: auto; height: 100%; }
</style>

<div id='spreadsheet'></div>
<script>
    var spread = $('#spreadsheet').kendoSpreadsheet({ rows: 4, columns: 4 }).getKendoSpreadsheet();
    var sheet = spread.activeSheet();

    sheet.range("A1").value(123);
</script>

<?php include("footer.php") ?>

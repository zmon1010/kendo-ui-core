<?php
    $theme = $_REQUEST["theme"];

    $common = "common";

    if (preg_match('/material/i', $theme)) {
        $common .= "-material";
    } else if (preg_match('/fiori/i', $theme)) {
        $common .= "-fiori";
    } else if (preg_match('/bootstrap/i', $theme)) {
        $common .= "-bootstrap";
    } else if (preg_match('/office365/i', $theme)) {
        $common .= "-office365";
    } else if (preg_match('/nova/i', $theme)) {
        $common .= "-nova";
    }
?>
<!doctype html>
<html>
<head>
    <link rel='stylesheet' href='../../dist/styles/web/kendo.<?= $common ?>.css' />
    <link rel='stylesheet' href='../../dist/styles/web/kendo.<?= $theme ?>.css' />

    <script src='../../dist/js/jquery.js'></script>
    <script src='../../dist/js/kendo.web.js'></script>

    <style>
        html,body { margin: 0; padding: 0; overflow: hidden; }
        body { font: 14px/1.5 Arial, Helvetica, sans-serif; }
    </style>
</head>
<body>


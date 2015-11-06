<?php include("header.php") ?>

<style>
    .k-widget.k-editor {
        height: 70px;
        margin: 0 0 10px;
        width: 100%;
        box-sizing: border-box;
    }
</style>

<textarea id="sandboxed"></textarea>

<div contentEditable id="inline"></div>

<script>
    var tools = [ "bold", "italic", "foreColor", "createLink" ];
    $("#sandboxed").kendoEditor({
        tools: tools,
        value: "<p>foo</p>"
    });

    $("#inline").kendoEditor({
        tools: tools,
        value: "<p>bar</p>"
    });
</script>

<?php include("footer.php") ?>

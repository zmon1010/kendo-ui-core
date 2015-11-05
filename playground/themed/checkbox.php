<?php include("header.php") ?>

<style>
    div {
        padding: .5em 2em;
    }
</style>

<div class="k-content">
    <div>
        <input class="k-checkbox" type="checkbox" id="c1">
        <label class="k-checkbox-label" for="c1">Label</label>
    </div>

    <div>
        <input class="k-checkbox" type="checkbox" id="c2" checked>
        <label class="k-checkbox-label" for="c2">Label</label>
    </div>

    <div>
        <input class="k-checkbox" type="checkbox" id="c3" disabled>
        <label class="k-checkbox-label" for="c3">Label</label>
    </div>

    <div>
        <input class="k-checkbox" type="checkbox" id="c4" disabled checked>
        <label class="k-checkbox-label" for="c4">Label</label>
    </div>
</div>

<?php include("footer.php") ?>

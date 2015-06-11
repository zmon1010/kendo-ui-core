(function(){

var cleaner;

module("editor webkit format cleaner", {
    setup: function() {
        cleaner = new kendo.ui.editor.TabCleaner();
    }
});

function clean(html) {
    if (!cleaner.applicable(html)) {
        return html;
    }
    var value = cleaner.clean(html);
    return value.replace(/(<\/?[^>]*>)/g, function (_, tag) {
        return tag.toLowerCase();
    }).replace(/[\r\n]+/g, "");
}

test("replaces tab elements", function() {
    equal(clean('foo<span class="Apple-tab-span" style="white-space:pre">   </span>bar'), 'foo bar');
});

test("replaces odd sequence nbsps", function() {
    equal(clean('foo&nbsp;&nbsp; &nbsp;bar'), 'foo bar');
});

}());


(function () {
    var cx = '011354416605164361800:zp-phug0_0o';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
})();

window.__gcse = {
    callback: gcseLatestUpdatedCallback
};

function gcseLatestUpdatedCallback() {
    if (document.readyState != 'complete') {
        return google.setOnLoadCallback(gcseLatestUpdatedCallback, true);
    } else {
        attachToEvents();

        google.search.cse.element.render({
            gname: 'hidden-gsearch',
            div: 'updated-articles-results',
            tag: 'searchresults-only',
            attributes: {
                // webSearchQueryAddition: 'kb', // The kb meta tag filter will be here
                // resultsUrl: 'http://docs.telerik.com/kendo-ui/knowledge-base/'
                enableOrderBy: 'false', // This should be false in order the 'Sort by' options to be invisible!
                sort_by: 'date',
                sort: 'date',
                webSearchExtendedRestricts: {
                    sort_by: 'date',
                    sort: 'date'
                }
            }
        });
        var element = google.search.cse.element.getElement('hidden-gsearch');
        var orderByOptions = [{ key: 'date', label: 'Date' }];
        element['uiOptions']['orderByOptions'] = orderByOptions;
        element.execute('knowledge-base');
    }
};

function hideLatestUpdatedResults() {
    $('#last-updated-articles').hide();
}

function filter(el) {
    if (el) {
        var filterPrefix = "more:pagemap:restype:";// "metatags-restype:";
        var resourceType = $('#resource-type-options option:selected').val();
        var filter = filterPrefix + resourceType;

        // alert(filter);
        el.webSearchQueryAddition = filter;
    }
}

function search() {
    hideLatestUpdatedResults();
    filter(google.search.cse.element.getElement('google-search'));
}

function attachToEvents() {
    $('.gsc-input').keydown(function (e) {
        if (e.keyCode == 13) {
            search();
        }
    })

    $('.gsc-search-button').click(search);
}
var KB_DEFAULT_QUERY = 'knowledge-base';

$(document).ready(function () {
    var footer = $("#feedback-section").height() + $("footer").height() + 40
    var windowHeight = $(window).height();
    $("#page-article").css("min-height", windowHeight - 80 - footer)
})

function searchInternal() {
    viewModel.docs = false;
    viewModel.kb = true;
    viewModel.updateLabel();

    var element = google.search.cse.element.getElement('google-search');
    var orderByOptions = [{ key: 'date', label: 'Date' }];
    element['uiOptions']['orderByOptions'] = orderByOptions;

    element.execute(KB_DEFAULT_QUERY);

    $("#page-search .gsc-input-box .gsc-input").val("");
}
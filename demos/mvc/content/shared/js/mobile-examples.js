var isAndroid = kendo.support.mobileOS.android;


var currentExample,
    currentSection;


var TITLES = {
    "actionsheet": "ActionSheet",
    "application": "Application",
    "buttongroup": "ButtonGroup",
    "collapsible": "Collapsilble",
    "drawer": "Drawer",
    "mobile-button": "Button",
    "mobile-forms": "Forms",
    "mobile-layout": "Layout",
    "mobile-listview": "ListView",
    "mobile-tabstrip": "TabStrip",
    "mobile-view": "View",
    "modalview": "ModalView",
    "navbar": "NavBar",
    "popover": "PopOver",
    "scroller": "Scroller",
    "scrollview": "ScrollView",
    "splitview": "SplitView",
    "switch": "Switch",
    "touchevents": "Touch Events"
};

// override datasources

navDataSource = new kendo.data.DataSource({
    transport: {
        read: {
            url: NAV_JSON_URL,
            dataType: "json"
        }
    },
    schema: {
        model: {
            id: "name"
        },
        parse: function(response) {
            for (var i = 0; i < response.length; i++) {
                response[i].section = TITLES[response[i].url.split("/")[0]];
            }
            return response;
        }
    },
    group: { field: "section" }
})

searchDataSource = navDataSource;

function nullCurrentExample(e) {
    currentExample = null;
}

function removeView(e) {
    if (!e.view.element.data("persist")) {
        e.view.purge();
    }
}

function initSearch(e) {
    var searchBox = e.view.element.find("#demos-search");

    searchBox.on("input", function() {
        searchExamplesFor(searchBox.val(), product);
    });

    searchBox.on("blur", function() {
        if (searchBox.val() == "") {
            hideSearch();
        }
    });
}

function showSearch() {
    $("#normal").addClass("navbar-hidden");
    $("#search").removeClass("navbar-hidden");
    $("#demos-search").focus();
}

function hideSearch() {
    $("#normal").removeClass("navbar-hidden");
    $("#search").addClass("navbar-hidden");
}

function checkSearch(e) {
    if (!searchDataSource.filter()) {
        e.preventDefault();
        this.replace([]);
        $("#search-tooltip").show();
    } else {
        $("#search-tooltip").hide();
    }
}

function showDemoLayout(e) {
    currentExample = null;
    currentSection = null;
    navDataSource.fetch(function() {
        var url = e.view.id,
            element = e.view.element;

        currentSection = navDataSource.get(url.split("/")[0]);

        if (currentSection) {
            detailNavDataSource.data(mobileExamples(currentSection));

            currentExample = detailNavDataSource.get(url);
            var navBar = element.find("[data-role=navbar]").data("kendoMobileNavBar");

            if (navBar) {
                navBar.title(currentExample.text);
            }

            element.find("[data-role=backbutton]").attr("href", "#section?name=" + currentSection.name);
        }
    });
}

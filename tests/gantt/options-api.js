(function() {

    var element;
    var ui = kendo.ui;
    var Gantt = ui.Gantt;
    var JSONData = [
        { title: "Task1", parentId: null, id: 1 },
            { title: "Child 1.1", parentId: 1, id: 2 },
            { title: "Child 1.2", parentId: 1, id: 3 },
            { title: "Child 1.3", parentId: 1, id: 4 },
        { title: "Task2", parentId: null, id: 5 },
            { title: "Child 2.1", parentId: 5, id: 6 },
            { title: "Child 2.2", parentId: 5, id: 7 },
            { title: "Child 2.3", parentId: 5, id: 8 }
    ];
    var setup = function(options) {
        options = kendo.deepExtend({}, {
            dataSource: {
                data: JSONData
            }
        },
        options);

        return new Gantt(element, options);
    };

    module("Gantt options api", {
        setup: function() {
            element = $("<div/>").appendTo(QUnit.fixture);
        },
        teardown: function() {
            kendo.destroy(element);
            element.remove();
        }
    });

    test("setOptions does not create new instance of dataSource when no options for dataSource are passed", function() {
        var gantt = setup();
        var dataSource = gantt.dataSource;

        gantt.setOptions({ editable: false });

        ok(dataSource === gantt.dataSource);
    });

    test("setOptions creates new instance of the dataSource when options for dataSource exist", function() {
        var gantt = setup();
        var dataSource = gantt.dataSource;

        gantt.setOptions({ editable: false, dataSource: { batch: true } });

        ok(dataSource !== gantt.dataSource);
    });

    test("setOptions does not create new instance of dependencies when no options for dependencies are passed", function() {
        var gantt = setup({ dependencies: [{
                type: 1,
                predecessorId: 1,
                successorId: 2
            }]});
        var dependencies = gantt.dependencies;

        gantt.setOptions({ editable: false });

        ok(dependencies === gantt.dependencies);
    });

    test("setOptions creates new instance of the dependencies when options for dependencies exist", function() {
        var gantt = setup({ dependencies: [{
                type: 1,
                predecessorId: 1,
                successorId: 2
            }]});
        var dependencies = gantt.dependencies;

        gantt.setOptions({ editable: false, dependencies: [] });

        ok(dependencies !== gantt.dependencies);
    });

    test("setOptions does not create new instance of resources when no options for resources are passed", function() {
        var gantt = setup({ resources: {
                dataSource: [
                  { id: 1, name: "Resource 1", color: "green" },
                  { id: 2, name: "Resource 2", color: "#32cd32" }
                ]
            }});
        var resources = gantt.resources.dataSource;

        gantt.setOptions({ editable: false });

        ok(resources === gantt.resources.dataSource);
    });

    test("setOptions creates new instance of the resources when options for resources exist", function() {
        var gantt = setup({ resources: {
                dataSource: [
                  { id: 1, name: "Resource 1", color: "green" },
                  { id: 2, name: "Resource 2", color: "#32cd32" }
                ]
            }});
        var resources = gantt.resources.dataSource;

        gantt.setOptions({ editable: false, resources: { dataSource: [] } });

        ok(resources !== gantt.resources.dataSource);
    });

    test("setOptions does not create new instance of assignments when no options for assignments are passed", function() {
        var gantt = setup({ assignments: {
                dataSource: [
                  { taskId: 1, resourceId: 1, value: 1 },
                  { taskId: 1, resourceId: 2, value: 1 }
                ]
            }});
        var assignments = gantt.assignments.dataSource;

        gantt.setOptions({ editable: false });

        ok(assignments === gantt.assignments.dataSource);
    });

    test("setOptions creates new instance of the assignments when options for assignments exist", function() {
        var gantt = setup({ assignments: {
                dataSource: [
                  { taskId: 1, resourceId: 1, value: 1 },
                  { taskId: 1, resourceId: 2, value: 1 }
                ]
            }});
        var assignments = gantt.assignments.dataSource;

        gantt.setOptions({ editable: false, assignments: { dataSource: [] } });

        ok(assignments !== gantt.assignments.dataSource);
    });

    test("setOptions sets the new options and persists the current", function() {
        var gantt = setup({ messages: {
                views: {
                    day: "Day",
                    week: "Week"
                }
            }});

        gantt.setOptions({ messages: {
                views: {
                    day: "New Day"
                }
            }});

        equal(gantt.options.messages.views.day, "New Day");
        equal(gantt.options.messages.views.week, "Week");
    });

    test("setOptions preserves user selected view when no options for views are passed", function() {
        var gantt = setup();

        gantt.view("week");

        ok(gantt.view().name === "week");

        gantt.setOptions({ editable: false });

        ok(gantt.view().name === "week");
    });

    test("setOptions preserves user selected view when no options for views are passed and views are initialized with strings", function() {
        var gantt = setup({ views: ["day", "week"]});

        ok(gantt.view().name === "day");

        gantt.view("week");

        ok(gantt.view().name === "week");

        gantt.setOptions({ editable: false });

        ok(gantt.view().name === "week");
    });

    test("setOptions preserves user selected view when no options for views are passed and views are initialized with objects", function() {
        var gantt = setup({ views: [
                { type: "day", selected: true },
                { type: "week" }
            ]});

        ok(gantt.view().name === "day");

        gantt.view("week");

        ok(gantt.view().name === "week");

        gantt.setOptions({ editable: false });

        ok(gantt.view().name === "week");
    });

    test("setOptions sets the new views when passed", function() {
        var gantt = setup();

        ok(gantt.view().name === "day");

        gantt.setOptions({ views: ["week"] });

        ok(gantt.view().name === "week");
    });

    test("preserves initial set events", function() {
        var invoked = 0;
        var gantt = setup({
            dataBound: function() { invoked++; }
        });

        invoked = 0;
        gantt.setOptions({ editable: false });

        equal(invoked, 1);
    });

    test("preserves dynamically set events", function() {
        var invoked = 0;
        var gantt = setup();

        gantt.bind("dataBound", function() { invoked++; });

        invoked = 0;
        gantt.setOptions({ editable: false });

        equal(invoked, 1);
    });

    test("preserves initial and dynamically set events", function() {
        var invoked = 0;
        var gantt = setup({
            dataBound: function() { invoked++; }
        });

        gantt.bind("dataBound", function() { invoked++; });
        invoked = 0;

        gantt.setOptions({ editable: false });

        equal(invoked, 2);
    });

}());

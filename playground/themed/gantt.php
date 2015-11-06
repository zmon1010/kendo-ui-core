<?php include("header.php") ?>

<style>
    #gantt { height: 100%; }
</style>

<div id='gantt'></div>
<script>
    var serviceRoot = "//demos.telerik.com/kendo-ui/service";
    var tasksDataSource = new kendo.data.GanttDataSource({
        transport: {
            read: {
                url: serviceRoot + "/GanttTasks",
                dataType: "jsonp"
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "ID", type: "number" },
                    orderId: { from: "OrderID", type: "number", validation: { required: true } },
                    parentId: { from: "ParentID", type: "number", defaultValue: null, validation: { required: true } },
                    start: { from: "Start", type: "date" },
                    end: { from: "End", type: "date" },
                    title: { from: "Title", defaultValue: "", type: "string" },
                    percentComplete: { from: "PercentComplete", type: "number" },
                    summary: { from: "Summary", type: "boolean" },
                    expanded: { from: "Expanded", type: "boolean", defaultValue: true }
                }
            }
        }
    });

    var dependenciesDataSource = new kendo.data.GanttDependencyDataSource({
        transport: {
            read: {
                url: serviceRoot + "/GanttDependencies",
                dataType: "jsonp"
            }
        },
        schema: {
            model: {
                id: "id",
                fields: {
                    id: { from: "ID", type: "number" },
                    predecessorId: { from: "PredecessorID", type: "number" },
                    successorId: { from: "SuccessorID", type: "number" },
                    type: { from: "Type", type: "number" }
                }
            }
        }
    });

    var gantt = $("#gantt").kendoGantt({
        dataSource: tasksDataSource,
        dependencies: dependenciesDataSource,
        views: [
            "day",
            { type: "week", selected: true },
            "month"
        ],
        columns: [
            { field: "id", title: "ID", width: 60 },
            { field: "title", title: "Title", editable: true, sortable: true },
            { field: "start", title: "Start Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true },
            { field: "end", title: "End Time", format: "{0:MM/dd/yyyy}", width: 100, editable: true, sortable: true }
        ],
        height: 290,

        showWorkHours: false,
        showWorkDays: false,

        snap: false
    }).data("kendoGantt");
</script>

<?php include("footer.php") ?>

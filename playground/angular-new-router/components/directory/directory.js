angular.module('app.directory', ["ngNewRouter", "kendo.directives"])
  .controller('DirectoryController',[ '$routeParams', function ($routeParams) {
      this.items = [
          "foo",
          "bar",
          "baz"
      ];

    this.activated = true;

    this.mainGridOptions = {
	height: 800,
        dataSource: {
            type: "odata",
            transport: {
                read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
            },
            pageSize: 5,
            serverPaging: true,
            serverSorting: true
        },
        autoBind: true,
        sortable: true,
        pageable: true,
        columns: [{
            field: "FirstName",
            title: "First Name",
            width: "120px"
        },{
            field: "LastName",
            title: "Last Name",
            width: "120px"
        },{
            field: "Country",
            width: "120px"
        },{
            field: "City",
            width: "120px"
        },{
            field: "Title"
        }]
    };

    this.monthSelectorOptions = {
      format: "MMM yyyy"
    };
}]);



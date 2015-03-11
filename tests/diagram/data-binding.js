(function() {
    var diagram;
    var dataSource;

    function createDiagram(options) {
        var div = $("<div id='container' />").appendTo(QUnit.fixture);
        div.kendoDiagram(options);

        return div.data("kendoDiagram");
    }

    function destroyDiagram() {
        kendo.destroy(QUnit.fixture);
        QUnit.fixture.empty();
    }

    function setupDataSource(type, options, data) {
        var items = data || [{id: 1}];
        var fields;
        if (type == "shape") {
            fields = {
                width: { type: "number" },
                height: { type: "number" },
                x: { type: "number" },
                y: { type: "number" },
                text: { type: "string" },
                type: { type: "string" }
            };
        } else {
            fields = {
                from: { type: "number" },
                to: { type: "number" },
                fromX: { type: "number" },
                fromY: { type: "number" },
                toX: { type: "number" },
                toY: { type: "number" }
            };
        }
        dataSource = new kendo.data.DataSource($.extend({
            transport: {
                read: function(options) {
                    options.success(items);
                },
                update: function(options) {
                    options.success();
                },
                create: function(options) {
                    var newItem = options.data;
                    newItem.id = items.length + 1;
                    items.push(newItem);
                    options.success([newItem]);
                }
            },
            schema: {
                model: {
                    id: "id"
                }
            }
        }, {
        }, options));
        return dataSource;
    }

    // ------------------------------------------------------------
    module("Diagram / Data Binding", {
          teardown: destroyDiagram
    });

    test("Binds to hierarchical data", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    items: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "items"
                    }
                }
            }
        });

        equal(diagram.shapes.length, 2);
    });

    test("Binds to flat data", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1"
                }]
            }
        });

        equal(diagram.shapes.length, 1);
    });

    test("Binds to hierarchical data (custom field)", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            }
        });

        equal(diagram.shapes.length, 2);
    });

    test("Binds to HierarchicalDataSource instance", function() {
        diagram = createDiagram({
            dataSource: new kendo.data.HierarchicalDataSource({
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            })
        });

        equal(diagram.shapes.length, 2);
    });

    test("Applies visual to bound shapes", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    bars: [{
                        id: "1.1"
                    }]
                }],
                schema: {
                    model: {
                        children: "bars"
                    }
                }
            },
            shapeDefaults: {
                visual: function() {
                    ok(true);
                    return new kendo.dataviz.diagram.Group();
                }
            }
        });
    });

    test("Provides access to data item", function() {
        diagram = createDiagram({
            dataSource: {
                data: [{
                    id: "1",
                    items: [{
                        id: "1.1",
                        foo: true
                    }]
                }],
                schema: {
                    model: {
                        children: "items"
                    }
                }
            }
        });

        ok(diagram.shapes[1].options.dataItem.foo);
    });

    // ------------------------------------------------------------
    var dataMap;
    var dataSource;
    var shapes;
    var connections;
    var shape;
    var uid;

    module("Diagram / Data Binding / updates", {
        setup: function() {
            diagram = createDiagram({
                dataSource: {
                    data: [{
                        id: "1",
                        items: [{
                            id: "1.1",
                            foo: true
                        }]
                    }, {
                        id: "2"
                    }],
                    schema: {
                        model: {
                            children: "items"
                        }
                    }
                },
                layout:{
                    type: "tree",
                    subtype: "Down"
                }
            });
            shapes = diagram.shapes;
            connections = diagram.connections;
            dataSource = diagram.dataSource;
            dataMap = diagram._dataMap;
        },
        teardown: destroyDiagram
    });

    test("binding adds dataItem uids to dataMap", function() {
        for (var idx = 0; idx < shapes.length; idx++) {
            shape = shapes[idx];
            ok(dataMap[shape.options.dataItem.uid] === shape);
        }
    });

    test("dataSource remove removes uid from map", function() {
        var item = dataSource.at(0);
        uid = item.uid;
        dataSource.remove(item);
        ok(!dataMap[uid]);
    });

    test("dataSource remove removes shape and its connections ", function() {
        shape = diagram.shapes[0];
        var shapeConnections = shape.connections();
        var removed;
        var idx;
        dataSource.remove(dataSource.at(0));
        removed = $.inArray(shape, shapes) == -1;

        for (idx = 0; idx < shapeConnections.length; idx++) {
            removed = removed && $.inArray(shapeConnections[idx], connections) == -1;
        }
        ok(removed);
    });

    test("dataSource remove removes children shapes and their connections", function() {
        dataSource.remove(dataSource.at(0));
        equal(connections.length, 0);
        equal(shapes.length, 1);
    });

    test("dataSource remove updates layout", function() {
        diagram.layout = function() {
            ok(true);
        };
        dataSource.remove(dataSource.at(0));
    });

    test("dataSource add adds shape", function() {
        dataSource.add({id: "3"});

        equal(shapes.length, 4);
    });

    test("dataSource add updates layout", function() {
        diagram.layout = function() {
            ok(true);
        };

        dataSource.add({id: "3"});
    });

    test("dataSource add adds connections if shape has parents", function() {
        var item = dataSource.at(0);
        var newItem = item.children.add({id: "3"});
        var shape = dataMap[newItem.uid];
        ok(shape.connections().length);
    });

    test("dataSource read clears existing shapes before adding new ones", function() {
        dataSource.read();

        equal(shapes.length, 3);
    });

    test("dataSource read clears existing uids from map", function() {
        dataSource.read();
        dataMap = diagram._dataMap;
        var mapCount = 0;
        var existingItemsUids = true;
        for(var uid in dataMap) {
            mapCount++;
            existingItemsUids = existingItemsUids && !!dataSource.getByUid(uid);
        }

        ok(existingItemsUids);
        equal(mapCount, 3);
    });

    test("updating item fields does not layout diagram", 0, function() {
       diagram.layout = function() {
           ok(false);
       };
       var item = dataSource.at(0);
       item.set("foo", "bar");
    });

    test("updating item fields does not update shapes and connections", function() {
       var connectionsCount = connections.length;
       var shapesCount = shapes.length;
       var item = dataSource.at(0);
       item.set("foo", "bar");
       equal(connections.length, connectionsCount);
       equal(shapes.length, shapesCount);
    });

    // ------------------------------------------------------------
    module("Diagram / Shapes / Data Binding", {
        setup: function() {
            diagram = createDiagram({
                dataSource: {
                    data: [{
                        id: 1
                    },{
                        id: 2
                    },{
                        id: 3
                    }]
                },
                connectionsDataSource: { }
            });
        },
        teardown: destroyDiagram
    });

    test("binds to flat data", function() {
        equal(diagram.shapes.length, 3);
    });

    test("initial binding should add shapes in dataMap", function() {
        var count = 0;

        for (var item in diagram._dataMap) {
            count++;
            ok(diagram._dataMap[item] instanceof kendo.dataviz.diagram.Shape);
        }

        equal(count, 3);
    });

    test("remove should remove shape", function() {
        var item = diagram.dataSource.at(0);
        var id = item.id;
        var shape = diagram._dataMap[id];
        diagram.dataSource.remove(item);
        ok(!diagram._dataMap[id]);
        ok(!diagram.getShapeById(shape.id));
    });

    test("remove does not remove shape if updates are suspended", function() {
        var item = diagram.dataSource.at(0);
        var id = item.id;
        var shape = diagram._dataMap[id];
        diagram._suspendModelRefresh();
        diagram.dataSource.remove(item);
        ok(diagram._dataMap[id]);
        ok(diagram.getShapeById(shape.id));
    });

    test("itemchange should change the shape dataItem", function() {
        var item = diagram.dataSource.at(0);
        item.set("foo", "bar");
        var shape = diagram._dataMap[item.id];
        equal(shape.dataItem.foo, "bar");
    });

    (function() {
        var item;

        // ------------------------------------------------------------
        module("Diagram / Shapes / Inactive items", {
            setup: function() {
                diagram = createDiagram({
                    dataSource: setupDataSource("shape"),
                    connectionsDataSource: { }
                });
            },
            teardown: destroyDiagram
        });

        test("adding new item to the to the dataSource should add the item to the inactive items", function() {
            item = dataSource.add({});
            ok(diagram._inactiveShapeItems.getByUid(item.uid));
        });

        test("inactive item is removed after it has been synced", 0, function() {
            item = dataSource.add({});
            dataSource.sync();
            diagram._inactiveShapeItems.forEach(function() {
                ok(false);
            });
        });

        test("inactive item callbacks are executed after an item is synced with the dataItem as parameter", 1, function() {
            item = dataSource.add({});
            var inactiveItem = diagram._inactiveShapeItems.getByUid(item.uid);
            inactiveItem.onActivate(function(e) {
                ok(item === e);
            });
            dataSource.sync();
        });

        test("deferreds are resolved after an item is synced", 1, function() {
            item = dataSource.add({});
            var inactiveItem = diagram._inactiveShapeItems.getByUid(item.uid);
            var deferred = inactiveItem.onActivate(function() {});
            $.when(deferred).then(function() {
                ok(true);
            });
            dataSource.sync();
        });

        test("adds shape for the inactive dataItem after it has been synced", 1, function() {
            item = dataSource.add({});
            dataSource.sync();
            ok(diagram._dataMap[item.id]);
        });

        test("adds existing shape for the inactive item if the element is set", 1, function() {
            item = dataSource.add({});
            var inactiveItem = diagram._inactiveShapeItems.getByUid(item.uid);
            var shape = new kendo.dataviz.diagram.Shape();
            inactiveItem.element = shape;
            dataSource.sync();
            ok(diagram._dataMap[item.id] === shape);
        });

        test("does not add shape to undo redo stack for existing shape if undoable is set to false", 1, function() {
            item = dataSource.add({});
            var inactiveItem = diagram._inactiveShapeItems.getByUid(item.uid);
            var shape = new kendo.dataviz.diagram.Shape();
            var count = diagram.undoRedoService.count();
            inactiveItem.element = shape;
            inactiveItem.undoable = false;
            dataSource.sync();
            equal(diagram.undoRedoService.count(), count);
        });

    })();

    (function() {
        var item, shape;

        // ------------------------------------------------------------
        module("Diagram / Shapes / Updates", {
            setup: function() {
                diagram = createDiagram({
                    shapeDefaults: {
                        content: {
                            template: "#:foo#"
                        }
                    },
                    dataSource: setupDataSource("shape", {}, [{id: 1, width: 100, height: 100, x: 10, y: 10, text: "foo", foo: "bar", type: "circle"}]),
                    connectionsDataSource: { }
                });
                item =  diagram.dataSource.at(0);
                shape = diagram.shapes[0];
            },
            teardown: destroyDiagram
        });

        test("recreates shape visual if the model type field is changed", function() {
            var shapeVisual = shape.shapeVisual;
            item.set("type", "rectangle");
            ok(shape.shapeVisual !== shapeVisual);
        });

        test("recreates shape visual if a field not related to the bounds is changed", function() {
            var shapeVisual = shape.shapeVisual;
            item.set("foo", "baz");
            ok(shape.shapeVisual !== shapeVisual);
        });

        test("does not recreate visual if a bounds field is changed", function() {
            var shapeVisual = shape.shapeVisual;
            item.set("x", 200);
            ok(shape.shapeVisual === shapeVisual);
        });

        test("does not recreate visual if updates are suspended", function() {
            var shapeVisual = shape.shapeVisual;
            diagram._suspendModelRefresh();
            item.set("type", "rectangle");
            item.set("foo", "baz");
            ok(shape.shapeVisual === shapeVisual);
        });

        test("updates content if a field not related to the bounds is changed", function() {
            var contentVisual = shape._contentVisual;
            item.set("foo", "baz");
            equal(shape._contentVisual.options.text, "baz");
        });

        test("updates bounds when a bounds model field is changed", function() {
            item.set("x", 200);
            item.set("y", 200);
            item.set("width", 200);
            item.set("height", 200);
            var bounds = shape.bounds();
            equal(bounds.x, 200);
            equal(bounds.y, 200);
            equal(bounds.width, 200);
            equal(bounds.height, 200);
        });

    })();

    (function() {
        // ------------------------------------------------------------
        module("Diagram / Connections / Data Binding", {
            setup: function() {
                diagram = createDiagram({
                    dataSource: {
                        data: [{
                            id: 1
                        },{
                            id: 2
                        },{
                            id: 3
                        }]
                    },
                    connectionsDataSource: {
                        data: [{
                            id: 1,
                            from: 1,
                            to: 2
                        },{
                            id: 2,
                            from: 2,
                            to: 3
                        }]
                    }
                });
            },
            teardown: destroyDiagram
        });

        test("binds to flat data", function() {
            equal(diagram.connections.length, 2);
        });

        test("initial binding should add shapes in connectionsDataMap", function() {
            var count = 0;

            for (var item in diagram._connectionsDataMap) {
                count++;
                ok(diagram._connectionsDataMap[item] instanceof kendo.dataviz.diagram.Connection);
            }

            equal(count, 2);
        });

        test("remove should remove connection", function() {
            var item = diagram.connectionsDataSource.at(0);
            var uid = item.uid;
            diagram.connectionsDataSource.remove(item);
            ok(!diagram._connectionsDataMap[uid]);
            equal(diagram.connections.length, 1);

        });

        test("remove does not remove connection if updates are suspended", function() {
            var item = diagram.connectionsDataSource.at(0);
            var uid = item.uid;
            diagram._suspendModelRefresh();
            diagram.connectionsDataSource.remove(item);

            ok(diagram._connectionsDataMap[uid]);
            equal(diagram.connections.length, 2);
        });

        test("itemchange should change the connection dataItem", function() {
            var item = diagram.connectionsDataSource.at(0);
            item.set("foo", "bar");
            var connection = diagram._connectionsDataMap[item.uid];
            equal(connection.dataItem.foo, "bar");
        });

    })();

    (function() {
        var shapeItem, connectionItem, shape, connection;

        // ------------------------------------------------------------
        module("Diagram / Connections / UpdateModel", {
            setup: function() {
                diagram = createDiagram({
                    dataSource: setupDataSource("shape", {}, [{id: 1}, {id: 2}, {id: 3}]),
                    connectionsDataSource: setupDataSource("connection", {}, [{id: 1, from: 1, to: 2}, {id: 2, fromX: 100, fromY: 100, toX: 200, toY: 200}])
                });
                shapesItem = diagram.connectionsDataSource.at(0);
                pointsItem = diagram.connectionsDataSource.at(1);
                shapesConnection = diagram.connections[0];
                pointsConnection = diagram.connections[1];
            },
            teardown: destroyDiagram
        });

        test("updates from and to values in model", 2, function() {
            shapesConnection.options.from = 2;
            shapesConnection.options.to = 3;
            shapesItem.bind("change", function(e) {
                if (e.field == "from") {
                    equal(this.from, 2);
                } else if (e.field == "to") {
                    equal(this.to, 3);
                }
            });
            shapesConnection.updateModel();
        });

        test("updates fromX and fromY values in model", 2, function() {
            pointsConnection.options.fromX = 5;
            pointsConnection.options.fromY = 10;
            pointsItem.bind("change", function(e) {
                if (e.field == "fromX") {
                    equal(this.fromX, 5);
                } else if (e.field == "fromY") {
                    equal(this.fromY, 10);
                }
            });
            pointsConnection.updateModel();
        });

        test("updates toX and toY values in model", 2, function() {
            pointsConnection.options.toX = 5;
            pointsConnection.options.toY = 10;
            pointsItem.bind("change", function(e) {
                if (e.field == "toX") {
                    equal(this.toX, 5);
                } else if (e.field == "toY") {
                    equal(this.toY, 10);
                }
            });
            pointsConnection.updateModel();
        });

        test("does not update options from model", 0, function() {
            shapesConnection.options.from = 2;
            shapesConnection.options.to = 3;
            shapesConnection.updateOptionsFromModel = function() {
                ok(false);
            };
            shapesConnection.updateModel();
        });

    })();

    // ------------------------------------------------------------
    (function() {
        var dataSource, connectionsDataSource;
        module("Diagram / Sync", {
            setup: function() {
                dataSource = setupDataSource("shape", {}, [{id: 1}, {id: 2}, {id: 3}]);
                connectionsDataSource = setupDataSource("connection", {}, [{id: 1, from: 1, to: 2}, {id: 2, fromX: 100, fromY: 100, toX: 200, toY: 200}]);
                diagram = createDiagram({
                    dataSource: dataSource,
                    connectionsDataSource:connectionsDataSource
                });
            },
            teardown: destroyDiagram
        });

        test("_syncShapeChanges syncs dataSource", function() {
            dataSource.at(0).dirty = true;
            dataSource.one("sync", function() {
                ok(true);
            });
            diagram._syncShapeChanges();
        });

        test("_syncConnectionChanges syncs connectionsDataSource", function() {
            connectionsDataSource.at(0).dirty = true;
            connectionsDataSource.one("sync", function() {
                ok(true);
            });
            diagram._syncConnectionChanges();
        });

        test("_syncConnectionChanges syncs connectionsDataSource after the deferred connection updates are resolved", function() {
            var deferred = $.Deferred();
            diagram._deferredConnectionUpdates.push(deferred);
            connectionsDataSource.at(0).dirty = true;
            connectionsDataSource.sync = function() {
                ok(false);
            };
            diagram._syncConnectionChanges();

            connectionsDataSource.sync = function() {
                ok(true);
            };
            deferred.resolve();
        });

        test("_syncChanges syncs dataSource and connectionsDataSource", 2, function() {
            dataSource.at(0).dirty = true;
            connectionsDataSource.at(0).dirty = true;
            dataSource.one("sync", function() {
                ok(true);
            });
            connectionsDataSource.one("sync", function() {
                ok(true);
            });
            diagram._syncChanges();
        });

    })();


})();

(function() {

    var dataviz = kendo.dataviz,
        LogarithmicAxis = dataviz.LogarithmicAxis,
        deepExtend = dataviz.deepExtend,
        defined = kendo.util.defined,
        Point = dataviz.Point2D,
        Box = dataviz.Box2D,
        draw = kendo.drawing,
        axis,
        chartBox = dataviz.Box2D(0, 0, 800, 600),
        TOLERANCE = 0.1;

    function createAxis(min, max, options) {
        axis = new LogarithmicAxis(min, max, options);
    }

    (function() {
        module("axis options", {});

        test("throws error for non-positive crossing value", function() {
            try {
                createAxis(0.1, 1, {
                    axisCrossingValue: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("throws error for non-positive min options value", function() {
            try {
                createAxis(0.1, 1, {
                    min: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("throws error for non-positive max options value", function() {
            try {
                createAxis(0.1, 1, {
                    max: 0
                });
            } catch(e) {
                ok(true);
            }
        });

        test("does not change minorUnit passed from the options", function() {
            createAxis(0.1, 100, {
                minorUnit: 2
            });
            equal(axis.options.minorUnit, 2);
        });

        test("sets minorUnit to majorUnit minus 1 by default", function() {
            createAxis(0.1, 100, {});
            equal(axis.options.minorUnit, 9);
        });

        module("axis options / auto min", {});

        test("does not change minimum value passed from the options", function() {
            createAxis(0.1, 100, {
                min: 10
            });
            equal(axis.options.min, 10);
        });

        test("sets min to 1 if series min is non-positive", function() {
            createAxis(0, 100, {});
            equal(axis.options.min, 1);
        });

        test("sets min to base on power minus 2 if series min is non-positive and max le 1", function() {
            createAxis(0, 1, {});
            equal(axis.options.min, 0.01);
        });

        test("sets min to the lower whole power if narrowRange is false", function() {
            createAxis(0.9, 100, {
                narrowRange: false
            });
            equal(axis.options.min, 0.1);
        });

        test("uses series min if narrowRange is true", function() {
            createAxis(0.9, 100, {
                narrowRange: true
            });
            equal(axis.options.min, 0.9);
        });

        module("axis options / auto max", {});

        test("does not change maximum value passed from the options", function() {
            createAxis(0.1, 100, {
                max: 10
            });
            equal(axis.options.max, 10);
        });

        test("sets max to the majorUnit if series max is non-positive", function() {
            createAxis(0, 0, {
                majorUnit: 2
            });
            equal(axis.options.max, 2);
        });

        test("adds 0.2 to the power if series max base power remainder is gt 0 and lt than 0.3", function() {
            createAxis(0.9, 18, {});
            close(axis.options.max, 28.5, TOLERANCE);
        });

        test("adds 0.2 to the power if series max base power remainder is gt 0.9", function() {
            createAxis(0.9, 80, {});
            close(axis.options.max, 126.8, TOLERANCE);
        });

        test("sets max to the higher whole power if series max base power remainder is between 0.3 and 0.9", function() {
            createAxis(0.9, 70, {});
            equal(axis.options.max, 100);
        });
    })();

    (function() {
        module("axis slot", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical:true
                });
                axis.reflow(chartBox);
            }
        });

        test("uses 1 to calculate the slot when the value is not defined", function() {
            var slot = axis.getSlot(),
                value1Slot = axis.getSlot(1);

            close(slot.y1, value1Slot.y1, TOLERANCE);
            close(slot.y2, value1Slot.y2, TOLERANCE);
        });

        test("slot method returns slot as rect", function() {
            var box = axis.getSlot(1);
            var slot = axis.slot(1);
            ok(slot.equals(box.toRect()));
        });

        module("axis slot / vertical", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.y1, 598.9, TOLERANCE);
            close(slot.y2, 598.9, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.y1, 0, TOLERANCE);
            close(slot.y2, 0, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.y1, 149.75, TOLERANCE);
            close(slot.y2, 149.75, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.y1, 194.82, TOLERANCE);
            close(slot.y2, 194.82, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.y1, 149.75, TOLERANCE);
            close(slot.y2, 194.829, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.y1, 0, TOLERANCE);
            close(slot.y2, 0, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.y1, -6.198, TOLERANCE);
            close(slot.y2, -6.198, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / vertical / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.y1, 0, TOLERANCE);
            close(slot.y2, 0, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.y1, 599, TOLERANCE);
            close(slot.y2, 599, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.y1, 449.25, TOLERANCE);
            close(slot.y2, 449.25, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.y1, 404.17, TOLERANCE);
            close(slot.y2, 404.17, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.y1, 404.17, TOLERANCE);
            close(slot.y2, 449.25, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.y1, 599, TOLERANCE);
            close(slot.y2, 599, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.y1, 605.198, TOLERANCE);
            close(slot.y2, 605.198, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.x1, 0, TOLERANCE);
            close(slot.x2, 0, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.x1, 799, TOLERANCE);
            close(slot.x2, 799, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.x1, 599.25, TOLERANCE);
            close(slot.x2, 599.25, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.x1, 539.11, TOLERANCE);
            close(slot.x2, 539.11, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.x1, 539.119, TOLERANCE);
            close(slot.x2, 599.25, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.x1, 799, TOLERANCE);
            close(slot.x2, 799, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.x1, 807.26, TOLERANCE);
            close(slot.x2, 807.26, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct slot for lower border value", function() {
            var slot = axis.getSlot(0.01);
            close(slot.x1, 798.9, TOLERANCE);
            close(slot.x2, 798.9, TOLERANCE);
        });

        test("correct slot for upper border value", function() {
            var slot = axis.getSlot(100);
            close(slot.x1, 0, TOLERANCE);
            close(slot.x2, 0, TOLERANCE);
        });

        test("correct slot for whole power value", function() {
            var slot = axis.getSlot(10);
            close(slot.x1, 199.75, TOLERANCE);
            close(slot.x2, 199.75, TOLERANCE);
        });

        test("correct slot for fraction power value", function() {
            var slot = axis.getSlot(5);
            close(slot.x1, 259.88, TOLERANCE);
            close(slot.x2, 259.88, TOLERANCE);
        });

        test("correct slot for range", function() {
            var slot = axis.getSlot(10, 5);
            close(slot.x1, 199.75, TOLERANCE);
            close(slot.x2, 259.88, TOLERANCE);
        });

        test("limits value if third parameter is true", function() {
            var slot = axis.getSlot(110, 110, true);
            close(slot.x1, 0, TOLERANCE);
            close(slot.x2, 0, TOLERANCE);
        });

        test("does not limit value if third parameter is false", function() {
            var slot = axis.getSlot(110, 110, false);
            close(slot.x1, -8.26, TOLERANCE);
            close(slot.x2, -8.26, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / non-positive", {
            setup: function() {
                createAxis(1, 100, {});
                axis.reflow(chartBox);
            }
        });

        test("returns undefined if first value is non-positive", function() {
            var slot = axis.getSlot(0, 1);
            ok(!defined(slot));
        });

        test("returns undefined if second value is non-positive", function() {
            var slot = axis.getSlot(1, 0);
            ok(!defined(slot));
        });

    })();

    (function() {
        module("axis value / vertical", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(0, 599));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(0, 0));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(0, 149.75));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(0, 194.82));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis value / vertical / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(0, 0));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(0, 599));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(0, 449.25));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(0, 404.17));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis value / horizontal", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(8.87, 0));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(799, 0));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(599.25, 0));
            close(value, 10, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(539.119, 0));
            close(value, 5, TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis slot / horizontal / reverse", {
            setup: function() {
                createAxis(0.01, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("correct lower border value", function() {
            var value = axis.getValue(Point(798.999, 0));
            close(value, 0.01, TOLERANCE);
        });

        test("correct upper border value", function() {
            var value = axis.getValue(Point(0, 0));
            close(value, 100, TOLERANCE);
        });

        test("correct whole power value", function() {
            var value = axis.getValue(Point(206.375, 0));
            close(value, 9.264, TOLERANCE);
        });

        test("correct fraction power value", function() {
            var value = axis.getValue(Point(264.89, 0));
            close(value, 4.719, TOLERANCE);
        });

    })();

    (function() {
        var TRANSLATE_TOLERANCE = 0.001;

        module("axis range / scale", {
            setup: function() {
                createAxis(1, 1000, {});
                axis.reflow(chartBox);
            }
        });

        test("delta -1 expands range with 1 base power", function() {
            var range = axis.scaleRange(-1);
            equal(0.1, range.min);
            equal(10000, range.max);
        });

        test("delta 1 collapses range with 1 base power", function() {
            var range = axis.scaleRange(1);
            equal(10, range.min);
            equal(100, range.max);
        });

        // ------------------------------------------------------------
        module("axis range / translate / vertical", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range up", function() {
            var range = axis.translateRange(-1);
            close(1.008, range.min, TRANSLATE_TOLERANCE);
            close(100.771, range.max, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range down", function() {
            var range = axis.translateRange(1);
            close(0.992, range.min, TRANSLATE_TOLERANCE);
            close(99.234, range.max, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / vertical / reverse", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: true,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range down", function() {
            var range = axis.translateRange(-1);
            close(0.992, range.min, TRANSLATE_TOLERANCE);
            close(99.234, range.max, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range up", function() {
            var range = axis.translateRange(1);
            close(1.008, range.min, TRANSLATE_TOLERANCE);
            close(100.771, range.max, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / horizontal", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: false
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range down", function() {
            var range = axis.translateRange(-1);
            close(range.min, 0.994, TRANSLATE_TOLERANCE);
            close(range.max, 99.425, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range up", function() {
            var range = axis.translateRange(1);
            close(range.min, 1.005, TRANSLATE_TOLERANCE);
            close(range.max, 100.578, TRANSLATE_TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis range / translate / horizontal / reverse", {
            setup: function() {
                createAxis(1, 100, {
                    vertical: false,
                    reverse: true
                });
                axis.reflow(chartBox);
            }
        });

        test("delta -1 translates range up", function() {
            var range = axis.translateRange(-1);
            close(range.min, 1.005, TRANSLATE_TOLERANCE);
            close(range.max, 100.578, TRANSLATE_TOLERANCE);
        });

        test("delta 1 translates range down", function() {
            var range = axis.translateRange(1);
            close(range.min, 0.994, TRANSLATE_TOLERANCE);
            close(range.max, 99.425, TRANSLATE_TOLERANCE);
        });

    })();
    // TO DO: Add horizontal / reverse tests
    (function() {
        var defaultOptions = {skip: 0, step: 1};

        module("axis / major positions", {
            setup: function() {
                createAxis(1, 1000, { min: 5 });
                axis.reflow(chartBox);
            }
        });

        test("returns positions for all whole powers between min and max", function() {
            var positions = axis.getMajorTickPositions();
            arrayClose(positions, [520.6, 260.3, 0], TOLERANCE);
        });

        test("passes options to callback", 3, function() {
            axis.traverseMajorTicksPositions(function(position, tickOptions) {
                ok(defaultOptions === tickOptions);
            }, defaultOptions);
        });

        test("triggers callback for each position", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position, tickOptions) {
                   positions.push(position);
                }, defaultOptions);
            arrayClose(positions, [520.6, 260.3, 0], TOLERANCE);
        });

        test("skips first n positions based on the options", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 2, step: 1});
            arrayClose(positions, [0], TOLERANCE);
        });

        test("applies step", function() {
            var positions = [];
            axis.traverseMajorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 0, step: 2});
            arrayClose(positions, [520.6, 0], TOLERANCE);
        });

        // ------------------------------------------------------------
        module("axis / minor positions", {
            setup: function() {
                createAxis(1, 100, { min: 5 });
                axis.reflow(chartBox);
            }
        });

        test("passes options to callback", 14, function() {
            axis.traverseMinorTicksPositions(function(position, tickOptions) {
                ok(defaultOptions === tickOptions);
            }, defaultOptions);
        });

        test("triggers callback for each position", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position, tickOptions) {
                   positions.push(position);
                }, defaultOptions);
            arrayClose(positions, [598.9, 562.5, 531.7, 505, 481.4, 460.4, 321.8, 240.7, 183.2, 138.5, 102.1, 71.3, 44.6, 21], TOLERANCE);
        });

        test("skips first n positions for each interval based on the options", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 5, step: 1});
            arrayClose(positions, [562.5, 531.7, 505, 481.4, 102.1, 71.3, 44.6, 21], TOLERANCE);
        });

        test("applies step", function() {
            var positions = [];
            axis.traverseMinorTicksPositions(function(position) {
                positions.push(position);
            }, {skip: 0, step: 3});

            arrayClose(positions, [531.7, 460.4, 183.2, 71.3], TOLERANCE);
        });

    })();

    (function() {
        var tickLineOptions = {
                align: true,
                stroke: "red",
                strokeWidth: 5
            },
            gridLineOptions = {
                dashType: undefined,
                data: {
                    modelId: 1
                },
                stroke: "red",
                strokeWidth: 5,
                zIndex: -1
            },
            altAxis = {
                options: {
                    line: {
                       visible: true
                    }
                },
                lineBox: function() {
                    return Box();
                }
            };

        function comparePaths(actual, expected) {
            for (var idx = 0; idx < actual.length; idx++) {
                dataviz.alignPathToPixel(expected[idx]);
                sameLinePath(actual[idx], expected[idx]);
            }
        }

        // ------------------------------------------------------------
        module("axis / render / minor ticks", {
            setup: function() {
                createAxis(1, 10, {
                    minorTicks: {
                        visible: true,
                        width: 5,
                        size: 4,
                        color: "red"
                    },
                    majorTicks: {
                        visible: false
                    }
                });
                axis.reflow(chartBox);
                axis.renderVisual();
            }
        });

        test("renders minor ticks", function() {
            var lines = axis._lineGroup.children.slice(1);
            var expectedPaths = [
                new draw.Path().moveTo(21, 599).lineTo(25, 599),
                new draw.Path().moveTo(21, 419).lineTo(25, 419),
                new draw.Path().moveTo(21, 313).lineTo(25, 313),
                new draw.Path().moveTo(21, 238).lineTo(25, 238),
                new draw.Path().moveTo(21, 180).lineTo(25, 180),
                new draw.Path().moveTo(21, 133).lineTo(25, 133),
                new draw.Path().moveTo(21, 93).lineTo(25, 93),
                new draw.Path().moveTo(21, 58).lineTo(25, 58),
                new draw.Path().moveTo(21, 27).lineTo(25, 27)
            ];

            comparePaths(lines, expectedPaths);
        });

        // ------------------------------------------------------------
        module("axis / render / major ticks", {
            setup: function() {
                createAxis(1, 10, {
                    minorTicks: {
                        visible: false
                    },
                    majorTicks: {
                        visible: true,
                        width: 5,
                        size: 4,
                        color: "red"
                    }
                });
                axis.reflow(chartBox);
                axis.renderVisual();
            }
        });

        test("renders major ticks", function() {
            var lines = axis._lineGroup.children.slice(1);
            var expectedPaths = [
                new draw.Path().moveTo(21, 599).lineTo(25, 599),
                new draw.Path().moveTo(21, 0).lineTo(25, 0)
            ];
            comparePaths(lines, expectedPaths);
        });

        // ------------------------------------------------------------
        module("axis / render / minor grid lines", {
            setup: function() {
                createAxis(1, 10, {
                    minorGridLines: {
                        visible: true,
                        width: 5,
                        color: "red"
                    },
                    majorGridLines: {
                        visible: false
                    }
                });
                axis.plotArea = {
                    modelId: 1
                };
                axis.reflow(chartBox);
                axis.renderVisual();
                axis.createGridLines(altAxis);
            }
        });

        test("renders minor grid lines", function() {
            var lines = axis._gridLines.children;
            var expectedPaths = [
                new draw.Path().moveTo(0, 599).lineTo(0, 599),
                new draw.Path().moveTo(0, 419).lineTo(0, 419),
                new draw.Path().moveTo(0, 313).lineTo(0, 313),
                new draw.Path().moveTo(0, 238).lineTo(0, 238),
                new draw.Path().moveTo(0, 180).lineTo(0, 180),
                new draw.Path().moveTo(0, 133).lineTo(0, 133),
                new draw.Path().moveTo(0, 93).lineTo(0, 93),
                new draw.Path().moveTo(0, 58).lineTo(0, 58),
                new draw.Path().moveTo(0, 27).lineTo(0, 27)
            ];

            comparePaths(lines, expectedPaths);

        });

        // ------------------------------------------------------------
        module("axis / render / major grid lines", {
            setup: function() {
                createAxis(1, 10, {
                    minorGridLines: {
                        visible: false
                    },
                    majorGridLines: {
                        visible: true,
                        width: 5,
                        color: "red"
                    }
                });
                axis.plotArea = {
                    modelId: 1
                };
                axis.reflow(chartBox);
                axis.renderVisual();
                axis.createGridLines(altAxis);
            }
        });

        test("renders minor grid lines", function() {
            var lines = axis._gridLines.children;
            var expectedPaths = [
                new draw.Path().moveTo(0, 599).lineTo(0, 599),
                new draw.Path().moveTo(0, 0).lineTo(0, 0)
            ];

            comparePaths(lines, expectedPaths);
        });

    })();

    (function() {
        module("axis / labels", {
            setup: function() {
                createAxis(1, 110, { min: 5});
            }
        });

        test("labels count is equal to the number of whole powers between min and max", function() {
            equal(axis.labelsCount(), 2);
        });

        test("labels value is equal to base on power min power plus index", function() {
            var label1 = axis.createAxisLabel(0, {}),
                label2 = axis.createAxisLabel(1, {});

            equal(label1.value, 10);
            equal(label2.value, 100);
        });

    })();

    (function() {
        var ACTUAL_TICK_SIZE = 5;
        var MARGIN = 5;
        var axisBox;
        var axis;

        function LabelMock(box) {
            this.box = box;
            this.options = {};
            this.reflow = function(box) {
                this.box = box;
            };
        }

        // ------------------------------------------------------------
        module("Logarithmic Axis / Horizontal / reflow", {
            setup: function() {
                axis = new LogarithmicAxis(0.1, 1, { vertical: false, margin: MARGIN });
                axis.labels = [new LabelMock(Box(0, 0, 20, 20)), new LabelMock(Box(0, 0, 20, 30))];
                axis.parent = {
                    box: new Box(0, 0, 100, 100),
                    getRoot: function() {
                        return this;
                    }
                };
                axisBox = new Box(0, 0, 50, 50);
                axis.getActualTickSize = function() {
                    return ACTUAL_TICK_SIZE;
                };
            }
        });

        test("box height is equal to the maximum label height plus the tick size plus the margin ", function() {
            axis.reflow(axisBox);
            equal(axis.box.height(), 30 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("box height includes title height if title is set", function() {
            axis.title = new LabelMock(Box(0, 0, 20, 40));
            axis.reflow(axisBox);
            equal(axis.box.height(), 70 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("only labels with height that can be fitted in the container box are taken into account", function() {
            axis.labels.push(new LabelMock(Box(0, 0, 20, 101 - ACTUAL_TICK_SIZE - MARGIN)));
            axis.reflow(axisBox);
            equal(axis.box.height(), 30 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("only labels with height that can be fitted in the container box including the title are taken into account", function() {
            axis.title = new LabelMock(Box(0, 0, 20, 40));
            axis.labels.push(new LabelMock(Box(0, 0, 20, 61 - ACTUAL_TICK_SIZE - MARGIN)));
            axis.reflow(axisBox);
            equal(axis.box.height(), 70 + ACTUAL_TICK_SIZE + MARGIN);
        });

        // ------------------------------------------------------------
        module("Logarithmic Axis / Vertical / reflow", {
            setup: function() {
                axis = new LogarithmicAxis(0.1, 1, { vertical: true, margin: MARGIN });
                axis.labels = [new LabelMock(Box(0, 0, 20, 20)), new LabelMock(Box(0, 0, 30, 20))];
                axis.parent = {
                    box: new Box(0, 0, 100, 100),
                    getRoot: function() {
                        return this;
                    }
                };
                axisBox = new Box(0, 0, 50, 50);
                axis.getActualTickSize = function() {
                    return ACTUAL_TICK_SIZE;
                };
            }
        });

        test("box width is equal to the maximum label width plus the tick size plus the margin", function() {
            axis.reflow(axisBox);
            equal(axis.box.width(), 30 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("box width includes title width if title is set", function() {
            axis.title = new LabelMock(Box(0, 0, 40, 20));
            axis.reflow(axisBox);
            equal(axis.box.width(), 70 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("only labels with width that can be fitted in the container box are taken into account", function() {
            axis.labels.push(new LabelMock(Box(0, 0, 101 - ACTUAL_TICK_SIZE - MARGIN, 20)));
            axis.reflow(axisBox);
            equal(axis.box.width(), 30 + ACTUAL_TICK_SIZE + MARGIN);
        });

        test("only labels with width that can be fitted in the container box including the title are taken into account", function() {
            axis.title = new LabelMock(Box(0, 0, 40, 20));
            axis.labels.push(new LabelMock(Box(0, 0, 61 - ACTUAL_TICK_SIZE - MARGIN, 20)));
            axis.reflow(axisBox);
            equal(axis.box.width(), 70 + ACTUAL_TICK_SIZE + MARGIN);
        });
    })();

(function() {
        var TOLERANCE = 0.01;

        function setupAxis(min, max) {
            createAxis(1, 100, {
                min: min,
                max: max
            });
            axis.reflow(chartBox);
        }

        module("pan");

        test("translates range positive delta", function() {
            setupAxis(10, 20)
            var range = axis.pan(10);
            close(range.min, 9.88, TOLERANCE);
            close(range.max, 19.76, TOLERANCE);
        });

        test("translates range negative delta", function() {
            setupAxis(10, 20)
            var range = axis.pan(-10);
            close(range.min, 10.11, TOLERANCE);
            close(range.max, 20.23, TOLERANCE);
        });

        test("returns no result if new range exceeds maximum", function() {
            setupAxis(10, 100);
            var range = axis.pan(-10);
            ok(!range);
        });

        test("returns no result if new range exceeds minimum", function() {
            setupAxis(1, 20);
            var range = axis.pan(10);
            ok(!range);
        });

    })();

    (function() {
        var TOLERANCE = 0.01;

        module("pointsRange", {
            setup: function() {
                createAxis(1, 100, {});
                axis.reflow(chartBox);
            }
        });

        test("returns value range based on the passed points", function() {
            var range = axis.pointsRange({ x: 100, y: 200}, {x: 100, y: 100});

            close(range.min, 21.48, TOLERANCE);
            close(range.max, 46.35, TOLERANCE);
        });

        test("the range min value is smaller than the max value if the start point value is bigger than the end point value", function() {
            var range = axis.pointsRange({ x: 100, y: 100}, {x: 100, y: 200});

            close(range.min, 21.48, TOLERANCE);
            close(range.max, 46.35, TOLERANCE);
        });

    })();

    (function() {
        var TOLERANCE = 0.01;

        function setupAxis(min, max) {
            createAxis(1, 100000, {
                min: min,
                max: max
            });
            axis.reflow(chartBox);
        }

        module("zoomRange");

        test("scales range positive delta", function() {
            setupAxis(10, 10000);
            var range = axis.zoomRange(1);
            equal(range.min, 100);
            equal(range.max, 1000);
        });

        test("scales range negative delta", function() {
            setupAxis(100, 1000);
            var range = axis.zoomRange(-1);
            equal(range.min, 10);
            equal(range.max, 10000);
        });

        test("scales range positive delta", function() {
            setupAxis(10, 10000);
            var range = axis.zoomRange(1);
            equal(range.min, 100);
            equal(range.max, 1000);
        });

        test("returns nothing if the range becomes smaller than a unit", function() {
            setupAxis(10, 1500);
            var range = axis.zoomRange(1);
            ok(!range);
        });

        test("returns nothing if the current minimum and maximum value are equal to the total minumum and maximum", function() {
            setupAxis(1, 100000);
            var range = axis.zoomRange(-1);
            ok(!range);
        });

        test("scales range if the current minimum is equal to the total minimum", function() {
            setupAxis(1, 1000);
            var range = axis.zoomRange(-1);
            equal(range.min, 1);
            equal(range.max, 10000);
        });

        test("scales range if the current maximum is equal to the total maximum", function() {
            setupAxis(10, 100000);
            var range = axis.zoomRange(-1);
            equal(range.min, 1);
            equal(range.max, 100000);
        });

    })();

})();

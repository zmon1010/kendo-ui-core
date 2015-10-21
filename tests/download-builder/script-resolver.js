(function() {
    // ------------------------------------------------------------
    var resolver;
    function createResolver(config) {
        resolver = new ScriptResolver(config);
    }

    module("ScriptResolver");

    test("component with no dependencies", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }]);

        resolver.addComponent("a");

        deepEqual(resolver.scripts, [ "a.js" ]);
    });

    test("component with single dependency", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }, {
            id: "b",
            source: "b.js",
            depends: [ "a" ]
        }]);

        resolver.addComponent("b");

        deepEqual(resolver.scripts, [ "a.js", "b.js" ]);
    });

    test("includes common dependency only once", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }, {
            id: "b",
            source: "b.js",
            depends: [ "a" ]
        }, {
            id: "c",
            source: "c.js",
            depends: [ "a" ]
        }]);

        resolver.addComponent("b");
        resolver.addComponent("c");

        deepEqual(resolver.scripts, [ "a.js", "b.js", "c.js" ]);
    });

    test("depending features are included", function() {
        createResolver([{
            id: "a",
            source: "a.js",
            features: [{
                id: "a-1",
                depends: [ "b" ]
            }]
        }, {
            id: "b",
            source: "b.js"
        }]);

        resolver.addComponent("a", [ "a-1" ]);

        deepEqual(resolver.scripts, [ "b.js", "a.js" ]);
    });

    test("mixins are included before components", function() {
        createResolver([{
            id: "a",
            source: "a.js",
            features: [{
                id: "a-1",
                depends: [ "b" ]
            }]
        }, {
            id: "b",
            mixin: true,
            source: "b.js"
        }, {
            id: "c",
            depends: [ "a" ],
            source: "c.js"
        }]);

        resolver.addComponent("c");
        resolver.addComponent("a", [ "a-1" ]);

        deepEqual(resolver.scripts, [ "b.js", "a.js", "c.js" ]);
    });

    test("signals missing components", function() {
        createResolver([]);

        throws(function() {
            resolver.addComponent("a");
        }, function(error) {
            return error.message ===
                "Missing configuration for a";
        });
    });

    test("signals missing dependencies", function() {
        createResolver([{
            id: "a",
            source: "a.js",
            depends: [ "b" ]
        }]);

        throws(function() {
            resolver.addComponent("a");
        }, function(error) {
            return error.message ===
                "Unable to resolve b required by a";
        });
    });

    test("signals circular dependencies", 1, function() {
        createResolver([{
            id: "a",
            source: "a.js",
            depends: [ "b" ]
        }, {
            id: "b",
            source: "b.js",
            depends: [ "a" ]
        }]);

        throws(function() {
            resolver.addComponent("a");
        }, function(error) {
            return error.message ===
                "Circular dependancy for a";
        });
    });

    test("signals missing features", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }]);

        throws(function() {
            resolver.addComponent("a", [ "f" ]);
        }, function(error) {
            return error.message ===
                "Missing feature f for a";
        });
    });

    test("registers resolved components", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }]);

        resolver.addComponent("a");

        deepEqual(resolver.resolved, ["a"]);
    });

    test("does not register resolved component twice", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }]);

        resolver.addComponent("a");
        resolver.addComponent("a");

        deepEqual(resolver.resolved, ["a"]);
    });

    test("registers deferred components", function() {
        createResolver([{
            id: "a",
            source: "a.js"
        }, {
            id: "b",
            source: "b.js",
            defer: true
        }, {
            id: "c",
            source: "c.js"
        }]);

        resolver.addComponent("a");
        resolver.addComponent("b");
        resolver.addComponent("c");

        deepEqual(resolver.scripts, ["a.js", "c.js", "b.js"]);
    });
})();

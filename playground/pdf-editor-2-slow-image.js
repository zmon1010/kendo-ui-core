#! /usr/bin/env node

const http = require("http");
const fs = require("fs");
const url = require("url");
const hostname = "0.0.0.0";
const port = 1337;

http.createServer(function(req, res) {
    var q = url.parse(req.url, true).query;
    if (q.sleep) {
        setTimeout(doit, parseFloat(q.sleep));
    } else {
        doit();
    }
    function doit() {
        res.writeHead(200, {
            "Content-Type"                : "image/png",
            "Access-Control-Allow-Origin" : "*"
        });
        var data = fs.readFileSync("./kendo-ui-web.png");
        res.end(data);
    }
}).listen(port, hostname, function (){
    console.log("Server running on %s:%d", hostname, port);
});

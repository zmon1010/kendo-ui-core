#! /home/mishoo/node-v4.1.1-linux-x64/bin/node

var path = require("path");
var fs = require("fs");
var $ = require("cheerio");
// var http = require("http");
var cheerio = require("cheerio");
var upndown = require("upndown");

var OpenFormula = (function(){
    var html = fs.readFileSync(FILER("OpenFormula.html"), "utf8");
    return cheerio.load(html);
})();

var Excel = (function(){
    var html = fs.readFileSync(FILER("Office.html"), "utf8");
    return cheerio.load(html);
})();

function load() {
    var files = [
        FILER("../../src/spreadsheet/runtime.js"),
        FILER("../../src/spreadsheet/runtime.functions.js"),
        FILER("../../src/spreadsheet/runtime.functions.2.js"),
    ];
    var kendo = {
        spreadsheet: {},
        Class: {
            extend: function() {}
        },
        util: {
            memoize: function() {}
        }
    };
    var code = files.map(function(file){
        return fs.readFileSync(file, "utf8");
    }).join("\n\n");

    new Function("kendo", code)(kendo);

    return kendo.spreadsheet.calc.runtime.FUNCS;
}

var TEMPLATE = fs.readFileSync(FILER("fundoc.template"), "utf8");

var FUNCS = load();
var FNAMES = Object.keys(FUNCS).sort(alpha).filter(function(funcName){
    return /[a-z0-9]$/i.test(funcName);
});

// FNAMES = [ "linest" ];

var DOC = [];

(function loop(FNAMES, callback){
    if (FNAMES.length > 0) {
        var funcName = FNAMES[0];
        var func = FUNCS[funcName];
        var args = func.kendoSpreadsheetArgs;
        funcName = funcName.toUpperCase();
        if (funcName == "IF") {
            args = [
                [ "condition", "*logical" ],
                [ "consequent", "*anyvalue" ],
                [ "alternative", "*anyvalue" ]
            ];
        }
        console.error("--- " + funcName);
        funcDescription(funcName, function(err, desc){
            if (err == "UNDOC") {
                loop(FNAMES.slice(1), callback);
            } else if (err) {
                console.error(err);
                throw err;
            } else {
                documentArgs(args, function(err, args){
                    DOC.push(template({
                        fname     : funcName,
                        shortdesc : desc,
                        args      : args
                    }));
                    loop(FNAMES.slice(1), callback);
                });
            }
        });
    } else {
        callback();
    }
})(FNAMES, function(){
    console.log(DOC.join("\n\n\n"));
});

function alpha(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? -1 : a > b ? 1 : 0;
}

function template(x) {
    var str = TEMPLATE;
    str = str.replace(/_FNAME_/g, x.fname);
    str = str.replace(/_SHORTDESC_/g, x.shortdesc);
    str = str.replace(/_ARGS_/g, x.args);
    return str;
}

// function funcDescription(name, callback) {
//     getDocs(function(docs){
//         var x = docs[name];
//         var desc = x && x.descr || "Write me";
//         callback(null, desc);
//     });
// }

// var DOCS = null;
// function getDocs(callback) {
//     if (DOCS) {
//         return callback(DOCS);
//     }
//     var docs = fs.readFileSync(FILER("fundoc.csv"), "utf8");
//     csv.parse(docs, function(err, data){
//         DOCS = {};
//         data.forEach(function(data){
//             var fname = data[0];
//             var categ = data[1];
//             var x2010 = data[2];
//             var x2007 = data[3];
//             var x2003 = data[4];
//             var descr = data[5];
//             DOCS[fname.toUpperCase()] = {
//                 fname: fname,
//                 categ: categ,
//                 descr: descr
//             };
//         });
//         callback(DOCS);
//     });
// }

function funcDescription(name, callback) {
    var start = OpenFormula("#" + name).first();
    var html;
    if (start.length == 0) {
        start = Excel('a[title="' + name + ' function"]');
        if (start.length == 0) {
            console.error("!!! " + name + " undocumented");
            //html = "<p>Undocumented (<a href='http://google.com/?q=Excel%20Function%20" + name + "'>try Google</a>).</p>";
            return callback("UNDOC");
        } else {
            var summary = start.closest("td").next("td");
            html = summary.html();
        }
    } else {
        var summary = start.closest("h3").next("p");
        //summary.find("span.Label").replaceWith("<b>Summary:</b> ");
        summary.find("span.Label").remove();
        summary.find("span").each(function(){
            var el = cheerio(this);
            el.replaceWith(el.children());
        });
        html = "<p>" + summary.html() + "</p>";
    }
    html += "<p><a href='http://google.com/?q=Excel%20Function%20" + name + "'>Search Google</a> for more information.</p>";
    new upndown().convert(html, function(err, desc){
        if (!err) {
            callback(null, desc);
        } else {
            console.error("Error (to markdown): ", err);
            throw "blerg";
        }
    });
}

// function funcDescription(name, callback) {
//     var cache;
//     try {
//         cache = fs.readFileSync(REL("fundoc.cache"), "utf8");
//         cache = JSON.parse(cache);
//         if (Object.prototype.hasOwnProperty.call(cache, name)) {
//             callback(null, cache[name].desc);
//         } else {
//             fetchDescription(name, next);
//         }
//     } catch(ex) {
//         cache = {};
//         fetchDescription(name, next);
//     }
//     function next(err, desc) {
//         if (!err) {
//             cache[name] = { desc: desc };
//             var str = JSON.stringify(cache, null, 2);
//             fs.writeFileSync(REL("fundoc.cache"), str, "utf8");
//             callback(null, desc);
//         }
//     }
// }

// function fetchDescription(name, callback) {
//     var url = "http://www.techonthenet.com/excel/formulas/" + name.toLowerCase() + ".php";
//     http.get(url, function(res){
//         var body = "";
//         res.on("data", function(d){
//             body += d;
//         });
//         res.on("end", function(){
//             var $ = cheerio.load(body);
//             var div = $("div.section:contains(Description)");
//             div.find("h2").remove();
//             div.find("pre.notranslate").removeClass("notranslate");
//             new upndown().convert(div.html(), function(err, shortdesc){
//                 if (!err) {
//                     callback(null, shortdesc);
//                 } else {
//                     console.log(err);
//                     throw "blerg";
//                 }
//             });
//         });
//     });
// }

function FILER(filename) {
    return path.join(__dirname, filename);
}

function documentArgs(args, callback) {

    var html = docArgs(args);
    new upndown().convert(html, callback);
    return;

    function docArgs(args) {
        var doc = "<ul>";
        var constraints = [];
        args.forEach(function(arg){
            var info = docArg(arg);
            if (info) {
                doc += info;
            }
        });
        doc += "</ul>";
        if (constraints.length > 0) {
            constraints = "<ul>" + constraints.join("") + "</ul>";
        }
        return doc + constraints;

        function docArg(arg) {
            var name = arg[0];
            if (Array.isArray(name)) {
                // repeat zero or more times
                return "<li>Zero or more of:" + docArgs(arg) + "</li>";
            } else if (name == "+") {
                // at least one occurrence, repeat allowed
                return "<li>At least once:" + docArgs(arg.slice(1)) + "</li>";
            } else if (name == "?") {
                // arbitrary constraint
                //constraints += docConstraint(arg[1]);
                return "";
            } else {
                // ordinary argument
                return "<li><b>" + name + "</b>: " + docType(arg[1]) + "</li>";
            }
        }

        function literal(thing) {
            //return "<code>" + thing.toString().replace(/\$([a-z0-9_]+)/g, "<b>$1</b>") + "</code>";
            return thing.toString().replace(/\$([a-z0-9_]+)/ig, "<b>$1</b>");
        }

        function makeOr(list) {
            return list.join(", or ");
        }

        function makeAnd(list) {
            return list.join(", and ");
        }

        function fixOptional(a) {
            for (var i = 0; i < a.length; ++i) {
                var el = a[i];
                if ((Array.isArray(el) && el[0] == "null") || el == "null") {
                    a.splice(i, 1);
                    a.unshift(el);
                    return a;
                }
            }
            return a;
        }

        function docType(type) {
            if (Array.isArray(type)) {
                switch (type[0]) {
                  case "or":
                    return makeOr(fixOptional(type.slice(1)).map(docType));
                  case "and":
                    return makeAnd(type.slice(1).map(docType));
                  case "values":
                    return "one of: " + type.slice(1).map(literal).join(", ");
                  case "not":
                    return "not " + docType(type[1]);
                  case "null":
                    return "optional (default: " + literal(type[1]) + ")";
                  case "between":
                  case "[between]":
                    return "must be &gt;= " + literal(type[1]) + " and &lt;= " + literal(type[2]);
                  case "[between)":
                    return "must be &gt;= " + literal(type[1]) + " and &lt; " + literal(type[2]);
                  case "(between]":
                    return "must be &gt; " + literal(type[1]) + " and &lt;= " + literal(type[2]);
                  case "(between)":
                    return "must be &gt; " + literal(type[1]) + " and &lt; " + literal(type[2]);
                  case "assert":
                    return literal(type[1]);
                  case "collect":
                  case "#collect":
                    return "array of " + docType(type[1]);
                }
            }
            if (/^\*/.test(type)) {
                type = type.substr(1);
            }
            switch (type) {
              case "number":
                return "number";
              case "number+":
                return "pozitive number";
              case "number++":
                return "non-zero pozitive number";
              case "integer":
                return "integer";
              case "integer+":
                return "pozitive integer";
              case "integer++":
                return "non-zero pozitive integer";
              case "date":
                return "date (integer serial number)";
              case "datetime":
                return "date/time (serial number)";
              case "divisor":
                return "non-zero number";
              case "string":
                return "string";
              case "boolean":
                return "boolean";
              case "logical":
                return "logical";
              case "matrix":
              case "#matrix":
                return "matrix";
              case "ref":
                return "reference";
              case "area":
                return "cell or Range reference";
              case "null":
                return "optional";
              case "anyvalue":
              case "anything":
              case "force":
                return "any value";
              case "blank":
                return "blank cell";
              case "rest":
                return "any number of arguments may follow";
            }
        }
    }
}



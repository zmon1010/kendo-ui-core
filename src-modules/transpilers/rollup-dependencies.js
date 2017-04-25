const replace = require('gulp-replace');
const utils = require('./utils');
const inStringOrComment = utils.inStringOrComment;
const isUpperCase = utils.isUpperCase;

const NEW_LINE = "\n";
const EXPORTS_REGEX = /(^exports\.\w+ = (.*?);$\n)+/gm;
const EXPORT_NAME_REGEX = /exports\.(\w+) = (.*?);/g;
const DEPENDENCIES_REGEX = /\(function \(exports,?(.*?)\)\s*{([\s\S]*)}\(\(this.(\w+(?:\.\w+)*) = this.(?:\w+(?:\.\w+)*) \|\| \{\}\),?(.*?)\)\);/gm;

function replaceExports(options) {
    const assignExport = (options || {}).assignExport || [];
    return replace(EXPORTS_REGEX, function (match) {
        var extended = [];
        var exports = match.replace(EXPORT_NAME_REGEX, function(match, exportName, name) {
            if (assignExport.indexOf(name) >= 0)  {
                return match;
            } else {
                extended.push(`    ${ exportName }: ${ name }`);
                return '';
            }
        });

        if (extended.length) {
            extended = extended.join(',' + NEW_LINE);
            exports += `kendo.deepExtend(exports, {${ NEW_LINE }${ extended }${ NEW_LINE }});`;
        }

        return exports;
    });
}

function addPrefix(match, prefixes) {
    var names = match.split(".");
    var parent = prefixes;
    for (var idx = 0; idx < names.length - 1; idx++) {
        var name = names[idx];
        if (isUpperCase(name)) {
            parent[name] = "";
            return;
        }
        if (!parent[name]) {
            parent[name] = {};
        }
        parent = parent[name];
    }
    parent[names[names.length - 1]] = "";
}

function joinCamelCase(name) {
    var names = name.split(".");
    var result = names[0];
    for (var idx = 1; idx < names.length; idx++) {
        result += names[idx].charAt(0).toUpperCase() + names[idx].substr(1);
    }

    return result;
}

function joinUpperCase(name) {
    var names = name.split(".");
    var result = "";
    for (var idx = 0; idx < names.length; idx++) {
        result += names[idx].charAt(0).toUpperCase() + names[idx].substr(1);
    }

    return result;
}

function getName(field, namespacePath, result) {
    var name = field;
    if (result.resolved[field] || result.str.indexOf(`var ${ field } =`) >= 0) {
        name = isUpperCase(field) ? joinUpperCase(namespacePath) : joinCamelCase(namespacePath);
    }
    return name;
}

function resolveDeps(prefixes, currentPath, nameSpace, result) {
    for (var field in prefixes) {
        var fieldPath = (currentPath ? currentPath + "." : "") + field;

        if (result.exclude.indexOf(fieldPath) >= 0) {
            continue;
        }

        var namespacePath = nameSpace ? nameSpace + "." + field : field;
        var name = getName(field, namespacePath, result);
        var fieldPathRegex = new RegExp(fieldPath.replace(/\./g, "\\.") + "\\b", "g");
        var occuranceCount = (result.str.match(fieldPathRegex) || []).length;
        var isNamespace = prefixes[field];
        var addVar = isNamespace || occuranceCount > 3;
        if (addVar) {
            result.resolved[name] = true;
        }

        if (nameSpace && addVar) {
            result.deps.push(`var ${ name } = ${ namespacePath };`);
        }

        if (isNamespace) {
            resolveDeps(prefixes[field], fieldPath, name, result);
        } else {
            if (!addVar) {
                name = namespacePath;
            }
            result.str = result.str.replace(fieldPathRegex, name);
        }
    }
}

function simplifyDependencies(str, depNames, exclude) {
    var prefixes = {};
    exclude = exclude || [];

    for (var idx = 0; idx < depNames.length; idx++) {
        if (exclude.indexOf(depNames[idx]) < 0) {
            var reg = new RegExp(`\\b${ depNames[idx]}(?:\\.\\w+)+`, "g");
            while(match = reg.exec(str)) {
                addPrefix(match[0], prefixes);
            }
        }
    }

    var result = {
        str: str,
        deps: [],
        resolved: {},
        exclude: exclude
    };

    resolveDeps(prefixes, "", "", result);

    return result.deps.join(NEW_LINE) + NEW_LINE + result.str;
}

function replaceDependencies(options) {
    var options = options || {};

    return replace(DEPENDENCIES_REGEX, function dependenciesReplaceHandler(match, args, body, moduleName, deps) {
        var argNames = args.split(",");
        var depNames = deps.split(",");
        argNames.push("exports");
        depNames.push(moduleName);

        for (var idx = 0; idx < argNames.length; idx++) {
            var name = argNames[idx];
            var defaultImport = `${ name } = 'default' in ${ name } ? ${ name }['default'] : ${ name };`;
            if (body.indexOf(defaultImport) >= 0 ) {
                body = body.replace(defaultImport, `var ${ name } = ${ depNames[idx] };`);
            } else {
                body = body.replace(new RegExp(`\\b${ name }\\b`, "g"), function(match, index) {
                    return inStringOrComment(body, index) ? match: depNames[idx];
                });
            }
        }

        return `window.${ moduleName } = window.${ moduleName } || {};${ NEW_LINE }` + simplifyDependencies(body, depNames, options.exclude);
    });
}

module.exports = {
    replaceExports: replaceExports,
    replaceDependencies: replaceDependencies
};
const utils = require('./utils');
const indent = utils.indent;
const inStringOrComment = utils.inStringOrComment;

const NEW_LINE = "\n";
const DOUBLE_NEW_LINE = NEW_LINE + NEW_LINE;
const superRegex = /super(\.\w+)?\((?:\);)?/mg;
const methodRegex = /(static\s+)?((?:get|set)\s+)?(\w+)(\(.*?\))\s*{/gm;
const classRegex = /^class (\w+) (?:extends (\w+(?:\.\w+)*) )?{/gm;
const blockRegex = /[}{]/gm;


function endOfBlock(str) {
    var startIndex = str.indexOf("{");
    if (startIndex === -1) {
        return str;
    }

    var openedBlocks = 0;
    var match;

    blockRegex.lastIndex = 0;

    do {
        match = blockRegex.exec(str);
        if (!inStringOrComment(str, match.index)) {
            if (( match || [])[0] === "{") {
                openedBlocks++;
            } else {
                openedBlocks--;
            }
        }
    } while(match && openedBlocks > 0);

    if (openedBlocks > 0) {
        throw new Error("Unexpected end of input");
    }

    return blockRegex.lastIndex;
}

function getExternalDefinition(members) {
    var externalDefinitions = [];
    if (members.static) {
        externalDefinitions.push(members.static);
    }

    if (members.properties) {
        externalDefinitions.push(members.properties);
    }

    if (members.staticProperties) {
        externalDefinitions.push(members.staticProperties);
    }

    var result = externalDefinitions.join(DOUBLE_NEW_LINE);

    if (result) {
        result = DOUBLE_NEW_LINE + result;
    }

    return result;
}

function getDefinition(name, members, baseClass) {

    var result;
    var classBody = members.instance;
    var externalDefinitions = getExternalDefinition(members);

    if (!baseClass) {
        baseClass = 'kendo.Class';
    }

    result =
`var ${ name } = ${ baseClass }.extend({
${ indent(classBody, 4) }
});${ externalDefinitions }`;

    return result;
}


function replaceClass(result, start, end, definition) {
    return result.substr(0, start) + definition + result.substr(end);
}

function replaceSuperCalls(body, baseClass) {
    return body.replace(superRegex, function(match, methodName, index) {
        var lastChar = body.charAt(index + match.length - 1);
        var selfClosing = lastChar === ";";
        if (selfClosing && !methodName && baseClass === "Class") {
            return "";
        }
        if (!methodName) {
            methodName = ".init";
        }

        return `${ baseClass }.fn${ methodName }.call(this` + (selfClosing ? ");" : ", ");
    });
}

function addPropertyDefinition(properties, name, accessor, parameters, body) {
    properties[name] = properties[name] || [];
    var accessorName = accessor.indexOf('get') >=0 ? 'get' : 'set';

    properties[name].push(`${ accessorName }: function${ parameters } {${ body }}`);
}

function propertiesDefinition(objName, properties) {
    if (Object.keys(properties).length) {
        var result = [];
        var fieldAccessors;
        for (var field in properties) {
            fieldAccessors = NEW_LINE + indent(properties[field].join(',' + NEW_LINE), 4) + NEW_LINE;
            result.push(`${ field }: {${ fieldAccessors }}`);
        }
        var definition = `Object.defineProperties(${ objName }, {${ NEW_LINE }${ indent(result.join(',' + NEW_LINE), 4) }${ NEW_LINE }});`;
        return `if (Object.defineProperties) {${ NEW_LINE }${ indent(definition, 4) }${ NEW_LINE }}`;

    }

    return '';
}

function getClassMethods(classBody, className) {
    var firstMethod = true;
    var firstProperty = true;
    var firstStaticProperty = true;
    var methods = [];
    var staticMethods = [];
    var properties = {};
    var staticProperties = {};
    var match;

    methodRegex.lastIndex = 0;

    do {
        match = methodRegex.exec(classBody);
        if (match && !inStringOrComment(classBody, match.index)) {
            var matchLength = match[0].length;
            var isStatic = match[1];
            var property = match[2];
            var name = match[3];
            var parameters = match[4];
            var bodyStart = match[0].length + match.index;
            var end = endOfBlock(classBody.substr(bodyStart - 1));
            methodRegex.lastIndex = bodyStart + end + 1;
            var methodBody = indent(classBody.substr(bodyStart, end - 2), -4);
            if (property) {
                addPropertyDefinition(isStatic ? staticProperties : properties, name, property, parameters, methodBody);
            } else if (isStatic) {
                staticMethods.push(`${ className }.${ name } = function${ parameters } {${ methodBody }};`);
            } else {
                if (name === "constructor") {
                    name = "init";
                }
                methods.push(`${ name }: function${ parameters } {${ methodBody }}`);
                firstMethod = false;
            }
        }
    } while(match);

    return {
        instance: methods.join("," + DOUBLE_NEW_LINE),
        static: staticMethods.join(DOUBLE_NEW_LINE),
        properties: propertiesDefinition(className + ".fn", properties),
        staticProperties: propertiesDefinition(className, staticProperties)
    };
}

function transpileClasses(str) {
    classRegex.lastIndex = 0;
    var lastIndex = 0;

    var result = str;

    do {
        var match = classRegex.exec(result);
        if (match) {
            var end = endOfBlock(result.substr(match.index));
            var body = result.substr(match.index, end);
            var name = match[1];
            var baseClass = match[2];
            if (baseClass) {
                body = replaceSuperCalls(body, baseClass);
            }
            var methods = getClassMethods(body, name);
            var definition = getDefinition(name, methods, baseClass);

            result = replaceClass(result, match.index, match.index + end, definition);
        }
    } while(match);

    return result;
}

module.exports = transpileClasses;
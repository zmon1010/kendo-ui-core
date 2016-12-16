const indentRegex = /^/gm;

function indent(str, spaces) {
    if (spaces > 0) {
        return str.replace(indentRegex, new Array(spaces + 1).join(" "));
    } else {
        return str.replace(new RegExp("^[ ]{" + Math.abs(spaces) + "}", "gm"), "");
    }
}

function inStringOrComment(str, index) {
    var line = str.substring(str.lastIndexOf("\n", index) + 1, index);
    line = line.replace(/'.*?'/g, "").replace(/".*?"/g, "");
    return line.indexOf("'") >= 0 || line.indexOf('"') >= 0 || line.indexOf("//") >= 0;
}

function isUpperCase(value) {
    return value.charAt(0) === value.toUpperCase().charAt(0);
}

module.exports = {
    indent: indent,
    inStringOrComment: inStringOrComment,
    isUpperCase: isUpperCase
};
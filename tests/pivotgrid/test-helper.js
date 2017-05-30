/* exported equalArrays */
function equalArrays(actual, expected) {
    equal(actual.length, expected.length, "{expected length: " + expected.length + ", actual length: " + actual.length);

    for (var i = 0; i < expected.length; i++) {
        equal(actual[i].value, expected[i].value,
            "{expected: " + expected[i].value + ", actual: " + actual[i].value + ", at index: " + i + "}");
    }
}

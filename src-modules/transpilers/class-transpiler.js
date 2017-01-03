const rollupPluginutils = require('rollup-pluginutils');
const transpileClasses = require('./transpile-classes');

function classTranspiler(options) {
	options = options || {};

	var filter = rollupPluginutils.createFilter( options.include, options.exclude );

    options.transforms = options.transforms || {};
	options.transforms.modules = false;

	return {
		name: 'class-transpiler',

		transform: function ( code, id ) {
			if (!filter(id)) {
                return null;
            }

			return transpileClasses(code);
		}
	};
}

module.exports = classTranspiler;
module.exports = function() {
	var base =  './';
	var dest = './kendo-ui-core/';
	
	var config = {
		base: base,
		base_core: base + 'core-files/', 
		dest: dest
	};

	config.cleanFiles = [
		dest + "*",
		dest + ".*",
		'!' + dest + '.git'
	];

	var rootFiles = [
		'.gitattributes',
		'.gitignore',
		'.gitmodules',
		'.travis.yml',
		'CONTRIBUTING.md',
		'LICENSE.md',
		'README.md',
		'VERSION',
		'gulpfile.js',
		'package.json',
	].map(name => config.base_core + name);

	var buildFolders = [ config.base_core + 'build/**/*' ];

	var resourcesFolders = [ config.base_core + 'resources/**/*' ];

	var githubFiles = [ config.base + '.github/ISSUE_TEMPLATE.md' ];

	var examplesFolders = [ config.base + 'examples/**/*' ];

	var docsFolders = [
		'docs/**/*',
		'docs/.*',
		'docs-aspnet-core/**/*',
		'docs-aspnet-core/.*',
		'docs-aspnet-mvc/**/*',
		'docs-aspnet-mvc/.*',
	].map(name => config.base + name);

	var srcFolders = [
		'cultures/**/*','messages/**/*',
		'angular.js','angular.min.js','jquery.js','jquery.min.js','jquery.min.map',
		'kendo.angular.js','kendo.autocomplete.js','kendo.binder.js','kendo.button.js',
		'kendo.calendar.js','kendo.color.js','kendo.colorpicker.js','kendo.combobox.js',
		'kendo.core.js','kendo.data.js','kendo.data.odata.js','kendo.data.signalr.js',
		'kendo.data.xml.js','kendo.dateinput.js','kendo.datepicker.js',
		'kendo.datetimepicker.js','kendo.dialog.js','kendo.draganddrop.js',
		'kendo.dropdownlist.js','kendo.editable.js','kendo.fx.js','kendo.list.js',
		'kendo.listbox.js','kendo.listview.js','kendo.maskedtextbox.js','kendo.menu.js',
		'kendo.mobile.actionsheet.js','kendo.mobile.application.js',
		'kendo.mobile.button.js','kendo.mobile.buttongroup.js',
		'kendo.mobile.collapsible.js','kendo.mobile.drawer.js',
		'kendo.mobile.listview.js','kendo.mobile.loader.js','kendo.mobile.modalview.js',
		'kendo.mobile.navbar.js','kendo.mobile.pane.js','kendo.mobile.popover.js',
		'kendo.mobile.scroller.js','kendo.mobile.scrollview.js','kendo.mobile.shim.js',
		'kendo.mobile.splitview.js','kendo.mobile.switch.js','kendo.mobile.tabstrip.js',
		'kendo.mobile.view.js','kendo.multiselect.js','kendo.notification.js',
		'kendo.numerictextbox.js','kendo.pager.js','kendo.panelbar.js','kendo.popup.js',
		'kendo.progressbar.js','kendo.resizable.js','kendo.responsivepanel.js',
		'kendo.router.js','kendo.selectable.js','kendo.slider.js','kendo.sortable.js',
		'kendo.splitter.js','kendo.tabstrip.js','kendo.timepicker.js','kendo.toolbar.js',
		'kendo.tooltip.js','kendo.touch.js','kendo.ui.core.js','kendo.userevents.js',
		'kendo.validator.js','kendo.view.js','kendo.virtuallist.js',
		'kendo.webcomponents.js','kendo.window.js',
	].map(name => config.base + 'src/' + name);

	var stylesFolders = [		
		'common/transitions.less','mobile/android/*','mobile/blackberry/*',
		'mobile/common/*','mobile/flat/*','mobile/images/*','mobile/ios/*',
		'mobile/ios7/*','mobile/material/*','mobile/nova/*','mobile/wp8/*',
		
		'mobile/kendo.mobile.all.less','mobile/kendo.mobile.android.dark.less',
		'mobile/kendo.mobile.android.light.less','mobile/kendo.mobile.blackberry.less',
		'mobile/kendo.mobile.common.less','mobile/kendo.mobile.flat.less',
		'mobile/kendo.mobile.ios.less','mobile/kendo.mobile.material.less',
		'mobile/kendo.mobile.meego.less','mobile/kendo.mobile.wp8.less',
		'mobile/meego.less',

		'web/Black/**/*','web/BlueOpal/**/*','web/Bootstrap/**/*','web/Default/**/*',
		'web/Fiori/markers.png','web/Fiori/markers_2x.png','web/Flat/**/*',
		'web/HighContrast/**/*','web/Material/**/*','web/MaterialBlack/**/*',
		'web/Metro/**/*','web/MetroBlack/**/*','web/Moonlight/**/*','web/Nova/**/*',
		'web/Office365/markers.png','web/Office365/markers_2x.png','web/Silver/**/*',
		'web/Uniform/**/*',

		'web/common/base.less','web/common/calendar.less','web/common/core.less',
		'web/common/dialog.less','web/common/font-icons.less','web/common/forms.less',
		'web/common/inputs.less','web/common/menu.less','web/common/mixins.less',
		'web/common/notification.less','web/common/pager.less',
		'web/common/panelbar.less','web/common/progressbar.less',
		'web/common/responsivepanel.less','web/common/slider.less',
		'web/common/splitter.less','web/common/tabstrip.less',
		'web/common/toolbar.less','web/common/tooltip.less',
		'web/common/virtuallist.less','web/common/window.less',

		'web/common-mobile/**/*',
		'web/fonts/glyphs/**/*',
		'web/textures/**/*',
		'web/themes/**/*',
		
		'web/bootstrap-mapper.less',
		'web/kendo.black.less',
		'web/kendo.black.mobile.less',
		'web/kendo.blueopal.less',
		'web/kendo.blueopal.mobile.less',
		'web/kendo.bootstrap.less',
		'web/kendo.bootstrap.mobile.less',
		'web/kendo.common-bootstrap.core.less',
		'web/kendo.common-material.core.less',
		'web/kendo.common-nova.core.less',
		'web/kendo.common.core.less',
		'web/kendo.default.less',
		'web/kendo.default.mobile.less',
		'web/kendo.flat.less',
		'web/kendo.flat.mobile.less',
		'web/kendo.highcontrast.less',
		'web/kendo.highcontrast.mobile.less',
		'web/kendo.material.less',
		'web/kendo.material.mobile.less',
		'web/kendo.materialblack.less',
		'web/kendo.materialblack.mobile.less',
		'web/kendo.metro.less',
		'web/kendo.metro.mobile.less',
		'web/kendo.metroblack.less',
		'web/kendo.metroblack.mobile.less',
		'web/kendo.moonlight.less',
		'web/kendo.moonlight.mobile.less',
		'web/kendo.nova.less',
		'web/kendo.nova.mobile.less',
		'web/kendo.rtl.less',
		'web/kendo.silver.less',
		'web/kendo.silver.mobile.less',
		'web/kendo.uniform.less',
		'web/kendo.uniform.mobile.less',
		'web/type-bootstrap.less',
		'web/type-default.less',
		'web/type-flat.less',
		'web/type-highcontrast.less',
		'web/type-material.less',
		'web/type-metro.less',
		'web/type-nova.less'
	].map(name => config.base + 'styles/' + name);

	var testFolders = [
		'autocomplete','button','calendar','color','colorpicker','combobox',
		'core','data','dateinput','datepicker','datetimepicker','dialog',
		'dragdrop','dropdownlist','editable','fx','listbox','listview','maskedtextbox',
		'menu','mobile','model','multiselect','mvvm','notification','pager','panelbar',
		'popup','progressbar','resizable','responsivepanel','router','selectable',
		'slider','sortable','splitter','staticlist','tabstrip','textbox','timepicker',
		'toolbar','tooltip','userevents','view','virtuallist','window',
	].map(name => config.base + 'tests/' + name + '/**/*.*');

	var testFiles = [
		'angular/rebind.js',
		'angular/ui-core.js',
		'validation/validator.js',
		'webcomponents/ui-core.js',

		'angular-route.js',
		'jasmine-boot.js',
		'jasmine.js',
		'jquery.mockjax.js',
		'kendo-test-helpers.js',
	].map(name => config.base + 'tests/' + name);

	testFiles.push('!' + config.base + 'tests/data/aspnetmvc-transport.js');

	var combinedTestFiles = testFolders.concat(testFiles);	

	// TODO These could be safely included
	combinedTestFiles.push('!' + config.base + 'tests/core/time.js');
	combinedTestFiles.push('!' + config.base + 'tests/staticlist/mvvm.js');
	
	// var misc = [
	// 	config.base + 'resources/psd/**/*',			
	// 	'!' + config.base + 'resources/psd/sprite_kpi.psd',
	// 	'!' + config.base + 'resources/psd/sprite_kpi_2x.psd',
	// ];

	config.files = [].concat(
		githubFiles,
		examplesFolders,
		docsFolders,
		srcFolders,
		stylesFolders,
		combinedTestFiles);
		// misc
		

	config.core_files = [].concat(
		rootFiles,
		buildFolders,
		resourcesFolders);

	return config;	
};
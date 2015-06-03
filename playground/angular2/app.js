if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
if (typeof __param !== "function") __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/kendo-ui/kendo-ui.d.ts" />
var angular2_1 = require('angular2/angular2');
var forms_1 = require('angular2/forms');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var NumericTextBox = (function () {
    function NumericTextBox(el, controlDirective) {
        var _this = this;
        var input = el.domElement.querySelector("input");
        this.widget = new kendo.ui.NumericTextBox(input, {
            change: function () {
                if (_this.onChange) {
                    _this.onChange(_this.widget.value());
                }
            },
            spin: function () {
                if (_this.onChange) {
                    _this.onChange(_this.widget.value());
                }
            }
        });
        if (controlDirective !== null) {
            controlDirective.valueAccessor = this;
        }
    }
    NumericTextBox.prototype.writeValue = function (value) {
        this.widget.value(value);
    };
    Object.defineProperty(NumericTextBox.prototype, "value", {
        get: function () {
            return this.widget.value();
        },
        set: function (value) {
            this.widget.value(value);
        },
        enumerable: true,
        configurable: true
    });
    NumericTextBox = __decorate([
        angular2_1.Component({
            selector: 'k-numeric',
            properties: {
                value: "value"
            }
        }),
        angular2_1.View({
            template: "<input>"
        }),
        __param(1, angular2_1.Optional()), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef, forms_1.ControlDirective])
    ], NumericTextBox);
    return NumericTextBox;
})();
var KendoValueAccessor = (function () {
    function KendoValueAccessor(el, controlDirective) {
        var _this = this;
        this.element = el.domElement;
        this.element.addEventListener("change", function () {
            _this.onChange(_this.element.value);
        });
        this.element.addEventListener("spin", function () {
            _this.onChange(_this.element.value);
        });
        controlDirective.valueAccessor = this;
    }
    KendoValueAccessor.prototype.writeValue = function (value) {
        this.element.value = value;
    };
    KendoValueAccessor = __decorate([
        angular2_1.Directive({
            selector: 'kendo-numerictextbox[control]'
        }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef, forms_1.ControlDirective])
    ], KendoValueAccessor);
    return KendoValueAccessor;
})();
var MyAppComponent = (function () {
    function MyAppComponent() {
        var builder = new forms_1.FormBuilder();
        this.value = 3.14;
        this.myForm = builder.group({
            fullName: ["", forms_1.Validators.required],
            username: ["", forms_1.Validators.required],
            age: 10
        });
    }
    MyAppComponent.prototype.log = function () {
        console.log(this.myForm.controls.age.value);
    };
    MyAppComponent.prototype.setValue = function () {
        this.value = Math.random();
    };
    MyAppComponent.prototype.setFullName = function () {
        this.myForm.controls.fullName.value = "set it";
    };
    MyAppComponent = __decorate([
        angular2_1.Component({
            selector: 'my-app'
        }),
        angular2_1.View({
            template: "\n    <fieldset>\n        <legend>Angular2 Component</legend>\n        <label>[value]</label><k-numeric [value]=\"value\"></k-numeric>\n        <div [control-group]=\"myForm\">\n            <label>[control] and [value]</label><k-numeric [control]=\"myForm.controls.age\" [value]=\"myForm.controls.age.value\"></k-numeric>\n            <input [control]=\"myForm.controls.fullName\">\n        </div>\n    </fieldset>\n    <button (click)=\"log()\">log</button>\n    <button (click)=\"setValue()\">set value</button>\n    <div>\n        <label>age: {{ myForm.controls.age.value }}</label>\n    </div>\n    <fieldset>\n        <legend>Web Component</legend>\n        <label>[value]</label><kendo-numerictextbox [value]=\"value\"></kendo-numerictextbox>\n        <div [control-group]=\"myForm\">\n            <label>[control] and [value]</label><kendo-numerictextbox [control]=\"myForm.controls.age\" [value]=\"myForm.controls.age.value\"></kendo-numerictextbox>\n        </div>\n    </fieldset>\n    ",
            directives: [NumericTextBox, forms_1.ControlGroupDirective, forms_1.ControlDirective, KendoValueAccessor, forms_1.DefaultValueAccessor]
        }), 
        __metadata('design:paramtypes', [])
    ], MyAppComponent);
    return MyAppComponent;
})();
angular2_1.bootstrap(MyAppComponent);

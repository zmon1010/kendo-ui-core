/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/kendo-ui/kendo-ui.d.ts" />
//
import {Optional, Directive, Component, View, bootstrap} from 'angular2/angular2';
import {FormBuilder, ControlGroup, ControlGroupDirective, ControlDirective, Validators, DefaultValueAccessor} from 'angular2/forms';
import {ElementRef} from 'angular2/src/core/compiler/element_ref';

@Component({
    selector: 'kendo-numeric',
    properties: {
        value: "value"
    }
})
@View({
    template: "<input>"
})
class NumericTextBox {
    widget: kendo.ui.NumericTextBox;
    onChange: Function;

    constructor(el: ElementRef, @Optional()controlDirective: ControlDirective) {
        var input = el.domElement.querySelector("input");

        this.widget = new kendo.ui.NumericTextBox(input, {
            change: () => {
                if (this.onChange) {
                    this.onChange(this.widget.value());
                }
            },
            spin: () => {
                if (this.onChange) {
                    this.onChange(this.widget.value());
                }
            }
        });

        if (controlDirective !== null) {
            controlDirective.valueAccessor = this;
        }
    }

    writeValue(value) {
        this.widget.value(value);
    }

    set value(value: any) {
        this.widget.value(value);
    }
    get value(): any {
        return this.widget.value();
    }
}

@Component({
    selector: 'my-app'
})
@View({
    template: `
    <kendo-numeric [value]="3.14"></kendo-numeric>
    <div [control-group]="myForm">
        <kendo-numeric [control]="myForm.controls.age" [value]="myForm.controls.age.value"></kendo-numeric>
        <input [control]="myForm.controls.fullName">
        <input [control]="myForm.controls.age">
    </div>
    <div>
    <label>fullName: {{ myForm.controls.fullName.value }}</label>
    <label>age: {{ myForm.controls.age.value }}</label>
    </div>
    <button (click)="log()">log</button>
    <button (click)="setFullName()">set full name</button>
    `,
    directives: [NumericTextBox, ControlGroupDirective, ControlDirective, DefaultValueAccessor]
})
class MyAppComponent {
    myForm: any;

    constructor() {
        var builder = new FormBuilder();

        this.myForm = builder.group({
            fullName: ["", Validators.required],
            username: ["", Validators.required],
            age: 10
        });
    }

    log() {
        console.log(this.myForm.controls.age.value);
    }

    setFullName() {
        this.myForm.controls.fullName.value = "set it";
    }
}

bootstrap(MyAppComponent);

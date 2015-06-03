/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/kendo-ui/kendo-ui.d.ts" />
//
import {Optional, Directive, Component, View, bootstrap} from 'angular2/angular2';
import {ControlValueAccessor, FormBuilder, ControlGroup, ControlGroupDirective, ControlDirective, Validators, DefaultValueAccessor} from 'angular2/forms';
import {ElementRef} from 'angular2/src/core/compiler/element_ref';

@Component({
    selector: 'k-numeric',
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

@Directive({
    selector: 'kendo-numerictextbox[control]'
})
class KendoValueAccessor implements ControlValueAccessor {
    onChange: Function;
    element: any;

    constructor(el: ElementRef, controlDirective: ControlDirective) {
        this.element = el.domElement;

        this.element.addEventListener("change", () => {
            this.onChange(this.element.value);
        });

        this.element.addEventListener("spin", () => {
            this.onChange(this.element.value);
        });

        controlDirective.valueAccessor = this;
    }

    writeValue(value) {
        this.element.value = value;
    }
}


@Component({
    selector: 'my-app'
})
@View({
    template: `
    <fieldset>
        <legend>Angular2 Component</legend>
        <label>[value]</label><k-numeric [value]="value"></k-numeric>
        <div [control-group]="myForm">
            <label>[control] and [value]</label><k-numeric [control]="myForm.controls.age" [value]="myForm.controls.age.value"></k-numeric>
            <input [control]="myForm.controls.fullName">
        </div>
    </fieldset>
    <button (click)="log()">log</button>
    <button (click)="setValue()">set value</button>
    <div>
        <label>age: {{ myForm.controls.age.value }}</label>
    </div>
    <fieldset>
        <legend>Web Component</legend>
        <label>[value]</label><kendo-numerictextbox [value]="value"></kendo-numerictextbox>
        <div [control-group]="myForm">
            <label>[control] and [value]</label><kendo-numerictextbox [control]="myForm.controls.age" [value]="myForm.controls.age.value"></kendo-numerictextbox>
        </div>
    </fieldset>
    `,
    directives: [NumericTextBox, ControlGroupDirective, ControlDirective, KendoValueAccessor, DefaultValueAccessor]
})
class MyAppComponent {
    myForm: any;
    value: Number;

    constructor() {
        var builder = new FormBuilder();
        this.value = 3.14;

        this.myForm = builder.group({
            fullName: ["", Validators.required],
            username: ["", Validators.required],
            age: 10
        });
    }

    log() {
        console.log(this.myForm.controls.age.value);
    }

    setValue() {
        this.value = Math.random();
    }

    setFullName() {
        this.myForm.controls.fullName.value = "set it";
    }
}

bootstrap(MyAppComponent);

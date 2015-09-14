/// <reference path="typings/angular2/angular2.d.ts" />
/// <reference path="typings/kendo-ui/kendo-ui.d.ts" />

import {Component, View, bootstrap, FORM_DIRECTIVES, ControlGroup, Control } from 'angular2/angular2';
import {KendoValueAccessor} from 'kendo/angular2';

@Component({
    selector: 'my-app'
})
@View({
    template: `
    <form [ng-form-model]='capForm'>

    Color:<br />
    <kendo-dropdownlist [options]="dropDownListOptions" data-text-field="text" data-value-field="value" ng-control="color"></kendo-dropdownlist>

    <br /><br />

    Amount:<br />
    <kendo-numerictextbox min="0" max="10" format="n0" ng-control="amount"></kendo-numerictextbox>

    <button (click)="preSet()">Help me choose</button>
    <hr />
    <pre>
        {{ formState() }}
    </pre>
    </form>
    `,
    directives: [FORM_DIRECTIVES, KendoValueAccessor]
})

class MyAppComponent {
    cap: { color: Number } = { color: 1 };

    colors = [
        { text: "Black", value: 1 },
        { text: "Orange", value: 2 },
        { text: "Grey", value: 3 }
    ];

    dropDownListOptions: {
        dataSource: Array<Object>
    };


    capForm: ControlGroup;

    constructor() {
        this.dropDownListOptions = {
            dataSource: this.colors
        }

        this.capForm = new ControlGroup({
            color: new Control(2),
            amount: new Control(3)
        });
    }

    formState() {
        return JSON.stringify(this.capForm.value);
    }

    preSet() {
        this.capForm.controls.color.updateValue(3);
        this.capForm.controls.amount.updateValue(10);
    }
}

bootstrap(MyAppComponent);

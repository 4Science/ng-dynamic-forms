/*
 * Copyright (c) 2016-2021, Udo Schöfer http://www.udos86.de
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

import { Component } from "@angular/core";
import { JsonPipe, NgFor } from "@angular/common";
import { ReactiveFormsModule, UntypedFormArray } from "@angular/forms";
import {
    DynamicFormService,
    DynamicFormArrayModel,
    DynamicFormControlEvent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { DynamicBasicFormControlContainerComponent } from "@ng-dynamic-forms/ui-basic";
import { BASIC_SAMPLE_FORM_MODEL, BASIC_SAMPLE_FORM_ARRAY_MODEL } from "./basic-sample-form.model";


@Component({
    selector: "dynamic-basic-sample-form",
    templateUrl: "./basic-sample-form.component.html",
    standalone: true,
    imports: [NgFor, JsonPipe, ReactiveFormsModule, DynamicBasicFormControlContainerComponent, DynamicTemplateDirective]
})
export class BasicSampleFormComponent {
    formModel1 = this.formService.fromJSON(JSON.stringify(BASIC_SAMPLE_FORM_MODEL));
    formModel2 = this.formService.fromJSON(JSON.stringify(BASIC_SAMPLE_FORM_ARRAY_MODEL));

    formGroup1 = this.formService.createFormGroup(this.formModel1);
    formGroup2 = this.formService.createFormGroup(this.formModel2);

    arrayModel = this.formService.findModelById<DynamicFormArrayModel>("basicFormArray", this.formModel2) as DynamicFormArrayModel;
    arrayControl = this.formService.findControlByModel<UntypedFormArray>(this.arrayModel as DynamicFormArrayModel, this.formGroup2) as UntypedFormArray;

    constructor(private formService: DynamicFormService) {
    }

    add() {
        this.formService.addFormArrayGroup(this.arrayControl, this.arrayModel);
    }

    remove(index: number) {
        this.formService.removeFormArrayGroup(index, this.arrayControl, this.arrayModel);
    }

    clear() {
        this.formService.clearFormArray(this.arrayControl, this.arrayModel);
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`BLUR event on ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`CHANGE event on ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`FOCUS event on ${$event.model.id}: `, $event);
    }
}

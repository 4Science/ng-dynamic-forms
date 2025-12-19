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

import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import {
    DynamicFormService,
    DynamicFormControlEvent,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { NG_BOOTSTRAP_SAMPLE_FORM_MODEL } from "./ng-bootstrap-sample-form.model";
import { NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT } from "./ng-bootstrap-sample-form.layout";
import { DynamicNGBootstrapFormComponent } from "@ng-dynamic-forms/ui-ng-bootstrap";
import { JsonPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "dynamic-ng-bootstrap-sample-form",
    styleUrls: [],
    templateUrl: "./ng-bootstrap-sample-form.component.html",
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [JsonPipe, ReactiveFormsModule, DynamicNGBootstrapFormComponent]
})
export class NGBootstrapSampleFormComponent {
    formModel: DynamicFormControlModel[] = NG_BOOTSTRAP_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = NG_BOOTSTRAP_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    @ViewChild(DynamicNGBootstrapFormComponent) formComponent!: DynamicNGBootstrapFormComponent;

    constructor(private formService: DynamicFormService) {
    }

    onClick() {
        const model = this.formService.findModelById("firstName", this.formModel) as DynamicInputModel;

        model.label = "Updated Label";
        this.formService.detectChanges();

        model.value = "Test Value";
        model.disabled = true;
    }

    onBlur($event: DynamicFormControlEvent) {
        console.log(`NG Bootstrap blur event on: ${$event.model.id}: `, $event);
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`NG Bootstrap change event on: ${$event.model.id}: `, $event);
    }

    onFocus($event: DynamicFormControlEvent) {
        console.log(`NG Bootstrap focus event on: ${$event.model.id}: `, $event);
    }

    onNgbEvent($event: DynamicFormControlEvent) {
        console.log(`NG Bootstrap ${$event.type} event on: ${$event.model.id}: `, $event);
    }
}

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

import { Component, ViewEncapsulation } from "@angular/core";
import {
    DynamicFormService,
    DynamicFormControlModel,
    DynamicFormLayout,
    DynamicFormControlEvent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { PRIME_NG_SAMPLE_FORM_MODEL } from "./primeng-sample-form.model";
import { PRIME_NG_SAMPLE_FORM_LAYOUT } from "./primeng-sample-form.layout";
import { JsonPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicPrimeNGFormComponent } from "@ng-dynamic-forms/ui-primeng";

@Component({
    selector: "dynamic-primeng-sample-form",
    styleUrls: [
        "../../../node_modules/primeng/resources/themes/nova/theme.css",
        "../../../node_modules/primeng/resources/primeng.min.css"
    ],
    templateUrl: "./primeng-sample-form.component.html",
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [JsonPipe, ReactiveFormsModule, DynamicPrimeNGFormComponent, DynamicTemplateDirective]
})
export class PrimeNGSampleFormComponent {
    formModel: DynamicFormControlModel[] = PRIME_NG_SAMPLE_FORM_MODEL;
    formLayout: DynamicFormLayout = PRIME_NG_SAMPLE_FORM_LAYOUT;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }

    onChange($event: DynamicFormControlEvent) {
        console.log(`PrimeNG change event on ${$event.model.id}: `, $event);
    }

    onPEvent($event: DynamicFormControlEvent) {
        console.log(`PrimeNG ${$event.type} event on ${$event.model.id}: `, $event);
    }
}

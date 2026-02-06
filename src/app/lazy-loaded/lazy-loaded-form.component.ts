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
import { DynamicFormService, DynamicFormControlModel } from "@ng-dynamic-forms/core";
import { LAZY_LOADED_FORM_MODEL } from "./lazy-loaded-form.model";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicBootstrapFormControlContainerComponent } from "@ng-dynamic-forms/ui-bootstrap";
import { NgFor } from "@angular/common";

@Component({
    selector: "dynamic-lazy-loaded-form",
    templateUrl: "./lazy-loaded-form.component.html",
    standalone: true,
    imports: [NgFor, ReactiveFormsModule, DynamicBootstrapFormControlContainerComponent]
})
export class LazyLoadedFormComponent {
    formModel: DynamicFormControlModel[] = LAZY_LOADED_FORM_MODEL;
    formGroup = this.formService.createFormGroup(this.formModel);

    constructor(private formService: DynamicFormService) {
    }
}

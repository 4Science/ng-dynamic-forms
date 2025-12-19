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

import { Component, EventEmitter, Inject, Input, Optional, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
    MatAutocomplete,
    MatAutocompleteDefaultOptions,
    MatAutocompleteModule
} from "@angular/material/autocomplete";
import { ErrorStateMatcher, MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions, MatOptionModule } from "@angular/material/core";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import {
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel
} from "@ng-dynamic-forms/core";
import { DynamicMaterialFormInputControlComponent } from "../dynamic-material-form-input-control.component";
import { NgClass, NgIf, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-material-input",
    templateUrl: "./dynamic-material-input.component.html",
    standalone: true,
    imports: [MatFormFieldModule, ReactiveFormsModule, NgClass, NgIf, MatInputModule, MatAutocompleteModule, NgFor, MatOptionModule,
        AsyncPipe]
})
export class DynamicMaterialInputComponent extends DynamicMaterialFormInputControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("matAutocomplete", {static: true}) matAutocomplete!: MatAutocomplete;
    @ViewChild(MatInput, {static: true}) matInput!: MatInput;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService,
                @Inject(ErrorStateMatcher) public errorStateMatcher: ErrorStateMatcher,
                @Inject(MAT_AUTOCOMPLETE_DEFAULT_OPTIONS) public AUTOCOMPLETE_OPTIONS: MatAutocompleteDefaultOptions,
                @Inject(MAT_FORM_FIELD_DEFAULT_OPTIONS) @Optional() public FORM_FIELD_OPTIONS: MatFormFieldDefaultOptions,
                @Inject(MAT_RIPPLE_GLOBAL_OPTIONS) @Optional() public RIPPLE_OPTIONS: RippleGlobalOptions) {
        super(layoutService, validationService);
    }
}

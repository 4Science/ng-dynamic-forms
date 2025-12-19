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

import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { Calendar, CalendarModule } from "primeng/calendar";
import {
    DynamicDatePickerModel,
    DynamicFormControlCustomEvent,
    DynamicDateControlValue,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTimePickerModel,
    DynamicFormControlLayout
} from "@ng-dynamic-forms/core";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-primeng-calendar",
    templateUrl: "./dynamic-primeng-calendar.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, NgClass, CalendarModule]
})
export class DynamicPrimeNGCalendarComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicDatePickerModel | DynamicTimePickerModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pCalendar", {static: true}) pCalendar!: Calendar;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get focusedDate(): DynamicDateControlValue | null {
        return (this.model as DynamicDatePickerModel).focusedDate ?? null;
    }

    get inline(): boolean {
        return (this.model as DynamicDatePickerModel).inline ?? false;
    }

    get showSeconds(): boolean {
        return (this.model as DynamicTimePickerModel).showSeconds ?? false;
    }
}

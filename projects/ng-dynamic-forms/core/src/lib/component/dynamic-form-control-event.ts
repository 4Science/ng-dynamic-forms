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

import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";
import { isObject } from "../utils/core.utils";

export enum DynamicFormControlEventType {
    Blur = "blur",
    Change = "change",
    Focus = "focus"
}

export interface DynamicFormControlEvent {
    $event: Event | FocusEvent | DynamicFormControlEvent | any;
    context: DynamicFormArrayGroupModel | null;
    control: UntypedFormControl;
    group: UntypedFormGroup;
    model: DynamicFormControlModel;
    type: string;
}

export interface DynamicFormControlCustomEvent {
    customEvent: any;
    customEventType: string;
}

export function isDynamicFormControlEvent($event: any): $event is DynamicFormControlEvent {
    return isObject($event) && $event.hasOwnProperty("$event");
}

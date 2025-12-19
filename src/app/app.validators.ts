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

import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customValidator(control: AbstractControl): ValidationErrors | null {
    const hasError = control.value ? (control.value as string).startsWith("abc") : false;

    return hasError ? {customValidator: true} : null;
}

export function customDateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const dateArrival = control.get("arrivalDate")?.value as Date;
    const dateDeparture = control.get("departureDate")?.value as Date;

    let hasError = false;

    if (dateArrival && dateDeparture) {
        hasError = dateArrival >= dateDeparture || dateDeparture <= dateArrival;
    }

    return hasError ? {customDateRangeValidator: true} : null;
}

export function customForbiddenValidator(forbiddenValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        if (control && control.value === forbiddenValue) {
            return {forbidden: true};
        }

        return null;
    };
}

export function customAsyncValidator(_control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve, _reject) => {
        setTimeout(() => resolve({customAsyncValidator: true}), 2000);
    });
}

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

import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";
import { isBoolean, isNumber } from "../utils/core.utils";

export interface DynamicInputControlModelConfig<T> extends DynamicFormValueControlModelConfig<T> {
    autoComplete?: string;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    prefix?: string;
    readOnly?: boolean;
    spellCheck?: boolean;
    suffix?: string;
}

export abstract class DynamicInputControlModel<T> extends DynamicFormValueControlModel<T> {
    @serializable() autoComplete: string;
    @serializable() autoFocus: boolean;
    @serializable() maxLength: number | null;
    @serializable() minLength: number | null;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() readOnly: boolean;
    @serializable() spellCheck: boolean;
    @serializable() suffix: string | null;

    protected constructor(config: DynamicInputControlModelConfig<T>, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.autoComplete = config.autoComplete ?? "on";
        this.autoFocus = isBoolean(config.autoFocus) ? config.autoFocus : false;
        this.maxLength = isNumber(config.maxLength) ? config.maxLength : null;
        this.minLength = isNumber(config.minLength) ? config.minLength : null;
        this.placeholder = config.placeholder ?? "";
        this.prefix = config.prefix ?? null;
        this.readOnly = isBoolean(config.readOnly) ? config.readOnly : false;
        this.spellCheck = isBoolean(config.spellCheck) ? config.spellCheck : false;
        this.suffix = config.suffix ?? null;
    }
}

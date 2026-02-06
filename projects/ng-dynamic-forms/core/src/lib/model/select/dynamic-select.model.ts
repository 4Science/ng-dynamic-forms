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

import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isFunction } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export interface DynamicSelectModelConfig<T> extends DynamicOptionControlModelConfig<T> {
    compareWithFn?: (o1: any, o2: any) => boolean;
    filterable?: boolean;
    multiple?: boolean;
    placeholder?: string;
    prefix?: string;
    suffix?: string;
}

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {
    compareWithFn: (value1: any, value2: any) => boolean;
    @serializable() filterable: boolean;
    @serializable() multiple: boolean;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() suffix: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_SELECT;

    constructor(config: DynamicSelectModelConfig<T>, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.compareWithFn = isFunction(config.compareWithFn) ? config.compareWithFn : Object.is;
        this.filterable = isBoolean(config.filterable) ? config.filterable : false;
        this.multiple = isBoolean(config.multiple) ? config.multiple : false;
        this.placeholder = config.placeholder ?? "";
        this.prefix = config.prefix ?? null;
        this.suffix = config.suffix ?? null;
    }

    select(...indices: number[]): void {
        this.value = this.multiple ? indices.map(index => this.get(index).value) : this.get(indices[0]).value;
    }
}

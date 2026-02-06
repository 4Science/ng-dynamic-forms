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

import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";

export type DynamicDateControlValue = string | object | Date;

export interface DynamicDateControlModelConfig extends DynamicFormValueControlModelConfig<DynamicDateControlValue> {
    format?: string;
    max?: DynamicDateControlValue;
    min?: DynamicDateControlValue;
    placeholder?: string;
}

export abstract class DynamicDateControlModel extends DynamicFormValueControlModel<DynamicDateControlValue> {
    @serializable() format: string | null;
    @serializable() max: DynamicDateControlValue | null;
    @serializable() min: DynamicDateControlValue | null;
    @serializable() placeholder: string | null;

    protected constructor(config: DynamicDateControlModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.format = config.format ?? null;
        this.max = config.max ?? null;
        this.min = config.min ?? null;
        this.placeholder = config.placeholder ?? null;
    }
}

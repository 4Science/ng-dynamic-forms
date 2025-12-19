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

import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "../dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isString } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER = "COLORPICKER";

export interface DynamicColorPickerModelConfig extends DynamicFormValueControlModelConfig<string | object> {
    format?: string;
    inline?: boolean;
}

export class DynamicColorPickerModel extends DynamicFormValueControlModel<string | object> {
    @serializable() format: string | null;
    @serializable() inline: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER;

    constructor(config: DynamicColorPickerModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.format = isString(config.format) ? config.format : null;
        this.inline = isBoolean(config.inline) ? config.inline : false;
    }
}

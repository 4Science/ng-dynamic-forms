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

import {
    DynamicDateControlModel,
    DynamicDateControlModelConfig,
    DynamicDateControlValue
} from "../dynamic-date-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isString } from "../../utils/core.utils";

export const DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER = "DATEPICKER";

export interface DynamicDatePickerModelConfig extends DynamicDateControlModelConfig {
    autoFocus?: boolean;
    focusedDate?: DynamicDateControlValue;
    inline?: boolean;
    prefix?: string;
    readOnly?: boolean;
    suffix?: string;
    toggleIcon?: string;
    toggleLabel?: string;
}

export class DynamicDatePickerModel extends DynamicDateControlModel {
    @serializable() autoFocus: boolean;
    @serializable() focusedDate: DynamicDateControlValue | null;
    @serializable() inline: boolean;
    @serializable() prefix: string | null;
    @serializable() readOnly: boolean;
    @serializable() suffix: string | null;
    @serializable() toggleIcon: string | null;
    @serializable() toggleLabel: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER;

    constructor(config: DynamicDatePickerModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.autoFocus = isBoolean(config.autoFocus) ? config.autoFocus : false;
        this.focusedDate = config.focusedDate ?? null;
        this.inline = isBoolean(config.inline) ? config.inline : false;
        this.prefix = config.prefix ?? null;
        this.readOnly = isBoolean(config.readOnly) ? config.readOnly : false;
        this.toggleIcon = isString(config.toggleIcon) ? config.toggleIcon : null;
        this.toggleLabel = isString(config.toggleLabel) ? config.toggleLabel : null;
        this.suffix = config.suffix ?? null;
    }
}

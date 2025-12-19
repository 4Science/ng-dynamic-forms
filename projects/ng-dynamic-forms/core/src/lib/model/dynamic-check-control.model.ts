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
import { isBoolean } from "../utils/core.utils";

export interface DynamicCheckControlModelConfig extends DynamicFormValueControlModelConfig<boolean> {
    labelPosition?: string;
}

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {
    @serializable() labelPosition: string | null;

    protected constructor(config: DynamicCheckControlModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.labelPosition = config.labelPosition ?? null;
        this.checked = isBoolean(this.value) ? this.value : false;
    }

    get checked(): boolean {
        return this.value ?? false;
    }

    set checked(checked: boolean) {
        this.value = checked;
    }

    toggle(): void {
        this.checked = !this.checked;
    }
}

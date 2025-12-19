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

import { DynamicFormGroupModel, DynamicFormGroupModelConfig } from "../form-group/dynamic-form-group.model";
import { DynamicCheckboxModel } from "./dynamic-checkbox.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormGroupModel {
    @serializable() group!: DynamicCheckboxModel[];

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;

    constructor(config: DynamicFormGroupModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);
    }

    check(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = true);
    }

    uncheck(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = false);
    }

    checkAll(): void {
        this.group.forEach(model => model.checked = true);
    }

    uncheckAll(): void {
        this.group.forEach(model => model.checked = false);
    }
}

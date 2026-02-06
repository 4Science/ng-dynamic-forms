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

import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel } from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {
    let model: DynamicCheckboxModel;
    const config = {
        id: "checkbox",
        value: true
    };

    beforeEach(() => model = new DynamicCheckboxModel(config));

    it("should initialize correctly", () => {
        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.indeterminate).toBe(false);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        expect(model.validators).toBeNull();
        expect(model.value).toBe(config.value);
        expect(model.disabledChanges).toBeDefined();
        expect(model.valueChanges).toBeDefined();
    });

    it("should get and set checked property correctly", () => {
        expect(model.checked).toBe(config.value);

        model.checked = false;

        expect(model.checked).toBe(false);
        expect(model.value).toBe(false);
    });

    it("should toggle correctly", () => {
        model.toggle();

        expect(model.checked).toBe(!config.value);
        expect(model.value).toBe(!config.value);
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
    });
});

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

import { DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER, DynamicTimePickerModel } from "./dynamic-timepicker.model";

describe("DynamicTimePickerModel test suite", () => {
    let model: DynamicTimePickerModel;
    const config = {
        id: "timepicker",
        value: new Date()
    };

    beforeEach(() => model = new DynamicTimePickerModel(config));

    it("should initialize correctly", () => {
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.format).toBeNull();
        expect(model.max).toBeNull();
        expect(model.meridian).toBe(false);
        expect(model.min).toBeNull();
        expect(model.showSeconds).toBe(false);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(model.value).toBe(config.value);
        expect(model.disabledChanges).toBeDefined();
        expect(model.valueChanges).toBeDefined();
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(json.value).toBe((model.value as Date).toJSON());
    });
});

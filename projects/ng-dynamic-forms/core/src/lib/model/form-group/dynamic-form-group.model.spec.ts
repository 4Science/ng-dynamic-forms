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

import { DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel } from "./dynamic-form-group.model";
import { DynamicInputModel } from "../input/dynamic-input.model";

describe("DynamicFormGroupModel test suite", () => {
    let model: DynamicFormGroupModel;
    const config: any = {
        id: "formGroup",
        group: [
            new DynamicInputModel({
                id: "input"
            })
        ],
        validators: {
            required: null
        }
    };

    beforeEach(() => model = new DynamicFormGroupModel(config));

    it("should initialize correctly", () => {
        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(config.group.length);
        expect(model.size()).toBe(model.group.length);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(model.disabledChanges).toBeDefined();
    });

    it("should get the correct DynamicFormControlModel of group", () => {
        expect(model.get(0) === model.group[0]).toBe(true);
    });

    it("should correctly set a DynamicFormControlModel", () => {
        const newModel = new DynamicInputModel({id: "setInput"});

        model.set(0, newModel);

        expect(model.get(0) === newModel).toBe(true);
    });

    it("should correctly add a DynamicFormControlModel", () => {
        const newModel = new DynamicInputModel({id: "addInput"});

        model.add(newModel);

        expect(model.get(model.size() - 1) === newModel).toBe(true);
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_GROUP);
        expect(Object.keys(json.validators)[0]).toEqual("required");
    });
});

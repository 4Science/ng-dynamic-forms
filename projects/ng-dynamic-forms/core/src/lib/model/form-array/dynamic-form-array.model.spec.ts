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
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayModel,
    DynamicFormArrayGroupModel
} from "./dynamic-form-array.model";
import { DynamicInputModel } from "../input/dynamic-input.model";

describe("DynamicFormArrayModel test suite", () => {
    let model: DynamicFormArrayModel;
    const config: any = {
        id: "formArray",
        initialCount: 3,
        groupFactory: () => [
            new DynamicInputModel({
                id: "input"
            }),
            new DynamicFormArrayModel({
                id: "nestedFormArray",
                groupFactory: () => [
                    new DynamicInputModel({
                        id: "nestedInput"
                    })
                ]
            })
        ],
        validators: {
            required: null
        }
    };

    beforeEach(() => model = new DynamicFormArrayModel(config));

    it("should initialize correctly", () => {
        expect(model.initialCount).toBe(config.initialCount);
        expect(model.size).toBe(model.initialCount);
        expect(model.id).toEqual(config.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
        expect(model.groupFactory().length).toEqual(2);
        expect(model.removeGroup).toBeDefined();
        expect(model.disabledChanges).toBeDefined();
    });

    it("should throw when no createGroup function is specified", () => {
        expect(() => new DynamicFormArrayModel({id: "test"}))
            .toThrow(new Error("group factory function must be specified for DynamicFormArrayModel"));
    });

    it("should get the correct group model", () => {
        expect(model.get(0) instanceof DynamicFormArrayGroupModel).toBe(true);
        expect(model.get(1) instanceof DynamicFormArrayGroupModel).toBe(true);
    });

    it("should add another form array group", () => {
        model.addGroup();

        expect(model.size).toBe(config.initialCount + 1);
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.asyncValidators).toBeNull();
        expect(json.id).toEqual(model.id);
        expect(json.groups.length).toEqual(model.size);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_ARRAY);
        expect(Object.keys(json.validators)[0]).toEqual("required");
    });
});

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
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT,
    DynamicInputModel
} from "./dynamic-input.model";
import { AUTOCOMPLETE_ON } from "../../utils/autofill.utils";
import { isString } from "../../utils/core.utils";

describe("DynamicInputModel test suite", () => {
    let model: DynamicInputModel;
    const config = {
        id: "input",
        list: ["One", "Two", "Three"],
        mask: "00/00"
    };

    beforeEach(() => {
        model = new DynamicInputModel(config);
    });

    it("should initialize correctly", () => {
        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.validators).toBeNull();
        expect(model.disabledChanges).toBeDefined();
        expect(model.valueChanges).toBeDefined();
    });

    it("tests if correct default type property is set", () => {
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
    });

    it("tests if correct default input type property is set", () => {
        expect(model.inputType).toEqual(DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
    });

    it("tests if correct default autoComplete property is set", () => {
        expect(model.autoComplete).toEqual(AUTOCOMPLETE_ON);
    });

    it("tests if correct default autoFocus property is set", () => {
        expect(model.autoFocus).toBe(false);
    });

    it("tests if correct default hint property is set", () => {
        expect(model.hint).toBeNull();
    });

    it("tests if correct default label property is set", () => {
        expect(model.label).toBeNull();
    });

    it("tests if correct default list property is set", () => {
        expect(model.hasList).toBe(true);
        expect(isString(model.listId)).toBe(true);
        expect(model.list$).toBeDefined();
    });

    it("tests if correct default max property is set", () => {
        expect(model.max).toBeNull();
    });

    it("tests if correct default maxLength property is set", () => {
        expect(model.maxLength).toBeNull();
    });

    it("tests if correct default minLength property is set", () => {
        expect(model.minLength).toBeNull();
    });

    it("tests if correct default min property is set", () => {
        expect(model.min).toBeNull();
    });

    it("tests if correct default placeholder property is set", () => {
        expect(model.placeholder).toEqual("");
    });

    it("tests if correct default readonly property is set", () => {
        expect(model.readOnly).toBe(false);
    });

    it("tests if correct default required property is set", () => {
        expect(model.required).toBe(false);
    });

    it("tests if correct default spellcheck property is set", () => {
        expect(model.spellCheck).toBe(false);
    });

    it("tests if correct default step property is set", () => {
        expect(model.step).toBeNull();
    });

    it("tests if correct default prefix property is set", () => {
        expect(model.prefix).toBeNull();
    });

    it("tests if correct default suffix property is set", () => {
        expect(model.suffix).toBeNull();
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.disabled).toEqual(model.disabled);
        expect(json.hidden).toEqual(model.hidden);
        expect(json.mask).toEqual(config.mask);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
    });
});

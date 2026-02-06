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

import { isBoolean, isFunction, isNumber, isObject, isString } from "./core.utils";

describe("core utils test suite", () => {

    let testValue1: undefined = undefined,
        testValue2: null = null,
        testValue3 = 42,
        testValue4 = true,
        testValue5 = false,
        testValue6 = "test",
        testValue7 = {},
        testValue8 = () => {};

    it("should check if a given value is of type boolean", () => {

        expect(isBoolean(testValue1)).toBe(false);
        expect(isBoolean(testValue2)).toBe(false);
        expect(isBoolean(testValue3)).toBe(false);
        expect(isBoolean(testValue4)).toBe(true);
        expect(isBoolean(testValue5)).toBe(true);
        expect(isBoolean(testValue6)).toBe(false);
        expect(isBoolean(testValue7)).toBe(false);
        expect(isBoolean(testValue8)).toBe(false);
    });

    it("should check if a given value is of type function", () => {

        expect(isFunction(testValue1)).toBe(false);
        expect(isFunction(testValue2)).toBe(false);
        expect(isFunction(testValue3)).toBe(false);
        expect(isFunction(testValue4)).toBe(false);
        expect(isFunction(testValue5)).toBe(false);
        expect(isFunction(testValue6)).toBe(false);
        expect(isFunction(testValue7)).toBe(false);
        expect(isFunction(testValue8)).toBe(true);
    });

    it("should check if a given value is of type number", () => {

        expect(isNumber(testValue1)).toBe(false);
        expect(isNumber(testValue2)).toBe(false);
        expect(isNumber(testValue3)).toBe(true);
        expect(isNumber(testValue4)).toBe(false);
        expect(isNumber(testValue5)).toBe(false);
        expect(isNumber(testValue6)).toBe(false);
        expect(isNumber(testValue7)).toBe(false);
        expect(isNumber(testValue8)).toBe(false);
    });

    it("should check if a given value is of type object", () => {

        expect(isObject(testValue1)).toBe(false);
        expect(isObject(testValue2)).toBe(false);
        expect(isObject(testValue3)).toBe(false);
        expect(isObject(testValue4)).toBe(false);
        expect(isObject(testValue5)).toBe(false);
        expect(isObject(testValue6)).toBe(false);
        expect(isObject(testValue7)).toBe(true);
        expect(isObject(testValue8)).toBe(false);
    });

    it("should check if a given value is of type string", () => {

        expect(isString(testValue1)).toBe(false);
        expect(isString(testValue2)).toBe(false);
        expect(isString(testValue3)).toBe(false);
        expect(isString(testValue4)).toBe(false);
        expect(isString(testValue5)).toBe(false);
        expect(isString(testValue6)).toBe(true);
        expect(isString(testValue7)).toBe(false);
        expect(isString(testValue8)).toBe(false);
    });
});

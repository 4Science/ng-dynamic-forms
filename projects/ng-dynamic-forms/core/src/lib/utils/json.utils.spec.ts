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

import { maskFromString, maskToString, parseReviver } from "./json.utils";

describe("JSON utils test suite", () => {

    it("should convert a text mask to string correctly", () => {

        let testValue1 = "test",
            testValue2 = /[1-9]/,
            testValue3 = [testValue1, testValue2],
            testResult3 = maskToString(testValue3) as string[];

        expect(maskToString(testValue1)).toEqual(testValue1);
        expect(maskToString(testValue2)).toEqual(testValue2.toString());

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(testValue2.toString());

        expect(maskToString({} as string)).toBeNull();
    });

    it("should recreate a text mask from string correctly", () => {

        let testValue1 = "test",
            testValue2 = "/[1-9]/",
            testValue3 = [testValue1, testValue2],
            testResult3 = maskFromString(testValue3) as (string | RegExp)[];

        expect(maskFromString(testValue1)).toEqual(testValue1);
        expect(maskFromString(testValue2)).toEqual(new RegExp("[1-9]"));

        expect(testResult3[0]).toEqual(testValue1);
        expect(testResult3[1]).toEqual(new RegExp("[1-9]"));

        expect(maskFromString({} as string)).toBeNull();
    });

    it("should recreate a date from string correctly", () => {

        let testValue1 = "2011-10-05T14:48:00.000Z";

        expect(parseReviver("test", testValue1)).toEqual(new Date(testValue1));
    });
});

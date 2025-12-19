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

import { isString } from "./core.utils";

export function maskToString(mask: string | RegExp | (string | RegExp)[]): string | string[] | null {
    if (isString(mask)) {
        return mask as string;

    } else if (mask instanceof RegExp) {
        return mask.toString();

    } else if (Array.isArray(mask)) {
        return mask.map(value => maskToString(value)) as string[];
    }

    return null;
}

export function maskFromString(mask: string | string[]): string | RegExp | (string | RegExp)[] | null {
    if (isString(mask)) {
        const isRegExp = (mask as string).startsWith("/") && (mask as string).endsWith("/");
        return isRegExp ? new RegExp((mask as string).slice(1, mask.length - 1)) : mask;

    } else if (Array.isArray(mask)) {
        return (mask as string[]).map(value => maskFromString(value)) as string[];
    }

    return null;
}

export function parseReviver(_key: string, value: any): any {
    const regexDateISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|([+\-])([\d|:]*))?$/;
    return isString(value) && regexDateISO.test(value) ? new Date(value) : value;
}

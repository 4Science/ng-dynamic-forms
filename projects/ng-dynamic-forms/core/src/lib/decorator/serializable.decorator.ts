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

import "reflect-metadata";

declare let Reflect: any;

export const METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";

export interface SerializableProperty {
    key: string;
    name: string;
}

export function serializable(name?: string): (target: any, key: string) => void {
    return (target, key) => {
        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, {key, name: name || key}, target, key);
    };
}

export function getSerializables(target: any): SerializableProperty[] {
    const serializables = [];

    // tslint:disable-next-line:forin
    for (const key in target) {
        const metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);

        if (metadata) {
            serializables.push(metadata);
        }
    }

    return serializables;
}

export function serialize(target: any, prototype?: any): object {
    return getSerializables(prototype || target).reduce((prev: any, prop: SerializableProperty) => {

        prev[prop.name] = target[prop.key];

        return prev;

    }, {});
}

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

import { BehaviorSubject, Observable } from "rxjs";
import { DynamicFormControlModel, DynamicFormControlModelConfig } from "./dynamic-form-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";
import { isBoolean, isObject } from "../utils/core.utils";

export interface DynamicFormValueControlModelConfig<T> extends DynamicFormControlModelConfig {
    additional?: { [key: string]: any };
    hint?: string;
    required?: boolean;
    tabIndex?: number;
    value?: T;
}

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {
    @serializable() additional: { [key: string]: any } | null;
    @serializable() hint: string | null;
    @serializable() required: boolean;
    @serializable() tabIndex: number | null;
    @serializable("value") private _value: T | null;

    private readonly value$: BehaviorSubject<T | null>;

    readonly valueChanges: Observable<T | null>;

    protected constructor(config: DynamicFormValueControlModelConfig<T>, layout?: DynamicFormControlLayout) {
        super(config, layout);

        this.additional = isObject(config.additional) ? config.additional : null;
        this.hint = config.hint ?? null;
        this.required = isBoolean(config.required) ? config.required : false;
        this.tabIndex = config.tabIndex ?? null;

        this._value = config.value ?? null;
        this.value$ = new BehaviorSubject(this._value);
        this.value$.subscribe(value => this._value = value);
        this.valueChanges = this.value$.asObservable();
    }

    get value(): T | null {
        return this.value$.getValue();
    }

    set value(value: T | null) {
        this.value$.next(value);
    }

    getAdditional(key: string, defaultValue?: any | null): any {
        return this.additional !== null && this.additional.hasOwnProperty(key) ? this.additional[key] : defaultValue;
    }
}

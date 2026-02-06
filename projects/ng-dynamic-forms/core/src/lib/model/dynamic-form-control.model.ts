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
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { DynamicPathable } from "./misc/dynamic-form-control-path.model";
import { DynamicFormControlRelation } from "./misc/dynamic-form-control-relation.model";
import { DynamicFormHook, DynamicValidatorsConfig } from "./misc/dynamic-form-control-validation.model";
import { serializable, serialize } from "../decorator/serializable.decorator";
import { isBoolean, isObject, isString } from "../utils/core.utils";

export interface DynamicFormControlModelConfig {
    asyncValidators?: DynamicValidatorsConfig;
    disabled?: boolean;
    errorMessages?: DynamicValidatorsConfig;
    hidden?: boolean;
    id: string;
    label?: string;
    labelTooltip?: string;
    controlTooltip?: string;
    name?: string;
    relations?: DynamicFormControlRelation[];
    updateOn?: DynamicFormHook;
    validators?: DynamicValidatorsConfig;
}

export abstract class DynamicFormControlModel implements DynamicPathable {
    @serializable() asyncValidators: DynamicValidatorsConfig | null;
    @serializable("disabled") _disabled: boolean;
    @serializable() errorMessages: DynamicValidatorsConfig | null;
    @serializable() hidden: boolean;
    @serializable() id: string;
    @serializable() label: string | null;
    @serializable() labelTooltip: string | null;
    @serializable() controlTooltip: string | null;
    @serializable() layout: DynamicFormControlLayout | null;
    @serializable() name: string;
    parent: DynamicPathable | null = null;
    @serializable() relations: DynamicFormControlRelation[];
    @serializable() updateOn: DynamicFormHook | null;
    @serializable() validators: DynamicValidatorsConfig | null;

    private readonly disabled$: BehaviorSubject<boolean>;

    readonly disabledChanges: Observable<boolean>;

    abstract readonly type: string;

    protected constructor(config: DynamicFormControlModelConfig, layout: DynamicFormControlLayout | null = null) {
        this.asyncValidators = config.asyncValidators ?? null;
        this.errorMessages = config.errorMessages ?? null;
        this.hidden = isBoolean(config.hidden) ? config.hidden : false;
        this.id = config.id;
        this.label = config.label ?? null;
        this.labelTooltip = config.labelTooltip ?? null;
        this.controlTooltip = config.controlTooltip ?? null;
        this.layout = layout;
        this.name = config.name ?? config.id;
        this.relations = Array.isArray(config.relations) ? config.relations : [];
        this.updateOn = isString(config.updateOn) ? config.updateOn : null;
        this.validators = config.validators ?? null;

        this._disabled = isBoolean(config.disabled) ? config.disabled : false;
        this.disabled$ = new BehaviorSubject(this._disabled);
        this.disabled$.subscribe(disabled => this._disabled = disabled);
        this.disabledChanges = this.disabled$.asObservable();
    }

    get disabled(): boolean {
        return this.disabled$.getValue();
    }

    set disabled(disabled: boolean) {
        this.disabled$.next(disabled);
    }

    get hasErrorMessages(): boolean {
        return isObject(this.errorMessages);
    }

    toJSON() {
        return serialize(this);
    }
}

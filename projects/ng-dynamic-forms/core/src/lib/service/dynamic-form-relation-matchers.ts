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

import { InjectionToken, Injector, ValueProvider } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { isObject } from "../utils/core.utils";
import { DynamicValidatorsConfig } from "../model/misc/dynamic-form-control-validation.model";
import { DynamicFormService } from "./dynamic-form.service";

export const MATCH_DISABLED = "DISABLED";
export const MATCH_ENABLED = "ENABLED";
export const MATCH_HIDDEN = "HIDDEN";
export const MATCH_OPTIONAL = "OPTIONAL";
export const MATCH_REQUIRED = "REQUIRED";
export const MATCH_VISIBLE = "VISIBLE";

export const AND_OPERATOR = "AND";
export const OR_OPERATOR = "OR";

export interface DynamicFormControlMatcher {
    match: string;
    opposingMatch: string | null;

    onChange(hasMatch: boolean, model: DynamicFormControlModel, control: UntypedFormControl, injector: Injector): void;
}

export const DYNAMIC_MATCHERS = new InjectionToken<DynamicFormControlMatcher>("DYNAMIC_MATCHERS");

export const DISABLED_MATCHER: DynamicFormControlMatcher = {
    match: MATCH_DISABLED,
    opposingMatch: MATCH_ENABLED,
    onChange(hasMatch, model) {
        model.disabled = hasMatch;
    }
};

export const HIDDEN_MATCHER: DynamicFormControlMatcher = {
    match: MATCH_HIDDEN,
    opposingMatch: MATCH_VISIBLE,
    onChange(hasMatch, model) {
        model.hidden = hasMatch;
    }
};

export const REQUIRED_MATCHER: DynamicFormControlMatcher = {
    match: MATCH_REQUIRED,
    opposingMatch: MATCH_OPTIONAL,
    onChange(hasMatch, model, control, injector) {
        let validatorsConfig = null;

        if (hasMatch) {
            validatorsConfig = isObject(model.validators) ? {...model.validators, required: null} : {required: null};

        } else {
            if (isObject(model.validators)) {
                delete (model.validators as Pick<DynamicValidatorsConfig, "required">).required;
                validatorsConfig = {...model.validators};
            }
        }

        injector.get(DynamicFormValidationService).updateValidators(validatorsConfig, control, model);
        injector.get(DynamicFormService).detectChanges();
    }
};

export const DISABLED_MATCHER_PROVIDER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: DISABLED_MATCHER,
    multi: true
};

export const HIDDEN_MATCHER_PROVIDER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: HIDDEN_MATCHER,
    multi: true
};

export const REQUIRED_MATCHER_PROVIDER: ValueProvider = {
    provide: DYNAMIC_MATCHERS,
    useValue: REQUIRED_MATCHER,
    multi: true
};

export const DYNAMIC_MATCHER_PROVIDERS = [DISABLED_MATCHER_PROVIDER, HIDDEN_MATCHER_PROVIDER, REQUIRED_MATCHER_PROVIDER];

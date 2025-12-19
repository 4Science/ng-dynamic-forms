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

import { bootstrapApplication } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AppComponent } from "./app/app.component";
import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NG_VALIDATORS, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { provideRouter } from "@angular/router";
import { MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory, DYNAMIC_MATCHER_PROVIDERS } from "@ng-dynamic-forms/core";
import { appRoutes } from "./app/app.routes";
import { customValidator, customDateRangeValidator, customAsyncValidator, customForbiddenValidator } from "./app/app.validators";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: NG_VALIDATORS,
            useValue: customValidator,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: customDateRangeValidator,
            multi: true
        },
        {
            provide: NG_ASYNC_VALIDATORS,
            useValue: customAsyncValidator,
            multi: true
        },
        {
            provide: DYNAMIC_VALIDATORS,
            useValue: new Map<string, Validator | ValidatorFactory>([
                ["customValidator", customValidator],
                ["customDateRangeValidator", customDateRangeValidator],
                ["customForbiddenValidator", customForbiddenValidator],
                ["customAsyncValidator", customAsyncValidator]
            ])
        },
        ...DYNAMIC_MATCHER_PROVIDERS,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [13, 188]
            }
        }
    ]
})
    .catch(err => console.error(err));

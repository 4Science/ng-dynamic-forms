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

import { MatInput } from "@angular/material/input";
import {
    DynamicFormControlComponent,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputControlModel,
    DynamicInputModel
} from "@ng-dynamic-forms/core";

export abstract class DynamicMaterialFormInputControlComponent extends DynamicFormControlComponent {
    matInput!: MatInput;

    protected constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get characterCount(): number | null {
        return this.matInput ? this.matInput.value.length : null;
    }

    get characterHint(): string {
        return `${this.characterCount} / ${(this.model as DynamicInputControlModel<string>).maxLength}`;
    }

    get showCharacterHint(): boolean {
        return !!((this.model as DynamicInputModel).maxLength && this.characterCount);
    }
}

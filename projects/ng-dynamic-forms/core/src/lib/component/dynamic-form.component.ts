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

import { ChangeDetectorRef, Directive, EventEmitter, OnDestroy, OnInit, QueryList } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";
import { DynamicFormControlEvent } from "./dynamic-form-control-event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormModel } from "../model/dynamic-form.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormLayout } from "../service/dynamic-form-layout.service";
import { DynamicFormComponentService } from "../service/dynamic-form-component.service";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class DynamicFormComponent implements OnInit, OnDestroy {
    group!: UntypedFormGroup;
    model!: DynamicFormModel;
    layout?: DynamicFormLayout;

    components!: QueryList<DynamicFormControlContainerComponent>;
    templates!: QueryList<DynamicTemplateDirective>;

    blur?: EventEmitter<DynamicFormControlEvent>;
    change?: EventEmitter<DynamicFormControlEvent>;
    focus?: EventEmitter<DynamicFormControlEvent>;

    protected constructor(protected changeDetectorRef: ChangeDetectorRef, protected componentService: DynamicFormComponentService) {
    }

    ngOnInit(): void {
        this.componentService.registerForm(this);
    }

    ngOnDestroy(): void {
        this.componentService.unregisterForm(this);
    }

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    markForCheck(): void {
        this.changeDetectorRef.markForCheck();

        if (this.components instanceof QueryList) {
            this.components.forEach(component => component.markForCheck());
        }
    }

    detectChanges(): void {
        this.changeDetectorRef.detectChanges();
    }

    onBlur($event: DynamicFormControlEvent) {
        this.blur?.emit($event);
    }

    onChange($event: DynamicFormControlEvent) {
        this.change?.emit($event);
    }

    onFocus($event: DynamicFormControlEvent) {
        this.focus?.emit($event);
    }

    onCustomEvent($event: DynamicFormControlEvent, customEventEmitter: EventEmitter<DynamicFormControlEvent>) {
        customEventEmitter.emit($event);
    }
}

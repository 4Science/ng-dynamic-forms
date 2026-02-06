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

import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, TemplateRef } from "@angular/core";
import { DynamicTemplateDirective, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT } from "./dynamic-template.directive";

@Component({
    template: `
        <ng-template modelId="test1"></ng-template>
        <ng-template modelId="test2" as="test"></ng-template>
    `,
    standalone: true
})
class TestComponent {
}

describe("DynamicTemplateDirective test suite", () => {
    let directive: DynamicTemplateDirective;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        directive = new DynamicTemplateDirective({} as TemplateRef<any>);

        fixture = TestBed.configureTestingModule({
    imports: [DynamicTemplateDirective, TestComponent]
}).createComponent(TestComponent);

        fixture.detectChanges();
    });

    it("should be initialized correctly", () => {
        expect(directive.align === DYNAMIC_TEMPLATE_DIRECTIVE_ALIGNMENT.End).toBe(true);
        expect(directive.as).toBeNull();
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
    });
});

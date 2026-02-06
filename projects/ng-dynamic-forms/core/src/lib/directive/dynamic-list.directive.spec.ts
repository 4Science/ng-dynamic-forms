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
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DynamicListDirective } from "./dynamic-list.directive";

@Component({
    template: `
        <div [dynamicList]="testList1"></div>
        <div [dynamicList]="testList2"></div>
    `,
    standalone: true,
    imports: [DynamicListDirective]
})
class TestComponent {
    testList1 = null;
    testList2 = "list";
}

describe("DynamicListDirective test suite", () => {
    let fixture: ComponentFixture<TestComponent>;
    let directives: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicListDirective));
    });


    it("should have two directives", () => {
        expect(directives.length).toBe(2);
    });

    it("should have one set list", () => {
        expect(directives[0].attributes["list"]).toBeUndefined();
        expect(directives[1].attributes["list"]).toEqual(fixture.componentInstance.testList2);
    });
});

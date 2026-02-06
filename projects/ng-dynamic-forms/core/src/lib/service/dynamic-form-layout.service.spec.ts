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

import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormLayout, DynamicFormLayoutService } from "./dynamic-form-layout.service";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";

describe("DynamicFormLayoutService test suite", () => {
    let service: DynamicFormLayoutService;
    let formLayout: DynamicFormLayout;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [DynamicFormLayoutService]
        });

        formLayout = {
            test1: {
                element: {
                    label: "element-test-class",
                    control: "element-test-class"
                },
                grid: {
                    label: "grid-test-class",
                    control: "grid-test-class"
                }
            },
            test2: {
                element: {
                    label: "element-test-class",
                    control: "element-test-class"
                }
            },
            test3: {
                grid: {
                    label: "grid-test-class",
                    control: "grid-test-class"
                }
            }
        };
    });

    beforeEach(inject([DynamicFormLayoutService],
        (layoutService: DynamicFormLayoutService) => service = layoutService));

    it("should find a form control layout in form layout", () => {
        expect(service.findById("test", formLayout)).toBeNull();
        expect(service.findById("test1", formLayout)).toBe(formLayout.test1);
        expect(service.findById("test3", formLayout)).toBe(formLayout.test3);
        expect(service.findById("test1", null)).toBeNull();
    });

    it("should extract a CSS class string from a form control layout", () => {
        expect(service.getClass(null, "element", "control")).toEqual("");
        expect(service.getClass(formLayout.test1, "element", "control")).toEqual("element-test-class");
        expect(service.getClass(formLayout.test1, "element", "container")).toEqual("");
        expect(service.getClass(formLayout.test2, "grid", "control")).toEqual("");
        expect(service.getClass(formLayout.test3, "grid", "control")).toEqual("grid-test-class");
    });

    it("should return a unique element id", () => {
        const testModel1 = new DynamicInputModel({id: "input"});
        const testModel2 = new DynamicFormArrayModel({
            id: "formArray",
            groupFactory: () => {
                return [new DynamicInputModel({id: "formArrayInput"})];
            }
        });
        const testModel3 = testModel2.get(0);
        const testModel4 = testModel3.get(0);

        testModel4.parent = testModel3;

        expect(service.getElementId(testModel1)).toBe(testModel1.id);
        expect(service.getElementId(testModel4)).toBe(`${testModel2.id}-${testModel3.index}-${testModel4.id}`);
    });
});

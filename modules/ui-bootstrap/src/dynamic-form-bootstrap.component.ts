import { Component, Input, Output, EventEmitter, QueryList, ContentChildren } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-bootstrap-control",
    templateUrl: "./dynamic-form-bootstrap.component.html"
})

export class DynamicFormBootstrapComponent extends DynamicFormControlComponent {

    @Input() asBootstrapFormGroup: boolean = true;
    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }
}
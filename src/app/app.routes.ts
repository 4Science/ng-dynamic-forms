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

import { Route } from "@angular/router";
import { BasicSampleFormComponent } from "./ui-basic/basic-sample-form.component";
import { FoundationSampleFormComponent } from "./ui-foundation/foundation-sample-form.component";
import { MaterialSampleFormComponent } from "./ui-material/material-sample-form.component";
import { NGBootstrapSampleFormComponent } from "./ui-ng-bootstrap/ng-bootstrap-sample-form.component";
import { NgxBootstrapSampleFormComponent } from "./ui-ngx-bootstrap/ngx-bootstrap-sample-form.component";
import { PrimeNGSampleFormComponent } from "./ui-primeng/primeng-sample-form.component";

export const appRoutes: Route[] = [
    {
        path: "",
        redirectTo: "/material-sample-form",
        pathMatch: "full"
    },
    {
        path: "basic-sample-form",
        component: BasicSampleFormComponent,
        data: {
            title: "Basic UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/basic-sample-form/basic-sample-form.model.ts",
            bgColor: "gray"
        }
    },
    {
        path: "ngx-bootstrap-sample-form",
        component: NgxBootstrapSampleFormComponent,
        data: {
            title: "ngx-bootstrap UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/ngx-bootstrap-sample-form/ngx-bootstrap-sample-form.model.ts",
            bgColor: "#6f5499"
        }
    },
    {
        path: "foundation-sample-form",
        component: FoundationSampleFormComponent,
        data: {
            title: "Foundation UI",
            // tslint:disable-next-line:max-line-length
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/foundation-sample-form/foundation-sample-form.model.ts",
            bgColor: "#2199e8"
        }
    },
    {
        path: "material-sample-form",
        component: MaterialSampleFormComponent,
        data: {
            title: "Material UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/material-sample-form/material-sample-form.model.ts",
            bgColor: "#009688"
        }
    },
    {
        path: "ng-bootstrap-sample-form",
        component: NGBootstrapSampleFormComponent,
        data: {
            title: "NG Bootstrap UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/ng-bootstrap-sample-form/ng-bootstrap-sample-form.model.ts",
            bgColor: "#1b95e0"
        }
    },
    {
        path: "primeng-sample-form",
        component: PrimeNGSampleFormComponent,
        data: {
            title: "Prime NG UI",
            href: "https://github.com/udos86/ng-dynamic-forms/blob/master/sample/app/primeng-sample-form/primeng-sample-form.model.ts",
            bgColor: "#DB2226"
        }
    },
    {
        path: "lazy-loaded-form",
        loadChildren: () => import("./lazy-loaded/lazy-loaded-form.routes").then(module => module.lazyFormRoutes)
    }
];

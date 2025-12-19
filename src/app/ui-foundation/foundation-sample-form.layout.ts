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

export const FOUNDATION_SAMPLE_FORM_LAYOUT = {
    foundationSelect: {
        element: {
            label: "text-right middle font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            label: "small-3 cell"
        }
    },

    foundationRadioGroup: {
        element: {
            label: "text-right font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            label: "small-3 cell"
        }
    },

    foundationInput: {
        element: {
            label: "text-right middle font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            errors: "small-9 small-offset-3 cell",
            label: "small-3 cell"
        }
    },

    foundationCheckboxGroup: {
        element: {
            label: "text-right font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            label: "small-3 cell"
        }
    },

    foundationSwitch: {
        element: {
            control: "small",
            label: "text-right font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            label: "small-3 cell"
        }
    },

    foundationTextArea: {
        element: {
            label: "text-right font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            errors: "small-9 small-offset-3 cell",
            label: "small-3 cell"
        }
    },

    foundationCheckbox: {
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-offset-3 small-9 cell"
        }
    },

    foundationFormArray: {
        element: {
            container: "form-array",
            label: "text-right font-bold"
        },
        grid: {
            container: "grid-x grid-padding-x",
            control: "small-9 cell",
            group: "grid-x grid-padding-x",
            label: "small-3 cell"
        }
    },

    foundationFormArrayGroupInput: {
        grid: {
            host: "small-7 cell"
        }
    }
};

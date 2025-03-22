"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var TransferList_vue_1 = require("../components/TransferList.vue");
var test_data_js_1 = require("../assets/mock/test_data.js");
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    name: "ShoppingCartPage",
    components: {
        TransferList: TransferList_vue_1.default,
    },
    data: function () {
        return {
            tables: test_data_js_1.tables,
        };
    }
});
var __VLS_ctx = {};
var __VLS_componentsOption = {
    TransferList: TransferList_vue_1.default,
};
var __VLS_components;
var __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({});
if (__VLS_ctx.tables.length > 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    var __VLS_0 = {}.TransferList;
    /** @type {[typeof __VLS_components.TransferList, ]} */ ;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        tables: (__VLS_ctx.tables),
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            tables: (__VLS_ctx.tables),
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ class: "checkout-button" }));
}
if (__VLS_ctx.tables.length === 0) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
}
/** @type {__VLS_StyleScopedClasses['checkout-button']} */ ;
var __VLS_dollars;
var __VLS_self;

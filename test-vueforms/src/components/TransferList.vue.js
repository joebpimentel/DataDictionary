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
exports.default = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({
    name: "ShoppingCartPage",
    props: ['tables'],
    data: function () {
        return {
            // Lista inicial de itens disponíveis
            leftList: this.tables,
            // Lista inicial de itens selecionados (vazia)
            rightList: [],
            // Itens selecionados na lista da esquerda
            selectedLeft: [],
            // Itens selecionados na lista da direita
            selectedRight: []
        };
    },
    methods: {
        // Move itens selecionados da esquerda para a direita
        moveToRight: function () {
            var _this = this;
            this.rightList = __spreadArray(__spreadArray([], this.rightList, true), this.selectedLeft, true);
            this.leftList = this.leftList.filter(function (item) { return !_this.selectedLeft.includes(item); });
            this.selectedLeft = [];
        },
        // Move itens selecionados da direita para a esquerda
        moveToLeft: function () {
            var _this = this;
            this.leftList = __spreadArray(__spreadArray([], this.leftList, true), this.selectedRight, true);
            this.rightList = this.rightList.filter(function (item) { return !_this.selectedRight.includes(item); });
            this.selectedRight = [];
        },
        // Realiza uma ação com os itens selecionados na lista da direita
        performAction: function () {
            alert("A\u00E7\u00E3o realizada com: ".concat(this.rightList.map(function (item) { return item.name; }).join(', ')));
        }
    }
});
var __VLS_ctx = {};
var __VLS_components;
var __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "transfer-list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
for (var _i = 0, _a = __VLS_getVForSourceType((__VLS_ctx.leftList)); _i < _a.length; _i++) {
    var _b = _a[_i], item = _b[0], index = _b[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
        value: (item),
    });
    (__VLS_ctx.selectedLeft);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (item.table_metadata.table_name);
    (item.table_metadata.table_comment);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "actions" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.moveToRight) }, { disabled: (__VLS_ctx.selectedLeft.length === 0) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.moveToLeft) }, { disabled: (__VLS_ctx.selectedRight.length === 0) }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "list" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.ul, __VLS_intrinsicElements.ul)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({});
for (var _c = 0, _d = __VLS_getVForSourceType((__VLS_ctx.rightList)); _c < _d.length; _c++) {
    var _e = _d[_c], item = _e[0], index = _e[1];
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
        key: (index),
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        type: "checkbox",
        value: (item),
    });
    (__VLS_ctx.selectedRight);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
    (item.name);
    (item.email);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)(__assign({ class: "action-button" }));
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)(__assign({ onClick: (__VLS_ctx.performAction) }, { disabled: (__VLS_ctx.rightList.length === 0) }));
/** @type {__VLS_StyleScopedClasses['transfer-list']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
/** @type {__VLS_StyleScopedClasses['list']} */ ;
/** @type {__VLS_StyleScopedClasses['action-button']} */ ;
var __VLS_dollars;
var __VLS_self;

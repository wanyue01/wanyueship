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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { forwardRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
;
/**
 * Input 输入框
 * ### 引用方法
 * ```js
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * import Input from 'wanyueship';
=======
 * import Input from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import Input from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import Input from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ```
 */
var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, onIconClick = props.onIconClick, pre = props.pre, suf = props.suf, style = props.style, defaultValue = props.defaultValue, restProps = __rest(props, ["disabled", "size", "icon", "onIconClick", "pre", "suf", "style", "defaultValue"]);
    var classes = classNames('input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['input-disabled'] = disabled,
        _a['input-group'] = pre || suf,
        _a['input-group-has-pre'] = pre,
        _a['input-group-has-suf'] = suf,
        _a));
    // 如果用户想让该组件受控，在设计组件的时候就要考虑以下情况
    // input 的 value 和 defaultValue不能同时设置
    // value的值初始可能是 undefined 或 null
    var handleControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete props.defaultValue;
        restProps.value = handleControlledValue(props.value);
    }
    var handleIconClick = function () {
        onIconClick && onIconClick();
    };
    return (React.createElement("div", { className: classes, style: style, "data-testid": "wrapper" },
        pre && React.createElement("div", { className: "input-group-pre" }, pre),
        icon && React.createElement("div", { className: "icon-wrapper", onClick: handleIconClick },
            React.createElement(Icon, { icon: icon })),
        React.createElement("input", __assign({ ref: ref, className: "input-inner", disabled: disabled }, restProps)),
        suf && React.createElement("div", { className: "input-group-suf" }, suf)));
});
Input.defaultProps = {
    disabled: false,
};
export default Input;

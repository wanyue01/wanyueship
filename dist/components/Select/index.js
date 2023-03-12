var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useMemo, useState, useRef, useEffect, createContext, cloneElement } from "react";
import Input from "../Input";
import Transition from "../Transition";
import Option from "./option";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
;
;
export var selectContext = createContext({ selectedValue: [] });
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * 支持自定义的下拉框组件
 *
 * ```js
 * import Menu from 'wanyueship';
 * ```
 */
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
export var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange, children = props.children, multiple = props.multiple;
    var _a = useState(false), openMenu = _a[0], setOpenMenu = _a[1];
    var _b = useState(defaultValue ? defaultValue : []), selectedValue = _b[0], setSelectedValue = _b[1];
    var inputRef = useRef(null);
    // 记录当前容器的宽度，多选模式下的选中标签容器的宽度不超过它
    var containerRef = useRef(null);
    var containerWidth = useMemo(function () {
        if (containerRef.current) {
            return containerRef.current.getBoundingClientRect().width - 32;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef.current]);
    // 当点击外部时下拉框消失
    useClickOutside(containerRef, function () {
        setOpenMenu(false);
        if (onVisibleChange && openMenu) {
            onVisibleChange(false);
        }
    });
    var handleOptionClick = function (value, isSelected) {
        var selected = selectedValue;
        if (multiple) {
            if (isSelected) {
                selected = selected.filter(function (item) { return item !== value; });
                setSelectedValue(selected);
            }
            else {
                selected = __spreadArray(__spreadArray([], selectedValue, true), [value], false);
                setSelectedValue(selected);
            }
        }
        else {
            selected = [value];
            setSelectedValue(selected);
            setOpenMenu(false);
            onVisibleChange && onVisibleChange(false);
        }
        onChange && onChange(value, selected);
    };
    var passedContext = {
        selectedValue: selectedValue,
        onSelect: handleOptionClick,
        multiple: multiple
    };
    var handleClick = function (e) {
        if (!disabled) {
            setOpenMenu(!openMenu);
            onVisibleChange && onVisibleChange(!openMenu);
        }
    };
    var inputValue = (multiple || selectedValue.length === 0) ? '' : selectedValue[0];
    // 根据有没有值来改变placeholder
    useEffect(function () {
        if (inputRef.current) {
            // inputRef.current.focus()
            if (multiple && selectedValue.length)
                inputRef.current.placeholder = '';
            else if (placeholder)
                inputRef.current.placeholder = placeholder;
        }
    }, [multiple, placeholder, selectedValue]);
    var generateOptions = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            if (childElement.type.displayName === Option.displayName) {
                return cloneElement(childElement, { index: index });
            }
            else {
                console.error('Warning: Select need Select.Option to be its children');
            }
        });
    };
    var classes = classNames('select', {
        'menu-is-open': openMenu,
        disabled: disabled,
        multiple: multiple
    });
    return (React.createElement("div", { ref: containerRef, className: classes },
        React.createElement(Input, { disabled: disabled, readOnly: true, onClick: handleClick, placeholder: placeholder, ref: inputRef, value: inputValue, icon: "angle-down", onIconClick: handleClick }),
        React.createElement(selectContext.Provider, { value: passedContext },
            React.createElement(Transition, { timeout: 300, animation: 'zoom-in-top', in: openMenu },
                React.createElement("ul", { className: "select-dropdown" }, generateOptions()))),
        multiple &&
            React.createElement("div", { className: "selected-tags", style: { maxWidth: containerWidth } }, selectedValue.map(function (value, index) {
                return (React.createElement("span", { className: "tag", key: index },
                    value,
                    React.createElement(Icon, { "data-testid": 'xmark', icon: 'xmark', onClick: function () { return handleOptionClick(value, true); } })));
            }))));
};
Select.defaultProps = {
    defaultValue: [],
    disabled: false,
};
var TransSelect = Select;
TransSelect.Option = Option;
export default TransSelect;

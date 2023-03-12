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
import React, { useState, useEffect, useRef } from "react";
import Input from "../Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
import Transition from "../Transition";
;
;
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * ~~~js
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * import { AutoComplete } from 'wanyueship';
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ~~~
 */
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var _e = useState(false), showDropdown = _e[0], setShowDropdown = _e[1];
    var debounceValue = useDebounce(inputValue);
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    // 当下拉列表在加载时或下拉列表有数据时showDropdown
    useEffect(function () {
        if (loading || suggestions.length)
            setShowDropdown(true);
        else
            setShowDropdown(false);
    }, [loading, suggestions]);
    // 当点击组件外的元素时关闭下拉列表
    useClickOutside(componentRef, function () {
        setSuggestions([]);
    });
    // 在延迟值改变时才触发请求
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            setSuggestions([]);
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (items) {
                    setLoading(false);
                    setSuggestions(items);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    // 使Input变成受控组件
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    // 点击的回调
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        triggerSearch.current = false;
        onSelect && onSelect(item);
    };
    var highlight = function (index) {
        if (index <= 0) {
            setHighlightIndex(0);
        }
        else if (index >= suggestions.length) {
            setHighlightIndex(suggestions.length - 1);
        }
        else {
            setHighlightIndex(index);
        }
    };
    // 处理键盘事件
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'ArrowUp':
                highlight(highlightIndex - 1);
                break;
            case 'ArrowDown':
                highlight(highlightIndex + 1);
                break;
            case 'Enter':
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 'Escape':
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    // 定制的自动补全列表
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    // 生成下拉列表
    var generateDropdown = function () {
        return (React.createElement(Transition, { in: showDropdown, animation: 'zoom-in-top', timeout: 300 },
            React.createElement("ul", { className: "suggestions-list", "data-testid": 'list' },
                loading &&
                    React.createElement("div", { className: "suggestions-loading-icon" },
                        React.createElement(Icon, { icon: "spinner", spin: true })),
                suggestions.map(function (item, index) {
                    var classes = classNames('suggestions-item', {
                        'item-highlight': index === highlightIndex
                    });
                    return (React.createElement("li", { className: classes, key: index, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "auto-complete", ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)),
        generateDropdown()));
};
export default AutoComplete;

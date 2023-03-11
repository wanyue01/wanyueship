import React, { useContext } from "react";
import { selectContext } from ".";
import Icon from "../Icon";
import classNames from "classnames";
;
var Option = function (props) {
    var index = props.index, value = props.value, label = props.label, disabled = props.disabled, children = props.children;
    var _a = useContext(selectContext), selectedValue = _a.selectedValue, onSelect = _a.onSelect, multiple = _a.multiple;
    var isSelected = selectedValue.includes(value);
    var handleClick = function () {
        onSelect && !disabled && onSelect(value, isSelected);
    };
    var classes = classNames('select-item', {
        disabled: disabled,
        selected: isSelected
    });
    return (React.createElement("li", { className: classes, key: index, onClick: handleClick },
        children || label ? label : value,
        multiple && isSelected && React.createElement(Icon, { icon: 'check' })));
};
Option.defaultProps = {
    disabled: false
};
Option.displayName = 'Option';
export default Option;

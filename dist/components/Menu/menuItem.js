import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from '.';
;
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var ctx = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        disabled: disabled,
        active: index === ctx.index,
    });
    var handleClick = function () {
        (typeof index === 'string') && !disabled && ctx.onSelect && ctx.onSelect(index);
    };
    return (React.createElement("li", { key: index, className: classes, style: style, onClick: handleClick }, children));
};
MenuItem.defaultProps = {
    disabled: false,
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;

import React from 'react';
import classNames from 'classnames';
;
var TabItem = function (props) {
    var style = props.style, className = props.className, children = props.children;
    var classes = classNames(className, 'tab-panel');
    return (React.createElement("div", { className: classes, style: style }, children));
};
TabItem.defaultProps = {
    disabled: false,
};
TabItem.displayName = 'TabItem';
export default TabItem;

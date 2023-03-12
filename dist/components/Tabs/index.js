import React, { useState } from 'react';
import classNames from 'classnames';
import TabItem from './tabItem';
;
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ```js
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * import { Tabs } from 'wanyueship';
=======
 * import { Tabs } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { Tabs } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { Tabs } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ```
 */
var Tabs = function (props) {
    var _a;
    var activeIndex = props.activeIndex, className = props.className, style = props.style, children = props.children, onSelect = props.onSelect, type = props.type;
    var _b = useState(activeIndex), currentActive = _b[0], setActive = _b[1];
    var classes = classNames('tabs', className);
    var navClasses = classNames('tabs-nav', (_a = {},
        _a["nav-".concat(type)] = type,
        _a));
    var handleClick = function (selectedIndex, disabled) {
        if (!disabled) {
            setActive(selectedIndex);
            onSelect && onSelect(selectedIndex);
        }
    };
    var renderLabels = React.Children.map(children, function (child, index) {
        var childElement = child;
        if (childElement.type.displayName === TabItem.displayName) {
            var _a = childElement.props, label = _a.label, disabled_1 = _a.disabled;
            var classes_1 = classNames('tabs-nav-item', {
                'active': index === currentActive,
                disabled: disabled_1
            });
            return (React.createElement("li", { className: classes_1, onClick: function () { handleClick(index, !!disabled_1); } }, label));
        }
        else {
            console.error('Warning: the Tabs component need TabItem component as its children when it has children');
        }
    });
    var renderContent = React.Children.map(children, function (child, index) {
        if (index === currentActive) {
            return child;
        }
    });
    return (React.createElement("div", { className: classes, style: style },
        React.createElement("ul", { className: navClasses }, renderLabels),
        React.createElement("div", { className: 'tabs-content' }, renderContent)));
};
Tabs.defaultProps = {
    type: 'line',
    activeIndex: 0,
};
export default Tabs;

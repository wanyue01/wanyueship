import React, { useState, createContext } from "react";
import classNames from "classnames";
import MenuItem from './menuItem';
import SubMenu from "./subMenu";
;
export var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * 可以使用 Menu.Item 和 Menu.SubMenu 访问选项和子下拉菜单组件
 * ```js
 * import Menu from 'wanyueship';
 *
=======
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 *
 * ```js
 * import Menu from 'component-library';
 *
 * //然后可以使用 Menu.Item 和 Menu.SubMenu 访问选项和子下拉菜单组件
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ```
 */
export var Menu = function (props) {
    var _a;
    var mode = props.mode, className = props.className, style = props.style, children = props.children, activeIndex = props.activeIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var classes = classNames('menu', className, (_a = {},
        _a["menu-".concat(mode)] = mode,
        _a));
    var _b = useState(activeIndex), currentActive = _b[0], setActive = _b[1];
    var handleClick = function (index) {
        setActive(index);
        onSelect && onSelect(index);
    };
    var menuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus
    };
    var renderChildren = function () {
        // 遍历children
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === MenuItem.displayName || displayName === SubMenu.displayName) {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Warning: The Menu component need the MenuItem component to be its childeren if it has children');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": 'test-menu' },
        React.createElement(MenuContext.Provider, { value: menuContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    activeIndex: '0',
    defaultOpenSubMenus: [],
};
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;

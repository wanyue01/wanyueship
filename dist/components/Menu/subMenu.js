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
import React, { useContext, useState } from "react";
import classNames from "classnames";
import { MenuContext } from ".";
import MenuItem from "./menuItem";
import Icon from "../Icon";
import Transition from "../Transition";
;
var SubMenu = function (props) {
    var title = props.title, index = props.index, className = props.className, children = props.children;
    var ctx = useContext(MenuContext);
    var openedSubMenus = ctx.defaultOpenSubMenus;
    var isOpened = (typeof index === 'string') && openedSubMenus.includes(index);
    var _a = useState(isOpened), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item submenu-item', className, {
        active: ctx.index === index,
        'is-opened': menuOpen,
        'is-vertical': ctx.mode === 'vertical'
    });
    var subMenuClasses = classNames('submenu', {
        'menu-opened': menuOpen
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleHover = function (e, toggle) {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvent = ctx.mode === 'vertical' ? { onClick: handleClick } : {};
    var hoverEvent = ctx.mode === 'horizontal' ? {
        onMouseEnter: function (e) { return handleHover(e, true); },
        onMouseLeave: function (e) { return handleHover(e, false); },
    } : {};
    // 渲染children
    var renderChildren = function () {
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === MenuItem.displayName) {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error('Warning: The Menu component need the MenuItem component to be its childeren if it has children');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, 
            // 为所有过度指定一个超时时间
            timeout: 300, animation: 'zoom-in-top' },
            React.createElement("ul", { className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", __assign({ key: index, className: classes }, hoverEvent),
        React.createElement(React.Fragment, null,
            React.createElement("div", __assign({ className: "submenu-title" }, clickEvent),
                title,
                React.createElement(Icon, { icon: 'angle-down', className: "arrow-icon" })),
            renderChildren())));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;

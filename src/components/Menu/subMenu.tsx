import React, { useContext, FunctionComponentElement, useState } from "react";
import classNames from "classnames";
import { MenuContext } from ".";
import MenuItem, { MenuItemProps } from "./menuItem";
import Icon from "../Icon";
import Transition from "../Transition";

export interface SubMenuProps {
  title: string;
  index?: string;
  className?: string;
  children?: React.ReactNode;
};

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { title, index, className, children } = props;
  const ctx = useContext(MenuContext);
  const openedSubMenus = ctx.defaultOpenSubMenus as string[];
  const isOpened = (typeof index === 'string') && openedSubMenus.includes(index);
  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames('menu-item submenu-item', className, {
    active: ctx.index === index,
    'is-opened': menuOpen,
    'is-vertical': ctx.mode === 'vertical'
  });
  const subMenuClasses = classNames('submenu', {
    'menu-opened': menuOpen
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleHover = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvent = ctx.mode === 'vertical' ? { onClick: handleClick } : {};
  const hoverEvent = ctx.mode === 'horizontal' ? {
    onMouseEnter: (e: React.MouseEvent) => handleHover(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleHover(e, false),
  } : {};
  // 渲染children
  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === MenuItem.displayName) {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error('Warning: The Menu component need the MenuItem component to be its childeren if it has children');
      }
    });
    return (
      <Transition
        in={menuOpen}
        // 为所有过度指定一个超时时间
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    )
  }
  return (
    <li key={index} className={classes} {...hoverEvent}>
      <>
        <div className="submenu-title" {...clickEvent}>
          {title}
          <Icon icon='angle-down' className="arrow-icon" />
        </div>
        {renderChildren()}
      </>
    </li>
  )
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
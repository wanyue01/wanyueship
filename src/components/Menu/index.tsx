import React, { useState, createContext, FC } from "react";
import classNames from "classnames";
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from "./subMenu";

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  /**默认 active 的菜单项的索引值 */
  activeIndex?: string;
  /**菜单类型 横向或者纵向 */
  mode?: MenuMode;
  className?: string;
  style?: React.CSSProperties;
  /**点击菜单项触发的回掉函数 */
  onSelect?: SelectCallback;
  children?: React.ReactNode;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
};
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: '0' });

/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 * 可以使用 Menu.Item 和 Menu.SubMenu 访问选项和子下拉菜单组件
 * ```js
 * import Menu from 'wanyueship';
 * 
 * ```
 */
export const Menu: FC<MenuProps> = (props) => {
  const { mode, className, style, children, activeIndex, onSelect, defaultOpenSubMenus } = props;
  const classes = classNames('menu', className, {
    [`menu-${mode}`]: mode,
  });
  const [currentActive, setActive] = useState(activeIndex);
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };
  const menuContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus
  };
  const renderChildren = () => {
    // 遍历children
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === MenuItem.displayName || displayName === SubMenu.displayName) {
        return React.cloneElement(childElement, {index: index.toString()});
      } else {
        console.error('Warning: The Menu component need the MenuItem component to be its childeren if it has children');
      }
    })
  }
  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={menuContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
};

Menu.defaultProps = {
  mode: 'horizontal',
  activeIndex: '0',
  defaultOpenSubMenus: [],
};

type MenuComponent = React.FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
};

const TransMenu = Menu as MenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
import React, { FC } from "react";
import { MenuItemProps } from './menuItem';
import { SubMenuProps } from "./subMenu";
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
}
interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
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
export declare const Menu: FC<MenuProps>;
type MenuComponent = React.FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: MenuComponent;
export default TransMenu;

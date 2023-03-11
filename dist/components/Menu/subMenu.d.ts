import React from "react";
export interface SubMenuProps {
    title: string;
    index?: string;
    className?: string;
    children?: React.ReactNode;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;

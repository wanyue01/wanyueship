import React from 'react';
export interface TabItemProps {
    /** Tab选项上面的文字 */
    label: string | React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    /** Tab选项是否被禁用 */
    disabled?: boolean;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;

import React from 'react';
type TabType = 'line' | 'card';
type SelectCallback = (index: number) => void;
export interface TabsProps {
    /**当前激活 tab 面板的 index，默认为0 */
    activeIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /**点击 Tab 触发的回调函数 */
    onSelect?: SelectCallback;
    /**Tabs的样式，两种可选，默认为 line */
    type?: TabType;
}
/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ```js
 * import { Tabs } from 'wanyueship';
 * ```
 */
declare const Tabs: React.FC<TabsProps>;
export default Tabs;

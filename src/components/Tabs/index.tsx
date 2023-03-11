import React, { useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import TabItem, { TabItemProps } from './tabItem';

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
};

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 * 
 * ```js
 * import { Tabs } from 'component-library';
 * ```
 */
const Tabs: React.FC<TabsProps> = (props) => {
  const { activeIndex, className, style, children, onSelect, type } = props;
  const [currentActive, setActive] = useState(activeIndex);
  const classes = classNames('tabs', className);
  const navClasses = classNames('tabs-nav', {
    [`nav-${type}`]: type,
  })
  const handleClick = (selectedIndex: number, disabled: boolean) => {
    if (!disabled) {
      setActive(selectedIndex);
      onSelect && onSelect(selectedIndex);
    }
  };
  const renderLabels = React.Children.map(children, (child, index) => {
    const childElement = child as FunctionComponentElement<TabItemProps>;
    if (childElement.type.displayName === TabItem.displayName) {
      const { label, disabled } = childElement.props;
      const classes = classNames('tabs-nav-item', {
        'active': index === currentActive,
        disabled
      })
      return (
        <li className={classes} onClick={() => {handleClick(index, !!disabled)}}>
          {label}
        </li>
      )
    } else {
      console.error('Warning: the Tabs component need TabItem component as its children when it has children');
    }
  });
  const renderContent = React.Children.map(children, (child, index) => {
    if (index === currentActive) {
      return child;
    }
  });
  return (
    <div className={classes} style={style}>
      <ul className={navClasses}>
        {renderLabels}
      </ul>
      <div className='tabs-content'>
        {renderContent}
      </div>
    </div>
  )
};

Tabs.defaultProps = {
  type: 'line',
  activeIndex: 0,
};

export default Tabs;
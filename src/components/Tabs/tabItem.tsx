import React from 'react';
import classNames from 'classnames';

export interface TabItemProps {
  /** Tab选项上面的文字 */
  label: string | React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  /** Tab选项是否被禁用 */
  disabled?: boolean;
};

const TabItem: React.FC<TabItemProps> = (props) => {
  const { style, className, children } = props;
  const classes = classNames(className, 'tab-panel');
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

TabItem.defaultProps = {
  disabled: false,
};

TabItem.displayName = 'TabItem';

export default TabItem;
import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
};

/**
 * 对FontAwesomeIcon的封装
 * ### 引用方法
 * ```js
 * import { Icon } from 'wanyueship';
 * ```
 */
const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames(className, {
    [`icon-${theme}`]: theme,
  });
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  )
};

export default Icon;
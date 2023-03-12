import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
/**
 * 对FontAwesomeIcon的封装
 * ### 引用方法
 * ```js
 * import { Icon } from 'wanyueship';
 * ```
 */
declare const Icon: React.FC<IconProps>;
export default Icon;

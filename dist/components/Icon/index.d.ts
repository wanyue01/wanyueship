import React from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
    theme?: ThemeProps;
}
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * 对FontAwesomeIcon的封装
 * ### 引用方法
 * ```js
 * import { Icon } from 'wanyueship';
 * ```
 */
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
declare const Icon: React.FC<IconProps>;
export default Icon;

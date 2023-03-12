import React, { InputHTMLAttributes, ReactNode } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    /**输入框是否禁用 */
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    /**如果有图标并且想通过点击图标做点事 */
    onIconClick?: Function;
    /**前缀 */
    pre?: string | ReactNode;
    /**后缀 */
    suf?: string | ReactNode;
}
/**
 * Input 输入框
 * ### 引用方法
 * ```js
 * import Input from 'wanyueship';
 * ```
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export default Input;

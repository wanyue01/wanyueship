import React from 'react';
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
interface BaseButtonProps {
    className?: string;
    /**设置Button的禁用 */
    disabled?: boolean;
    /**设置Button的大小 */
    btnSize?: ButtonSize;
    /**设置Button的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    /**设置Button的链接指向 */
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 页面中常用的按钮组件，适合完成特定的交互，支持 HTML button 和 a 链接的所有方法和属性
 * ### 引用方法
 * ```js
 * import { Button } from 'wanyueship';
 * ```
 */
declare const Button: React.FC<ButtonProps>;
export default Button;

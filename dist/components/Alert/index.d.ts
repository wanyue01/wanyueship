import React from "react";
export type AlertType = 'success' | 'default' | 'danger' | 'warning';
interface AlertProps {
    title: string;
    description?: string;
    /**类型 四种可选 针对四种不同的场景 */
    type?: AlertType;
    /**关闭alert时触发的事件 */
    onClose?: () => void;
    /**是否显示关闭图标*/
    closable?: boolean;
}
/**
 * 用于页面中展示重要的提示信息。点击右侧的叉提示自动消失
 * ### 引用方法
 *
 * ```js
 * import { Alert } from 'component-library';
 * ```
*/
declare const Alert: React.FC<AlertProps>;
export default Alert;

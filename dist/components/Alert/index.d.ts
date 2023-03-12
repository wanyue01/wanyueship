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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * import { Alert } from 'wanyueship';
=======
 * import { Alert } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { Alert } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { Alert } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ```
*/
declare const Alert: React.FC<AlertProps>;
export default Alert;

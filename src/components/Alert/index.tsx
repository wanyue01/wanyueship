import React, { useState } from "react";
import classNames from "classnames";
import Transition from "../Transition";
import Icon from "../Icon";

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
 * import { Alert } from 'wanyueship';
 * ```
*/
const Alert: React.FC<AlertProps> = (props) => {
  const [hide, setHide] = useState(false);
  const { title, description, type, onClose, closable } = props;
  const classes = classNames('alert', {
    [`alert-${type}`]: type,
  });
  const titleClass = classNames('alert-title', {
    'bold-title': description,
  });
  const handleClose = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
    setHide(true);
  }
  return (
    <Transition in={!hide} timeout={300} animation='zoom-in-top'>
      <div className={classes}>
        <span className={titleClass}>{title}</span>
        {description && <p className='alert-desc'>{description}</p>}
        {closable && <span onClick={handleClose} className='alert-close'>
          <Icon icon='xmark' />
          </span>}
      </div>
    </Transition>
  );
};

Alert.defaultProps = {
  type: 'default',
  closable: true
};

export default Alert;
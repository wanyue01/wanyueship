import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import classNames from "classnames";
import Icon from "../Icon";
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
};

/**
 * Input 输入框
 * ### 引用方法
 * ```js
 * import Input from 'component-library';
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { disabled, size, icon, onIconClick, pre, suf, style, defaultValue, ...restProps } = props;
  const classes = classNames('input-wrapper', {
    [`input-size-${size}`]: size,
    'input-disabled': disabled,
    'input-group': pre || suf,
    'input-group-has-pre': pre,
    'input-group-has-suf': suf,
  });
  // 如果用户想让该组件受控，在设计组件的时候就要考虑以下情况
  // input 的 value 和 defaultValue不能同时设置
  // value的值初始可能是 undefined 或 null
  const handleControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }
  if ('value' in props) {
    delete props.defaultValue;
    restProps.value = handleControlledValue(props.value);
  }
  const handleIconClick = () => {
    onIconClick && onIconClick();
  };
  return (
    <div className={classes} style={style} data-testid="wrapper">
      {pre && <div className="input-group-pre">{pre}</div>}
      {icon && <div className="icon-wrapper" onClick={handleIconClick}><Icon icon={icon} /></div>}
      <input ref={ref} className="input-inner" disabled={disabled} {...restProps} />
      {suf && <div className="input-group-suf">{suf}</div>}
    </div>
  );
});

Input.defaultProps = {
  disabled: false,
};

export default Input;
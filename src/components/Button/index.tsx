import React from 'react';
import classNames from 'classnames';

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
};

// 由于button和a上的联合事件太多，手补事件不现实，可以使用React提供的interface
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
// 由于button有的方法，a不一定有，所以需要所有的类型都是可选的，通过Partial实现
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; 

/**
 * 页面中常用的按钮组件，适合完成特定的交互，支持 HTML button 和 a 链接的所有方法和属性
 * ### 引用方法
 * ```js
 * import { Button } from 'component-library';
 * ```
 */
const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, btnSize, disabled, children, href, className, ...restProps } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnSize}`]: btnSize,
    [`btn-${btnType}`]: btnType,
    disabled: (btnType === 'link') && disabled
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
};

export default Button;
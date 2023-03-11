import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = 'zoom-in-top' | 'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right';
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};
const Transition: React.FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {/* {children} */}
      {wrapper ? <div>{children as ReactNode}</div> : children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  // 默认情况下，子组件首次挂载时不执行enter转换，也就是初始in为true时没有过渡效果
  // 当appear和in都为true会有过渡效果
  appear: true,
  unmountOnExit: true,
};

export default Transition;
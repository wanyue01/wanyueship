import React, { FC, ReactNode, useContext } from "react";
import { selectContext } from ".";
import Icon from "../Icon";
import classNames from "classnames";

export interface OptionProps {
  index?: number;
  /**默认根据这个值进行筛选，每个Option的value不能相同 */
  value: string;
  /**选项的标签，默认跟value一致 */
  label?: string;
  /**该选项是否禁用 */
  disabled?: boolean;
  children?: ReactNode;
};

const Option: FC<OptionProps> = (props) => {
  const { index, value, label, disabled, children } = props;
  const {selectedValue, onSelect, multiple} = useContext(selectContext);
  const isSelected = selectedValue.includes(value);
  const handleClick = () => {
    onSelect && !disabled && onSelect(value, isSelected);
  };
  const classes = classNames('select-item', {
    disabled,
    selected: isSelected
  })
  return (
    <li className={classes} key={index} onClick={handleClick}>
      {children || label ? label : value}
      {multiple && isSelected && <Icon icon={'check'} />}
    </li>
  );
};

Option.defaultProps = {
  disabled: false
};

Option.displayName = 'Option';

export default Option;
import React, { useMemo, useState, FC, ReactNode, MouseEvent, useRef, useEffect, createContext, FunctionComponentElement, cloneElement } from "react";
import Input from "../Input";
import Transition from "../Transition";
import Option, { OptionProps } from "./option";
import Icon from "../Icon";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";

export interface SelectProps {
  /**指定默认选中的条目	 是一个字符串数组 如果不是多选，数组元素只有一个*/
  defaultValue?: string[];
  /**选择框默认文字 */
  placeholder?: string;
  /**是否禁止使用 */
  disabled?: boolean
  /**当选中值改变时触发 */
  onChange?: (value: string, selectedValue: string[]) => void;
  /**下拉框出现/隐藏时触发 */
  onVisibleChange?: (visible: boolean) => void;
  children?: ReactNode;
  multiple?: boolean;
};

export interface SelectContext {
  selectedValue: string[];
  multiple?: boolean;
  onSelect?: (value: string, isSelected: boolean) => void;
};

export const selectContext = createContext<SelectContext>({ selectedValue: [] });

export const Select: FC<SelectProps> = (props) => {
  const { defaultValue, placeholder, disabled, onChange, onVisibleChange, children, multiple } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string[]>(defaultValue? defaultValue: []);
  const inputRef = useRef<HTMLInputElement>(null);
  // 记录当前容器的宽度，多选模式下的选中标签容器的宽度不超过它
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useMemo(() => {
    if (containerRef.current) {
      return containerRef.current.getBoundingClientRect().width - 32;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current]);
  // 当点击外部时下拉框消失
  useClickOutside(containerRef, () => {
    setOpenMenu(false);
    if (onVisibleChange && openMenu) {
      onVisibleChange(false);
    }
  });
  const handleOptionClick = (value: string, isSelected: boolean) => {
    let selected = selectedValue;
    if (multiple) {
      if (isSelected) {
        selected = selected.filter(item => item !== value);
        setSelectedValue(selected);
      } else {
        selected = [...selectedValue, value];
        setSelectedValue(selected);
      }
    } else {
      selected = [value];
      setSelectedValue(selected);
      setOpenMenu(false);
      onVisibleChange && onVisibleChange(false);
    }
    onChange && onChange(value, selected);
  };
  const passedContext: SelectContext = {
    selectedValue,
    onSelect: handleOptionClick,
    multiple
  };
  const handleClick = (e: MouseEvent) => {
    if (!disabled) {
      setOpenMenu(!openMenu);
      onVisibleChange && onVisibleChange(!openMenu);
    }
  };
  const inputValue = (multiple || selectedValue.length === 0) ? '' : selectedValue[0];
  // 根据有没有值来改变placeholder
  useEffect(() => {
    if (inputRef.current) {
      // inputRef.current.focus()
      if (multiple && selectedValue.length) inputRef.current.placeholder = '';
      else if (placeholder) inputRef.current.placeholder = placeholder;
    }
  }, [multiple, placeholder, selectedValue]);
  const generateOptions = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<OptionProps>;
      if (childElement.type.displayName === Option.displayName) {
        return cloneElement(childElement, { index });
      } else {
        console.error('Warning: Select need Select.Option to be its children');
      }
    })
  };
  const classes = classNames('select', {
    'menu-is-open': openMenu,
    disabled,
    multiple
  })
  return (
    <div ref={containerRef} className={classes}>
      <Input
        disabled={disabled}
        readOnly
        onClick={handleClick}
        placeholder={placeholder}
        ref={inputRef}
        value={inputValue}
        icon="angle-down"
        onIconClick={handleClick}
      />
      <selectContext.Provider value={passedContext}>
        <Transition
          timeout={300}
          animation='zoom-in-top'
          in={openMenu}
        >
          <ul className="select-dropdown">
            {generateOptions()}
          </ul>
        </Transition>
      </selectContext.Provider>
      {multiple &&
        <div className="selected-tags" style={{maxWidth: containerWidth}}>
          {selectedValue.map((value, index) => {
            return (
              <span className="tag" key={index}>
                {value}
                <Icon data-testid='xmark' icon={'xmark'} onClick={() => handleOptionClick(value, true)} />
              </span>
            )
          })}
        </div>
      }
    </div>
  )
};
Select.defaultProps = {
  defaultValue: [],
  disabled: false,
};
export type SelectComponent = FC<SelectProps> & {
  Option: FC<OptionProps>
}
const TransSelect = Select as SelectComponent;
TransSelect.Option = Option;
export default TransSelect;
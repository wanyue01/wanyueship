import React, { useState, ChangeEvent, useEffect, KeyboardEvent, useRef } from "react";
import Input, { InputProps } from "../Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import classNames from "classnames";
import Transition from "../Transition";

interface DataSourceObject {
  /**需要显示的字符串 */
  value: string;
};

export type DataSourceType<T = {}> = DataSourceObject & T;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 可以根据用户的输入自动调用该方法来过滤数据，这里的数据可以是一个数组或者是Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /**点击某一下拉项后的回调 */
  onSelect?: (item: DataSourceType) => void;
  /**支持自定义模板来渲染，返回ReactElement */
  renderOption?: (item: DataSourceType) => React.ReactElement;
};

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * ~~~js
 * import { AutoComplete } from 'component-library';
 * ~~~
 */
const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } = props;
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceValue = useDebounce(inputValue);
  const triggerSearch = useRef(false);
  const componentRef = useRef(null);
  // 当下拉列表在加载时或下拉列表有数据时showDropdown
  useEffect(() => {
    if (loading || suggestions.length) setShowDropdown(true);
    else setShowDropdown(false);
  }, [loading, suggestions]);
  // 当点击组件外的元素时关闭下拉列表
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  // 在延迟值改变时才触发请求
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
      setSuggestions([]);
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then(items => {
          setLoading(false);
          setSuggestions(items);
        })
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debounceValue, fetchSuggestions])
  // 使Input变成受控组件
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  // 点击的回调
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    triggerSearch.current = false;
    onSelect && onSelect(item);
  };
  const highlight = (index: number) => {
    if (index <= 0) {
      setHighlightIndex(0);
    } else if (index >= suggestions.length) {
      setHighlightIndex(suggestions.length - 1);
    } else {
      setHighlightIndex(index);
    }
  };
  // 处理键盘事件
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowUp':
        highlight(highlightIndex - 1);
        break;
      case 'ArrowDown':
        highlight(highlightIndex + 1);
        break;
      case 'Enter':
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        break;
      default:
        break;
    }
  };
  // 定制的自动补全列表
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  }
  // 生成下拉列表
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown}
        animation='zoom-in-top'
        timeout={300}
      >
        <ul className="suggestions-list" data-testid='list'>
          {loading &&
            <div className="suggestions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          }
          {suggestions.map((item, index) => {
            const classes = classNames('suggestions-item', {
              'item-highlight': index === highlightIndex
            });
            return (
              <li className={classes} key={index} onClick={() => handleSelect(item)}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    )
  };
  return (
    <div className="auto-complete" ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
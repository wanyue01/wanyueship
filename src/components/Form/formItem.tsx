import React, { ReactNode, FC, useContext, useEffect, ReactElement, cloneElement } from 'react';
import classNames from 'classnames';
import { FormContext } from '.';
import { CustomRule } from './useStore';

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  /**表单项对应的值的属性名 普通的input对应的属性名是value 而checkbox对应的属性名是checked */
  valuePropName?: string;
  /**表单项值改变时对应的事件名 */
  valueChangeHandlerName?: string;
  /**从event获取值的方法 */
  getValueFromEvent?: (event: any) => any;
  /**检查表单项值是否合法对应的事件名 默认是onBlur */
  valueCheckHandlerName?: string;
  /**校验规则 可以去async-validator处查看 */
  rules?: CustomRule[];
};

export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;

export const FormItem: FC<FormItemProps> = (props) => {
  const {
    name,
    label,
    children,
    valuePropName,
    valueChangeHandlerName,
    getValueFromEvent,
    valueCheckHandlerName,
    rules,
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'valueChangeHandlerName' | 'valuePropName' | 'valueCheckHandlerName'>;
  // console.log('name', name);
  const rowClass = classNames('form-item-row', {
    'row-no-label': !label,
  });
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext);

  useEffect(() => {
    const initialValue = initialValues && initialValues[name];
    dispatch({ type: 'addField', name, value: { name, value: typeof initialValue !== 'undefined' ? initialValue : '', rules: rules || [], errors: [] } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 获取store对应的value
  const fieldState = fields[name];
  const value = fieldState?.value;
  const errors = fieldState?.errors;
  const hasError = errors && errors.length > 0;
  const isRequired = rules?.some(rule => (typeof rule !== 'function') && rule.required);
  const labelClass = classNames({
    'form-item-required': isRequired,
  });
  const itemClass = classNames('form-item-control', {
    'form-item-has-error': hasError,
  });
  const onVauleUpdate = (e: any) => {
    const value = getValueFromEvent(e);
    dispatch({ type: 'updateValue', name, value });
  };
  const onValueValidate = async () => {
    await validateField(name);
  }
  // 1 手动创建一个属性对象，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {};
  // 适应不同的事件以及value属性名称
  controlProps[valuePropName] = value;
  controlProps[valueChangeHandlerName] = onVauleUpdate;
  if (rules) {
    controlProps[valueCheckHandlerName] = onValueValidate;
  }
  // 2 获取children数组的第一个元素
  const childList = React.Children.toArray(children);
  // todo 判断children的类型，显示警告
  if (childList.length === 0) {
    console.error('No child element found in Form.Item, please provide one form component');
  }
  if (childList.length > 1) {
    console.warn('Only support one child element in the Form.Item, other will be omitted');
  }
  // 判断childList[0]是不是ReactElement
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid ReactElement');
  }
  const child = childList[0] as ReactElement;
  // 3 cloneElement
  const returnChildNode = cloneElement(child, {
    ...child.props,
    ...controlProps
  });
  return (
    <div className={rowClass}>
      {label &&
        <div className='form-item-label'>
          <label title={label} className={labelClass}>{label}</label>
        </div>
      }
      <div className='form-item'>
        <div className={itemClass}>
          {returnChildNode}
        </div>
        {
          hasError &&
          <div className='form-item-explain'>
            <span>{errors[0].message}</span>
          </div>
        }
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  valuePropName: 'value',
  valueChangeHandlerName: 'onChange',
  getValueFromEvent(event) {
    return event.target.value;
  },
  valueCheckHandlerName: 'onBlur',
};

export default FormItem;
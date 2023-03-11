import { ValidateError } from 'async-validator/dist-types/interface';
import React, { FC, ReactNode, createContext, FormEvent, forwardRef, useImperativeHandle } from 'react';
import useStore, { FormState } from './useStore';
import { FormItemProps, FormItem } from './formItem';

export type RenderProps = (form: FormState) => ReactNode;
export interface FormProps {
  name?: string;
  children?: ReactNode | RenderProps;
  /**表单项初始值 */
  initialValues?: Record<string, any>;
  /**提交表单且数据验证成功后回调事件 */
  onFinish?: (values: Record<string, any>) => void;
  /**提交表单且数据验证失败后回调事件 */
  onFinishFailed?: (values: Record<string, any>, errors: Record<string, ValidateError[]>) => void;
};

export type IFormContext =
  Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'>
  & Pick<FormProps, 'initialValues'>;
export const FormContext = createContext<IFormContext>({} as IFormContext);
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;

const Form = forwardRef<IFormRef, FormProps>((props, ref) => {
  const { name, children, initialValues, onFinish, onFinishFailed } = props;
  const { form, fields, dispatch, ...rest } = useStore(initialValues);
  const { validateField, validateAllFields } = rest;
  useImperativeHandle(ref, () => ({
    ...rest
  }));
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField,
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { isValid, errors, values } = await validateAllFields();
    if (isValid && onFinish) {
      onFinish(values);
    } else if (!isValid && onFinishFailed) {
      onFinishFailed(values, errors);
    }
  };
  let childrenNode;
  if (typeof children === 'function') {
    childrenNode = children(form);
  } else {
    childrenNode = children;
  }
  console.log(fields)

  return (
    <form name={name} className='form-component' onSubmit={handleSubmit}>
      <FormContext.Provider value={passedContext}>
        {childrenNode}
      </FormContext.Provider>
    </form>
  );
});

Form.defaultProps = {
  name: 'form',
};

type FormComponent = typeof Form & {
  Item: FC<FormItemProps>,
};
const TransForm = Form as FormComponent;
TransForm.Item = FormItem;

export default Form;
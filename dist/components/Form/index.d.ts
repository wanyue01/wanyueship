import { ValidateError } from 'async-validator/dist-types/interface';
import React, { ReactNode } from 'react';
import useStore, { FormState } from './useStore';
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
}
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare const FormContext: React.Context<IFormContext>;
export type IFormRef = Omit<ReturnType<typeof useStore>, 'fields' | 'dispatch' | 'form'>;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
/**
 * 页面中常用的Form表单，支持自定义
 * ### 引用方法
 * ```js
 * import { Form } from 'wanyueship';
 * ```
 */
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
declare const Form: React.ForwardRefExoticComponent<FormProps & React.RefAttributes<IFormRef>>;
export default Form;

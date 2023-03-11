import { ReactNode, FC } from 'react';
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
}
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export declare const FormItem: FC<FormItemProps>;
export default FormItem;

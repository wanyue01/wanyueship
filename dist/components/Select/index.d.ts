import React, { FC, ReactNode } from "react";
import { OptionProps } from "./option";
export interface SelectProps {
    /**指定默认选中的条目	 是一个字符串数组 如果不是多选，数组元素只有一个*/
    defaultValue?: string[];
    /**选择框默认文字 */
    placeholder?: string;
    /**是否禁止使用 */
    disabled?: boolean;
    /**当选中值改变时触发 */
    onChange?: (value: string, selectedValue: string[]) => void;
    /**下拉框出现/隐藏时触发 */
    onVisibleChange?: (visible: boolean) => void;
    children?: ReactNode;
    multiple?: boolean;
}
export interface SelectContext {
    selectedValue: string[];
    multiple?: boolean;
    onSelect?: (value: string, isSelected: boolean) => void;
}
export declare const selectContext: React.Context<SelectContext>;
export declare const Select: FC<SelectProps>;
export type SelectComponent = FC<SelectProps> & {
    Option: FC<OptionProps>;
};
declare const TransSelect: SelectComponent;
export default TransSelect;

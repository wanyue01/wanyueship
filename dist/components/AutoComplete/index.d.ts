import React from "react";
import { InputProps } from "../Input";
interface DataSourceObject {
    /**需要显示的字符串 */
    value: string;
}
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
}
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * ~~~js
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * import { AutoComplete } from 'wanyueship';
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
=======
 * import { AutoComplete } from 'component-library';
>>>>>>> ea33a46164029b48d2d7924aae8c156908758696
 * ~~~
 */
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;

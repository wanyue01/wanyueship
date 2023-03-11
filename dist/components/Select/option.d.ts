import { FC, ReactNode } from "react";
export interface OptionProps {
    index?: number;
    /**默认根据这个值进行筛选，每个Option的value不能相同 */
    value: string;
    /**选项的标签，默认跟value一致 */
    label?: string;
    /**该选项是否禁用 */
    disabled?: boolean;
    children?: ReactNode;
}
declare const Option: FC<OptionProps>;
export default Option;

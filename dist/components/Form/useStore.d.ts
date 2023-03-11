/// <reference types="react" />
import { RuleItem, ValidateError } from 'async-validator';
export type CustomRuleFunc = ({ getFieldValue }: {
    getFieldValue: Function;
}) => RuleItem;
export type CustomRule = CustomRuleFunc | RuleItem;
export interface FieldDetail {
    name: string;
    value: string;
    rules: CustomRule[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface ValidateErrorType extends Error {
    errors: ValidateError[];
    fields: Record<string, ValidateError[]>;
}
export interface FormState {
    isValid: boolean;
    isSubmitting: boolean;
    errors: Record<string, ValidateError[]>;
}
export interface FieldsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
export default function useStore(initialVaules?: Record<string, any>): {
    form: FormState;
    fields: FieldsState;
    dispatch: import("react").Dispatch<FieldsAction>;
    validateField: (name: string) => Promise<void>;
    getFieldValue: (name: string) => string;
    validateAllFields: () => Promise<{
        isValid: boolean;
        errors: Record<string, ValidateError[]>;
        values: Record<string, any>;
    }>;
    getFieldsValue: () => Record<string, any>;
    setFieldValue: (name: string, value: any) => void;
    resetFields: () => void;
};

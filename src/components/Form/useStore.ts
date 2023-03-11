import { useState, useReducer } from 'react';
import Schema, { RuleItem, ValidateError } from 'async-validator';

export type CustomRuleFunc = ({ getFieldValue }: { getFieldValue: Function }) => RuleItem;
export type CustomRule = CustomRuleFunc | RuleItem;
export interface FieldDetail {
  name: string;
  value: string;
  rules: CustomRule[];
  isValid: boolean;
  errors: ValidateError[];
};

export interface FieldsState {
  [key: string]: FieldDetail;
};

export interface ValidateErrorType extends Error {
  errors: ValidateError[];
  fields: Record<string, ValidateError[]>;
};

export interface FormState {
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, ValidateError[]>;
};

export interface FieldsAction {
  type: 'addField' | 'updateValue' | 'updateValidateResult';
  name: string;
  value: any;
};

function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return { ...state, [action.name]: { ...action.value } };
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value }
      };
    case 'updateValidateResult':
      const { isValid, errors } = action.value;
      return {
        ...state,
        [action.name]: { ...state[action.name], isValid, errors }
      };
    default:
      return state;
  }
}

const mapValues = (fields: Record<string, any>, cb: (item: Record<string, any>) => any) => {
  return Object.keys(fields).reduce((prev: Record<string, any>, cur: string) => {
    prev[cur] = cb(fields[cur]);
    return prev;
  }, {});
};

export default function useStore(initialVaules?: Record<string, any>) {
  const [form, setForm] = useState<FormState>({ isValid: false, isSubmitting: false, errors: {} });
  const [fields, dispatch] = useReducer(fieldsReducer, {});
  const getFieldValue = (name: string) => {
    return fields[name] && fields[name].value;
  };
  const getFieldsValue = () => {
    return mapValues(fields, item => item.value);
  };
  const setFieldValue = (name: string, value: any) => {
    if (fields[name]) {
      dispatch({ type: 'updateValue', name, value });
    }
  };
  const resetFields = () => {
    if (initialVaules) {
      for (let name in initialVaules) {
        if (fields[name]) {
          dispatch({ type: 'updateValue', name, value: initialVaules[name] });
        } else {
          dispatch({ type: 'updateValue', name, value: '' });
        }
      }
    }
  };
  const transformRules = (rules: CustomRule[]) => {
    return rules.map(rule => {
      if (typeof rule === 'function') {
        return rule({ getFieldValue });
      }
      return rule;
    })
  }
  const validateField = async (name: string) => {
    const { value, rules } = fields[name];
    const descriptor = {
      [name]: transformRules(rules),
    };
    const valueMap = {
      [name]: value,
    };
    const validator = new Schema(descriptor);
    let isValid = true;
    let errors: ValidateError[] = [];
    try {
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false;
      const err = error as any;
      errors = err.errors;
    } finally {
      dispatch({
        type: 'updateValidateResult',
        name,
        value: {
          isValid,
          errors
        }
      });
    }
  };
  const validateAllFields = async () => {
    let isValid = true;
    let errors: Record<string, ValidateError[]> = {};
    const valueMap = mapValues(fields, item => item.value);
    const descriptor = mapValues(fields, item => transformRules(item.rules));
    const validator = new Schema(descriptor);
    setForm({ ...form, isSubmitting: true });
    try {
      await validator.validate(valueMap);
    } catch (error) {
      isValid = false;
      const err = error as ValidateErrorType;
      errors = err.fields;
      for (let name in fields) {
        if (errors[name]) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid, errors: errors[name] } });
        } else if (!errors[name] && fields[name].rules.length > 0) {
          dispatch({ type: 'updateValidateResult', name, value: { isValid: true, errors: [] } });
        }
      }
    } finally {
      setForm({ ...form, isSubmitting: false, isValid, errors });
      return {
        isValid,
        errors,
        values: valueMap
      }
    }
  };
  return {
    form,
    fields,
    dispatch,
    validateField,
    getFieldValue,
    validateAllFields,
    getFieldsValue,
    setFieldValue,
    resetFields
  };
}
// src/types.ts
export type FieldType = 'text' | 'number' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date';

export type ValidationType = 'required' | 'minLength' | 'maxLength' | 'email' | 'password';

export interface ValidationRule {
  type: ValidationType;
  value?: number | string;
  message?: string;
}

export interface DerivedConfig {
  parentIds: string[];
  expression: string;
}

export interface Field {
  id: string;
  name: string;
  type: FieldType;
  label: string;
  required?: boolean;
  defaultValue?: any;
  options?: string[];
  validations?: ValidationRule[];
  derived?: DerivedConfig | null;
}

export interface FormSchema {
  id: string;
  name: string;
  createdAt: string;
  fields: Field[];
}

export interface FormState {
  currentForm: FormSchema | null;
  savedForms: FormSchema[];
}

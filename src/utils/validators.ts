// src/utils/validators.ts
import { ValidationRule } from '../types';

export const runValidations = (value: any, rules: ValidationRule[] = []): string[] => {
  const errs: string[] = [];
  for (const r of rules) {
    switch (r.type) {
      case 'required':
        if (value === undefined || value === null || String(value).trim() === '') errs.push(r.message ?? 'This field is required');
        break;
      case 'minLength':
        if (typeof value === 'string' && r.value && value.length < Number(r.value)) errs.push(r.message ?? `Minimum length ${r.value}`);
        break;
      case 'maxLength':
        if (typeof value === 'string' && r.value && value.length > Number(r.value)) errs.push(r.message ?? `Maximum length ${r.value}`);
        break;
      case 'email':
        if (value) {
          const re = /\S+@\S+\.\S+/;
          if (!re.test(value)) errs.push(r.message ?? 'Invalid email');
        }
        break;
      case 'password':
        if (value) {
          const minOk = typeof r.value === 'number' ? value.length >= r.value : value.length >= 8;
          const numberOk = /\d/.test(value);
          if (!minOk || !numberOk) errs.push(r.message ?? 'Password must be min 8 chars and include a number');
        }
        break;
      default:
        break;
    }
  }
  return errs;
};

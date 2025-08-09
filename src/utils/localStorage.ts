// src/utils/localStorage.ts
import { FormSchema } from '../types';

const KEY = 'form_builder_saved_forms_v1';

export const loadAllForms = (): FormSchema[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as FormSchema[];
  } catch (e) {
    console.error('loadAllForms err', e);
    return [];
  }
};

export const saveFormToStorage = (schema: FormSchema) => {
  const all = loadAllForms();
  const idx = all.findIndex(f => f.id === schema.id);
  if (idx >= 0) all[idx] = schema;
  else all.push(schema);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const loadFormById = (id: string): FormSchema | null => loadAllForms().find(f => f.id === id) ?? null;

export const removeFormById = (id: string) => {
  const next = loadAllForms().filter(f => f.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
};

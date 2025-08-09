import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Field, FormSchema } from "../types";

interface FormsState {
  fields: Field[];
  savedForms: FormSchema[];
  currentForm: FormSchema | null;
}

const initialState: FormsState = {
  fields: [],
  savedForms: [],
  currentForm: null,
};

const formSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<Field>) => {
      state.fields.push(action.payload);
    },
    updateField: (state, action: PayloadAction<{ index: number; field: Field }>) => {
      state.fields[action.payload.index] = action.payload.field;
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.fields.splice(action.payload, 1);
    },
    moveFieldUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index > 0) {
        [state.fields[index - 1], state.fields[index]] = [
          state.fields[index],
          state.fields[index - 1],
        ];
      }
    },
    moveFieldDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index < state.fields.length - 1) {
        [state.fields[index + 1], state.fields[index]] = [
          state.fields[index],
          state.fields[index + 1],
        ];
      }
    },
    resetForm: (state) => {
      state.fields = [];
    },
    setCurrentForm: (state, action: PayloadAction<FormSchema | null>) => {
      state.currentForm = action.payload;
      if (action.payload) {
        state.fields = action.payload.fields;
      }
    },
    setSavedForms: (state, action: PayloadAction<FormSchema[]>) => {
      state.savedForms = action.payload;
    },
  },
});

export const { 
  addField, 
  updateField, 
  removeField, 
  moveFieldUp, 
  moveFieldDown, 
  resetForm,
  setCurrentForm,
  setSavedForms 
} = formSlice.actions;

export type { FormsState };

export default formSlice.reducer;

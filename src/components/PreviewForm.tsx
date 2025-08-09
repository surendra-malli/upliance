// src/components/PreviewForm.tsx
import React, { useEffect, useState } from 'react';
import { FormSchema } from '../types';
import FieldRenderer from './FieldRenderer';
import { Box, Button, Typography, Paper, Stack, CircularProgress, Snackbar, Alert } from '@mui/material';
import { runValidations } from '../utils/validators';
import { evaluateDerived } from '../utils/derived';

interface Props {
  form: FormSchema;
}

const PreviewForm: React.FC<Props> = ({ form }) => {
  const initialValues: Record<string, any> = {};
  form.fields.forEach(f => initialValues[f.name] = f.defaultValue ?? (f.type === 'checkbox' ? false : ''));

  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [snack, setSnack] = useState<{ open: boolean; msg: string; sev: 'success' | 'error' | 'info' | 'warning' }>({ open: false, msg: '', sev: 'success' });

  useEffect(() => {
    form.fields.forEach(f => {
      if (f.derived) {
        const ctx: Record<string, any> = {};
        f.derived.parentIds.forEach(pid => {
          const parent = form.fields.find(x => x.id === pid);
          if (parent) ctx[parent.name] = values[parent.name];
        });
        const result = evaluateDerived(f.derived.expression, ctx);
        setValues(prev => (prev[f.name] === result ? prev : { ...prev, [f.name]: result }));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, form.fields]);

  const onChange = (fieldName: string, val: any) => {
    setValues(v => ({ ...v, [fieldName]: val }));
    const field = form.fields.find(f => f.name === fieldName);
    if (field) {
      const errs = runValidations(val, field.validations || []);
      setErrors(prev => ({ ...prev, [fieldName]: errs }));
    }
  };

  const onSubmit = () => {
    const allErrors: Record<string, string[]> = {};
    form.fields.forEach(f => {
      const errs = runValidations(values[f.name], f.validations || []);
      if (errs.length) allErrors[f.name] = errs;
    });
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSnack({ open: true, msg: 'Form validated successfully (no backend)', sev: 'success' });
      }, 900);
    } else setSnack({ open: true, msg: 'Fix validation errors before submitting', sev: 'error' });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>{form.name || 'Untitled form'}</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Interact with the form below. Derived fields auto-update.</Typography>

      <Stack spacing={2}>
        {form.fields.map(f => (
          <div key={f.id}>
            <FieldRenderer field={f} value={values[f.name]} onChange={(v) => onChange(f.name, v)} error={errors[f.name] ? errors[f.name][0] : undefined} />
          </div>
        ))}
      </Stack>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <Button variant="contained" onClick={onSubmit} disabled={submitting}>
          {submitting ? <CircularProgress size={20} color="inherit" /> : 'Submit'}
        </Button>
        <Button variant="outlined" onClick={() => { setValues(initialValues); setErrors({}); }}>Reset</Button>
      </Box>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={() => setSnack(s => ({ ...s, open: false }))} severity={snack.sev} sx={{ width: '100%' }}>{snack.msg}</Alert>
      </Snackbar>
    </Paper>
  );
};

export default PreviewForm;

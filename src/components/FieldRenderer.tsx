// src/components/FieldRenderer.tsx
import React from 'react';
import { Field } from '../types';
import { TextField, Checkbox, FormControlLabel, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormControlLabel as RFL, Radio, Box, Typography } from '@mui/material';

interface Props {
  field: Field;
  value: any;
  onChange: (v: any) => void;
  error?: string | null;
}

const FieldRenderer: React.FC<Props> = ({ field, value, onChange, error }) => {
  const placeholder = field.defaultValue ?? `Enter ${field.label.toLowerCase()}`;

  switch (field.type) {
    case 'text':
    case 'number':
    case 'date':
      return (
        <Box sx={{ mb: 2 }}>
          <TextField
            label={field.label}
            placeholder={String(placeholder)}
            type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
            value={value ?? field.defaultValue ?? ''}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            helperText={error ?? (field.required ? 'This field is required' : '')}
            fullWidth
            InputLabelProps={field.type === 'date' ? { shrink: true } : undefined}
          />
        </Box>
      );
    case 'textarea':
      return (
        <Box sx={{ mb: 2 }}>
          <TextField
            label={field.label}
            placeholder={String(placeholder)}
            multiline
            minRows={3}
            value={value ?? field.defaultValue ?? ''}
            onChange={(e) => onChange(e.target.value)}
            error={!!error}
            helperText={error ?? ''}
            fullWidth
          />
        </Box>
      );
    case 'checkbox':
      return (
        <Box sx={{ mb: 2 }}>
          <FormControlLabel control={<Checkbox checked={!!value} onChange={(e) => onChange(e.target.checked)} />} label={field.label} />
          {error && <Typography variant="caption" color="error">{error}</Typography>}
        </Box>
      );
    case 'select':
      return (
        <Box sx={{ mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select value={value ?? field.defaultValue ?? ''} label={field.label} onChange={(e) => onChange(e.target.value)}>
              {(field.options || []).map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
            </Select>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        </Box>
      );
    case 'radio':
      return (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>{field.label}</Typography>
          <FormControl>
            <RadioGroup value={value ?? field.defaultValue ?? ''} onChange={(e) => onChange(e.target.value)}>
              {(field.options || []).map(opt => <RFL key={opt} value={opt} control={<Radio />} label={opt} />)}
            </RadioGroup>
            {error && <Typography variant="caption" color="error">{error}</Typography>}
          </FormControl>
        </Box>
      );
    default:
      return null;
  }
};

export default FieldRenderer;

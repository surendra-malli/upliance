// src/components/FieldList.tsx
import React from 'react';
import { Field } from '../types';
import { Box, IconButton, Paper, Typography, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface Props {
  fields: Field[];
  onEdit: (f: Field) => void;
  onDelete: (id: string) => void;
  onMove: (from: number, to: number) => void;
}

const FieldList: React.FC<Props> = ({ fields, onEdit, onDelete, onMove }) => {
  return (
    <Box>
      {fields.map((f, idx) => (
        <Paper key={f.id} variant="outlined" sx={{ mb: 1, p: 1.25, display: 'flex', alignItems: 'center', gap: 1, transition: 'transform .12s', '&:hover': { transform: 'translateY(-3px)' } }}>
          <DragIndicatorIcon color="disabled" sx={{ mr: 1 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={700}>{f.label}</Typography>
            <Typography variant="caption" color="text.secondary">{f.type} • {f.name}</Typography>
          </Box>
          <Stack direction="row" spacing={0.5}>
            <IconButton size="small" onClick={() => onMove(idx, Math.max(0, idx - 1))} aria-label="move up"><ArrowUpwardIcon fontSize="small" /></IconButton>
            <IconButton size="small" onClick={() => onMove(idx, Math.min(fields.length - 1, idx + 1))} aria-label="move down"><ArrowDownwardIcon fontSize="small" /></IconButton>
            <IconButton size="small" onClick={() => onEdit(f)} aria-label="edit"><EditIcon fontSize="small" /></IconButton>
            <IconButton size="small" onClick={() => onDelete(f.id)} aria-label="delete"><DeleteIcon fontSize="small" /></IconButton>
          </Stack>
        </Paper>
      ))}
      {fields.length === 0 && <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No fields yet — click <strong>Add field</strong> to start.</Typography>}
    </Box>
  );
};

export default FieldList;

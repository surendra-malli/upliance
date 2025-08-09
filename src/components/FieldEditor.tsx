import React from "react";
import { Field } from "../types";
import {
  TextField,
  IconButton,
  Stack,
  MenuItem,
  ButtonGroup,
} from "@mui/material";
import { Delete, ArrowUpward, ArrowDownward } from "@mui/icons-material";

interface Props {
  field: Field;
  onChange: (updated: Field) => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const FieldEditor: React.FC<Props> = ({
  field,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <Stack spacing={2} sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
      <TextField
        label="Label"
        value={field.label}
        onChange={(e) => onChange({ ...field, label: e.target.value })}
      />
      <TextField
        select
        label="Type"
        value={field.type}
        onChange={(e) => onChange({ ...field, type: e.target.value as Field["type"] })}
      >
        <MenuItem value="text">Text</MenuItem>
        <MenuItem value="number">Number</MenuItem>
        <MenuItem value="date">Date</MenuItem>
        <MenuItem value="select">Select</MenuItem>
      </TextField>

      {field.type === "select" && (
        <TextField
          label="Options (comma separated)"
          value={field.options?.join(",") || ""}
          onChange={(e) =>
            onChange({ ...field, options: e.target.value.split(",").map((opt) => opt.trim()) })
          }
        />
      )}

      <ButtonGroup>
        <IconButton color="primary" onClick={onMoveUp}>
          <ArrowUpward />
        </IconButton>
        <IconButton color="primary" onClick={onMoveDown}>
          <ArrowDownward />
        </IconButton>
        <IconButton color="error" onClick={onDelete}>
          <Delete />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
};

export default FieldEditor;

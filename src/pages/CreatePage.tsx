// // src/pages/CreatePage.tsx
// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   Select,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   TextField,
//   Switch,
//   Grid,
//   IconButton,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import type { FormSchema, Field, FieldType } from "../types";
// import { v4 as uuidv4 } from "uuid";

// const FIELD_TYPES: Field["type"][] = [
//   "text",
//   "number",
//   "checkbox",
//   "radio",
//   "date",
// ];

// const CreatePage: React.FC = () => {
//   const [fieldType, setFieldType] = useState<FieldType>("text");
//   const [fields, setFields] = useState<Field[]>([]);
//   const [formId, setFormId] = useState<string>(uuidv4());

//   // Dialog state
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMessage, setDialogMessage] = useState("");

//   const handleAddField = () => {
//     const baseField: Omit<Field, "id"> = {
//       type: fieldType,
//       name: `field_${fields.length + 1}`,
//       label: `Field ${fields.length + 1}`,
//       required: false,
//     };

//     const newField: Field = {
//       ...baseField,
//       id: uuidv4(),
//       ...(fieldType === "select" ||
//       fieldType === "radio" ||
//       fieldType === "checkbox"
//         ? { options: ["Option 1", "Option 2"] }
//         : {}),
//     };

//     setFields((prev) => [...prev, newField]);
//   };

//   const handleUpdateField = (
//     id: string,
//     key: keyof Field,
//     value: Field[keyof Field]
//   ) => {
//     setFields((prev) =>
//       prev.map((field) =>
//         field.id === id ? { ...field, [key]: value } : field
//       )
//     );
//   };

//   const handleDeleteField = (id: string) => {
//     setFields((prev) => prev.filter((f) => f.id !== id));
//   };

//   const handleMoveField = (index: number, direction: "up" | "down") => {
//     const newFields = [...fields];
//     const targetIndex = direction === "up" ? index - 1 : index + 1;
//     if (targetIndex < 0 || targetIndex >= newFields.length) return;
//     [newFields[index], newFields[targetIndex]] = [
//       newFields[targetIndex],
//       newFields[index],
//     ];
//     setFields(newFields);
//   };

//   const handleSaveForm = () => {
//     const formName = prompt("Enter a name for this form:");
//     if (!formName) return;

//     const formToSave: FormSchema = {
//       id: formId,
//       name: formName,
//       fields: fields.map((field) => ({
//         ...field,
//         validations: field.required
//           ? [
//               ...(field.validations || []),
//               { type: "required", message: "This field is required" },
//             ]
//           : field.validations,
//       })),
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       const savedForms: FormSchema[] = JSON.parse(
//         localStorage.getItem("form_builder_saved_forms_v1") || "[]"
//       );

//       const existingIndex = savedForms.findIndex((f) => f.id === formToSave.id);
//       if (existingIndex >= 0) {
//         savedForms[existingIndex] = formToSave;
//       } else {
//         savedForms.push(formToSave);
//       }

//       localStorage.setItem(
//         "form_builder_saved_forms_v1",
//         JSON.stringify(savedForms)
//       );

//       setDialogMessage(`Form "${formName}" saved successfully!`);
//       setDialogOpen(true);

//       // Reset for new form
//       setFields([]);
//       setFormId(uuidv4());
//     } catch (error) {
//       console.error("Error saving form:", error);
//       setDialogMessage("Failed to save form. Please check console for details.");
//       setDialogOpen(true);
//     }
//   };

//   return (
//     <Box p={2}>
//       <Typography variant="h4" mb={2}>
//         Create your form
//       </Typography>

//       {/* Field selector */}
//       <Paper sx={{ p: 2, mb: 2 }}>
//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} sm={4} md={3}>
//             <Select
//               fullWidth
//               value={fieldType}
//               onChange={(e) => setFieldType(e.target.value as Field["type"])}
//             >
//               {FIELD_TYPES.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </MenuItem>
//               ))}
//             </Select>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" onClick={handleAddField}>
//               Add Field
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button
//               variant="outlined"
//               disabled={fields.length === 0}
//               onClick={handleSaveForm}
//             >
//               Save form
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Fields list */}
//       {fields.map((field, index) => (
//         <Accordion key={field.id} defaultExpanded>
//           <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//             <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
//               {field.label}
//             </Typography>
//             <Typography color="text.secondary">
//               {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
//             </Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Box display="flex" flexDirection="column" gap={2}>
//               <TextField
//                 label="Label"
//                 value={field.label}
//                 onChange={(e) =>
//                   handleUpdateField(field.id, "label", e.target.value)
//                 }
//               />
//               <TextField
//                 label="Default value"
//                 value={field.defaultValue || ""}
//                 onChange={(e) =>
//                   handleUpdateField(field.id, "defaultValue", e.target.value)
//                 }
//               />

//               <Box display="flex" gap={2} alignItems="center">
//                 <Switch
//                   checked={field.required || false}
//                   onChange={(e) =>
//                     handleUpdateField(field.id, "required", e.target.checked)
//                   }
//                 />
//                 <Typography>Required</Typography>
//               </Box>

//               <Box display="flex" gap={2}>
//                 <TextField
//                   label="Min length"
//                   type="number"
//                   value={field?.minLength ?? ""}
//                   onChange={(e) =>
//                     handleUpdateField(
//                       field.id,
//                       "minLength",
//                       Number(e.target.value)
//                     )
//                   }
//                 />
//                 <TextField
//                   label="Max length"
//                   type="number"
//                   value={field.maxLength ?? ""}
//                   onChange={(e) =>
//                     handleUpdateField(
//                       field.id,
//                       "maxLength",
//                       Number(e.target.value)
//                     )
//                   }
//                 />
//               </Box>

//               <Box display="flex" gap={2} alignItems="center">
//                 <Switch
//                   checked={field.emailFormat || false}
//                   onChange={(e) =>
//                     handleUpdateField(field.id, "emailFormat", e.target.checked)
//                   }
//                 />
//                 <Typography>Email format</Typography>
//               </Box>

//               <Box display="flex" gap={2} alignItems="center">
//                 <Switch
//                   checked={field.passwordRule || false}
//                   onChange={(e) =>
//                     handleUpdateField(
//                       field.id,
//                       "passwordRule",
//                       e.target.checked
//                     )
//                   }
//                 />
//                 <Typography>Password rule (min 8, number)</Typography>
//               </Box>

//               {/* Derived field */}
//               <Box display="flex" gap={2} alignItems="center">
//                 <Switch
//                   checked={field.derived || false}
//                   onChange={(e) =>
//                     handleUpdateField(field.id, "derived", e.target.checked)
//                   }
//                 />
//                 <Typography>Derived field</Typography>
//               </Box>

//               {field.derived && (
//                 <>
//                   <TextField
//                     label="Parent fields"
//                     value={field.parentFields ?? ""}
//                     onChange={(e) =>
//                       handleUpdateField(
//                         field.id,
//                         "parentFields",
//                         e.target.value
//                       )
//                     }
//                   />
//                   <TextField
//                     label="Formula"
//                     placeholder="Example: (2025 - Number(values['birthYear']))"
//                     value={field.formula ?? ""}
//                     onChange={(e) =>
//                       handleUpdateField(field.id, "formula", e.target.value)
//                     }
//                   />
//                 </>
//               )}

//               {/* Action buttons */}
//               <Box display="flex" justifyContent="flex-end" gap={1}>
//                 <IconButton onClick={() => handleMoveField(index, "up")}>
//                   <ArrowUpwardIcon />
//                 </IconButton>
//                 <IconButton onClick={() => handleMoveField(index, "down")}>
//                   <ArrowDownwardIcon />
//                 </IconButton>
//                 <IconButton
//                   color="error"
//                   onClick={() => handleDeleteField(field.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </AccordionDetails>
//         </Accordion>
//       ))}

//       {/* Dialog */}
//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Form Status</DialogTitle>
//         <DialogContent>
//           <Typography>{dialogMessage}</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)}>OK</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default CreatePage;


// src/pages/CreatePage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Switch,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import type { FormSchema, Field, FieldType } from "../types";
import { v4 as uuidv4 } from "uuid";

const FIELD_TYPES: Field["type"][] = [
  "text",
  "number",
  "checkbox",
  "radio",
  "date",
];

// Extended Field interface for form builder
interface ExtendedField extends Field {
  minLength?: number;
  maxLength?: number;
  emailFormat?: boolean;
  passwordRule?: boolean;
  parentFields?: string;
  formula?: string;
}

const CreatePage: React.FC = () => {
  const [fieldType, setFieldType] = useState<FieldType>("text");
  const [fields, setFields] = useState<ExtendedField[]>([]);
  const [formId, setFormId] = useState<string>(uuidv4());

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleAddField = () => {
    const baseField: Omit<ExtendedField, "id"> = {
      type: fieldType,
      name: `field_${fields.length + 1}`,
      label: `Field ${fields.length + 1}`,
      required: false,
      minLength: undefined,
      maxLength: undefined,
      emailFormat: false,
      passwordRule: false,
      parentFields: "",
      formula: "",
    };

    const newField: ExtendedField = {
      ...baseField,
      id: uuidv4(),
      ...(fieldType === "select" ||
      fieldType === "radio" ||
      fieldType === "checkbox"
        ? { options: ["Option 1", "Option 2"] }
        : {}),
    };

    setFields((prev) => [...prev, newField]);
  };

  const handleUpdateField = (
    id: string,
    key: keyof ExtendedField,
    value: any
  ) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const handleDeleteField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleMoveField = (index: number, direction: "up" | "down") => {
    const newFields = [...fields];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    [newFields[index], newFields[targetIndex]] = [
      newFields[targetIndex],
      newFields[index],
    ];
    setFields(newFields);
  };

  const handleSaveForm = () => {
    const formName = prompt("Enter a name for this form:");
    if (!formName) return;

    const formToSave: FormSchema = {
      id: formId,
      name: formName,
      fields: fields.map((field) => ({
        ...field,
        validations: field.required
          ? [
              ...(field.validations || []),
              { type: "required", message: "This field is required" },
            ]
          : field.validations,
      })),
      createdAt: new Date().toISOString(),
    };

    try {
      const savedForms: FormSchema[] = JSON.parse(
        localStorage.getItem("form_builder_saved_forms_v1") || "[]"
      );

      const existingIndex = savedForms.findIndex((f) => f.id === formToSave.id);
      if (existingIndex >= 0) {
        savedForms[existingIndex] = formToSave;
      } else {
        savedForms.push(formToSave);
      }

      localStorage.setItem(
        "form_builder_saved_forms_v1",
        JSON.stringify(savedForms)
      );

      setDialogMessage(`Form "${formName}" saved successfully!`);
      setDialogOpen(true);

      // Reset for new form
      setFields([]);
      setFormId(uuidv4());
    } catch (error) {
      console.error("Error saving form:", error);
      setDialogMessage("Failed to save form. Please check console for details.");
      setDialogOpen(true);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" mb={2}>
        Create your form
      </Typography>

      {/* Field selector - Using flexbox instead of Grid */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Field Type</InputLabel>
            <Select
              value={fieldType}
              label="Field Type"
              onChange={(e) => setFieldType(e.target.value as Field["type"])}
            >
              {FIELD_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button variant="contained" onClick={handleAddField}>
            Add Field
          </Button>
          
          <Button
            variant="outlined"
            disabled={fields.length === 0}
            onClick={handleSaveForm}
          >
            Save form
          </Button>
        </Box>
      </Paper>

      {/* Fields list */}
      {fields.map((field, index) => (
        <Accordion key={field.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ flexGrow: 1, fontWeight: 500 }}>
              {field.label}
            </Typography>
            <Typography color="text.secondary">
              {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Label"
                value={field.label}
                onChange={(e) =>
                  handleUpdateField(field.id, "label", e.target.value)
                }
              />
              <TextField
                label="Default value"
                value={field.defaultValue || ""}
                onChange={(e) =>
                  handleUpdateField(field.id, "defaultValue", e.target.value)
                }
              />

              <Box display="flex" gap={2} alignItems="center">
                <Switch
                  checked={field.required || false}
                  onChange={(e) =>
                    handleUpdateField(field.id, "required", e.target.checked)
                  }
                />
                <Typography>Required</Typography>
              </Box>

              <Box display="flex" gap={2}>
                <TextField
                  label="Min length"
                  type="number"
                  value={field.minLength ?? ""}
                  onChange={(e) =>
                    handleUpdateField(
                      field.id,
                      "minLength",
                      Number(e.target.value) || undefined
                    )
                  }
                />
                <TextField
                  label="Max length"
                  type="number"
                  value={field.maxLength ?? ""}
                  onChange={(e) =>
                    handleUpdateField(
                      field.id,
                      "maxLength",
                      Number(e.target.value) || undefined
                    )
                  }
                />
              </Box>

              <Box display="flex" gap={2} alignItems="center">
                <Switch
                  checked={field.emailFormat || false}
                  onChange={(e) =>
                    handleUpdateField(field.id, "emailFormat", e.target.checked)
                  }
                />
                <Typography>Email format</Typography>
              </Box>

              <Box display="flex" gap={2} alignItems="center">
                <Switch
                  checked={field.passwordRule || false}
                  onChange={(e) =>
                    handleUpdateField(
                      field.id,
                      "passwordRule",
                      e.target.checked
                    )
                  }
                />
                <Typography>Password rule (min 8, number)</Typography>
              </Box>

              {/* Derived field */}
              <Box display="flex" gap={2} alignItems="center">
                <Switch
                  checked={Boolean(field.derived)}
                  onChange={(e) =>
                    handleUpdateField(field.id, "derived", e.target.checked ? {} : false)
                  }
                />
                <Typography>Derived field</Typography>
              </Box>

              {field.derived && (
                <>
                  <TextField
                    label="Parent fields"
                    value={field.parentFields ?? ""}
                    onChange={(e) =>
                      handleUpdateField(
                        field.id,
                        "parentFields",
                        e.target.value
                      )
                    }
                  />
                  <TextField
                    label="Formula"
                    placeholder="Example: (2025 - Number(values['birthYear']))"
                    value={field.formula ?? ""}
                    onChange={(e) =>
                      handleUpdateField(field.id, "formula", e.target.value)
                    }
                  />
                </>
              )}

              {/* Action buttons */}
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <IconButton 
                  onClick={() => handleMoveField(index, "up")}
                  disabled={index === 0}
                >
                  <ArrowUpwardIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleMoveField(index, "down")}
                  disabled={index === fields.length - 1}
                >
                  <ArrowDownwardIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteField(field.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Form Status</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreatePage;
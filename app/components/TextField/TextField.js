import React from 'react';
import { TextField as TextFieldMaterial } from '@material-ui/core';

export default function TextField(props) {
  return (
    <TextFieldMaterial
      disabled={props.disabled}
      value={props.value}
      onChange={props.handleChange}
      name={props.name}
      id={props.id}
      label={props.label}
      margin="normal"
      variant="outlined"
      required
    />
  );
}

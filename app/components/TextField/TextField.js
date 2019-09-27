import React from 'react';
import { TextField as TextFieldMaterial } from '@material-ui/core';

export default function TextField(props) {
  return (
    <TextFieldMaterial
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      id="outlined-name"
      label={props.label}
      margin="normal"
      variant="outlined"
      required
    />
  );
}

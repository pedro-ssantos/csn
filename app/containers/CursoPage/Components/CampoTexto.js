import React from 'react';
import { TextField } from '@material-ui/core';
import '../style.scss';

export default function CampoTexto(props) {
  return (
    <TextField
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

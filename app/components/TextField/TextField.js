import React from 'react';
import { TextField as TextFieldMaterial } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1.5),
    minWidth: 320,

  },
}));

export default function TextField(props) {
  const classes = useStyles();

  return (
    <TextFieldMaterial
      className={classes.formControl}
      disabled={props.permission === 'update' ? false : true}
      value={props.value}
      onChange={props.handleChange}
      name={props.name}
      id={props.id}
      label={props.label}
      type={props.type}
      margin="normal"
      variant="outlined"
      required      
    />
  );
}

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
  const {permission, value, handleChange, name, id, label, type, InputProps, ...rest} = props;

  return (
    <TextFieldMaterial
      className={classes.formControl}
      disabled={permission === 'update' ? false : true}
      value={value}
      onChange={handleChange}
      name={name}
      id={id}
      label={label}
      type={type}
      margin="normal"
      variant="outlined"
      InputProps={InputProps}
      required      
      {...rest}
    />
  );
}

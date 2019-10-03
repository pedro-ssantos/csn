import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Select as SelectMaterial } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export default function Select(props) {
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const inputLabel = React.useRef(null);

  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
    }
  }, [props.options]);

  return (
    <FormControl required variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        {props.label}
      </InputLabel>
      <SelectMaterial
        value={props.value}
        onChange={props.handleChange}
        labelWidth={labelWidth}
        inputProps={{
          name: props.name,
          id: 'outlined-age-simple',
        }}
      >
        <MenuItem value="">
          <em>Selecione</em>
        </MenuItem>
        {options.map(option => (
          <MenuItem key={option.key} value={option.key}>
            {option.label}
          </MenuItem>
        ))}
      </SelectMaterial>
    </FormControl>
  );
}

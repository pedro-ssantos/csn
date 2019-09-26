import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import '../style.scss';
import { makeStyles } from '@material-ui/core/styles';

export default function CampoSelect(props) {
  const [labelWidth, setLabelWidth] = React.useState(0);
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
  const menus = props.categorias.map(categoria => (
    <MenuItem key={categoria.toString()} value={categoria.toString()}>{categoria}</MenuItem>
  ));

  return (
    <FormControl required variant="outlined" className={classes.formControl}>
      <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
        {props.label}
      </InputLabel>
      <Select
        value={props.value}
        onChange={props.onChange}
        labelWidth={labelWidth}
        inputProps={{
          name: props.name,
          id: 'outlined-age-simple',
        }}
      >
        <MenuItem value="">
          <em>Selecione</em>
        </MenuItem>
        {menus}
      </Select>
    </FormControl>
  );
}

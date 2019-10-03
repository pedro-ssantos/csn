import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, laboratorios, theme) {
  return {
    fontWeight:
    laboratorios.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChipSelect(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { label } = props;
  const { options } = props;
  const { laboratorios, setLaboratorios } = props;


  const handleChange = event => {
    setLaboratorios(event.target.value);
  };

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={laboratorios}
        onChange={handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {options.map(option => (
          <MenuItem
            key={option.key}
            value={option.value}
            style={getStyles(name, laboratorios, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

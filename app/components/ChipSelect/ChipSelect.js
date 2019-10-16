import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  Chip,
  MenuItem,
  Input,
  Paper,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import apiService from './../../services/apiService';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    // width: '100%'
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
  const { laboratorios } = props;
  const [options, setOptions] = useState([]);
  const {handleChange} = props;

  const selecteds = (selected) => (
    <div className={classes.chips}>
      {selected.map(value => (
        <Chip key={value} label={value} className={classes.chip} />
      ))}
    </div>
  );

  useEffect(() => {
    async function getForm() {
      try {
        const labsInfo = await apiService.request('get', 'laboratorio');
        setOptions(labsInfo.data);
      } catch (error) {
        alert('Formulário desconhecido');
        console.log('error', error);
      }
    }
    getForm();
  }, []);

  return (
    <Paper className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
        <Select
          multiple
          value={laboratorios}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selecteds}
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem
              key={index}
              value={option.nome}
              style={getStyles(option.nome, options, theme)}
            >
              {option.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
}

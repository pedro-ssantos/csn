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
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
  help:{
    paddingLeft: 5,
    paddingBottom: 3,
  },
}));

const HelpTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

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
  const { handleChange } = props;

  const selecteds = selected => (
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
        <HelpTooltip
          title={
            <React.Fragment>
              <Typography align="justify" variant="body2">
                {
                  'Espaços ou núcleos de atividades especializadas, utilizados pelos alunos do curso em aulas e/ou estágios de práticas profissionais. Incluem os laboratórios, clínicas, escritórios modelo, fazendas experimentais e outros.'
                }
              </Typography>
            </React.Fragment>
          }
        >
          <HelpIcon fontSize="small" color="action" className={classes.help} />
        </HelpTooltip>
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

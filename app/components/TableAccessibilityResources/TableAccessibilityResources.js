import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  tableCondensed: {
    paddingTop: 3,
    paddingBottom: 3,
  },
  tableCellOdd: {
    backgroundColor: '#f3f3f3',
  },
  help: {
    paddingLeft: 5,
    paddingBottom: 3,
  },
}));

const resourcesDefault = {
  possui: null,
  braile: null,
  informaticaAcessivel: null,
  materialTatil: null,
  tradutorSinais: null,
  materialSinais: null,
  materialImpressoAcessivel: null,
  materialAudio: null,
  materialCaractereAmpliado: null,
  recursoAcessComunicacao: null,
  guiaInterprete: null,
  insercaoDisciplinaSinais: null,
  materialDigitalAcessivel: null,
};

const HelpTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

export default function TableAccessibilityResources(props) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const { handleChangeRecursosAcessibilidade, tableLabel } = props;
  const [toggle, setToggle] = useState(false);
  const [recursosAcessibilidade, setRecursosAcessibilidade] = useState(
    resourcesDefault,
  );

  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    let obj = JSON.parse(JSON.stringify(recursosAcessibilidade));
    obj[name] = value;
    setRecursosAcessibilidade(obj);
    handleChangeRecursosAcessibilidade(obj);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  }

  useEffect(() => {
    if (props.options) {
      setOptions(props.options);
    }
    if (props.recursosAcessibilidade) {
      setRecursosAcessibilidade(props.recursosAcessibilidade);
    }
  }, [props.options, props.recursosAcessibilidade]);

  return (
    <Paper className={classes.root}>
      <Box component="span" m={2}>
        Curso garante condições de ensino-aprendizagem para pessoas com
        deficiência?
        <HelpTooltip
          title={
            <React.Fragment>
              <Typography align="justify" variant="body2">
                {
                  'Recursos e materiais didáticos adaptados para atender pessoas com deficiência.'
                }
              </Typography>
            </React.Fragment>
          }
        >
          <HelpIcon fontSize="small" color="action" className={classes.help} />
        </HelpTooltip>
        <Radio
          name="possui"
          value="Sim"
          checked={recursosAcessibilidade.possui === 'Sim' ? true : ''}
          onChange={handleChange}
        />
        Sim
        <Radio
          name="possui"
          value="Não"
          checked={recursosAcessibilidade.possui === 'Não' ? true : ''}
          onChange={handleChange}
        />
        Não
        <IconButton aria-label="delete" onClick={handleToggle}>
          {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}          
        </IconButton>
      </Box>

      <Collapse in={recursosAcessibilidade.possui === 'Sim' || toggle}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>{tableLabel}</TableCell>
              <TableCell>Sim</TableCell>
              <TableCell>Não</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.map((option, index) => (
              <TableRow className={index % 2 ? '' : classes.tableCellOdd}>
                <TableCell className={classes.tableCondensed}>
                  {option.label}
                  <HelpTooltip
                    title={
                      <React.Fragment>
                        <Typography align="justify" variant="body2">
                          {option.instrucoes}
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <HelpIcon
                      fontSize="small"
                      color="action"
                      className={classes.help}
                    />
                  </HelpTooltip>
                </TableCell>
                <TableCell className={classes.tableCondensed}>
                  <Radio
                    name={option.name}
                    value="Sim"
                    checked={
                      recursosAcessibilidade[option.name] === 'Sim' ? true : ''
                    }
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell className={classes.tableCondensed}>
                  <Radio
                    name={option.name}
                    value="Não"
                    checked={
                      recursosAcessibilidade[option.name] === 'Não' ? true : ''
                    }
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Collapse>
    </Paper>
  );
}

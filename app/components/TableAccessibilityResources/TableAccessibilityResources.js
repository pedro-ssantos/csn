import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

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
    backgroundColor: '#f3f3f3'
  }
}));

export default function TableAccessibilityResources(props) {
  const classes = useStyles();
  const { 
    options,
    handleChangeRecursosAcessibilidade,
    tableLabel,
  } = props;

  const [recursosAcessibilidade, setRecursosAcessibilidade] = useState({
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
  });

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    let obj = JSON.parse(JSON.stringify(recursosAcessibilidade));
    obj[name] = value;
    console.log(obj)
    setRecursosAcessibilidade(obj);
    handleChangeRecursosAcessibilidade(obj);
  };

  return (
    <Paper className={classes.root}>
      <Box component="span" m={2}>
          Curso garante condições de ensino-aprendizagem para pessoas com deficiência?
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
      </Box>
      
      { recursosAcessibilidade.possui === 'Sim' && (
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
                <TableCell className={classes.tableCondensed}>{option.label}</TableCell>
                <TableCell className={classes.tableCondensed}>
                  <Radio
                    name={option.name}
                    value="Sim"
                    checked={recursosAcessibilidade[option.name] === 'Sim' ? true : ''}
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell className={classes.tableCondensed}>
                  <Radio
                    name={option.name}
                    value="Não"
                    checked={recursosAcessibilidade[option.name] === 'Não' ? true : ''}
                    onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}

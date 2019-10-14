import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Radio } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const AccessibilityResourcesDefault = {
  braile: false,
  informaticaAcessivel: false,
  materialTatil: false,
  tradutorSinais: false,
  materialSinais: false,
  materialImpressoAcessivel: false,
  materialAudio: false,
  materialCaractereAmpliado: false,
  recursoAcessComunicacao: false,
  guiaInterprete: false,
  insercaoDisciplinaSinais: false,
  materialDigitalAcessivel: false,
};

export default function TableAccessibilityResources(props) {
  const classes = useStyles();
  const { tableLabel } = props;
  const {resources, setResources} = props;

  const options = [
    { name: 'braile', label: 'Material em braille' },
    {
      name: 'informaticaAcessivel',
      label: 'Recursos de informática acessível',
    },
    {
      name: 'materialTatil',
      label: 'Material pedagógico tátil'
    },
    {
      name: 'tradutorSinais',
      label: 'Tradutor e intérprete de língua brasileira de sinais'
    },
    {
      name: 'materialSinais',
      label: 'Material didático em língua brasileira de sinais'
    },
    {
      name: 'materialImpressoAcessivel',
      label: 'Material didático em formato impresso acessível'
    },
    {
      name: 'materialAudio',
      label: 'Material em áudio'
    },
    {
      name: 'materialCaractereAmpliado',
      label: 'Material em formato impresso em caractere ampliado'
    },
    {
      name: 'recursoAcessComunicacao',
      label: 'Recursos de acessibilidade à comunicação'
    },
    {
      name: 'guiaInterprete',
      label: 'Guia intérprete'
    },
    {
      name: 'insercaoDisciplinaSinais',
      label: 'Inserção da disciplina de língua brasileira de sinais no curso'
    },
    {
      name: 'materialDigitalAcessivel',
      label: 'Material didático digital acessível'
    },
  ];

  const handleChange = e => {
    const value = e.target.value === 'sim' ? true : false;
    setResources({ ...resources, [e.target.name]: value });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>{tableLabel}</TableCell>
            <TableCell>Sim</TableCell>
            <TableCell>Não</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {options.map(option => (
            <TableRow>
              <TableCell>{option.label}</TableCell>
              <TableCell>
                <Radio
                  name={option.name}
                  value="sim"
                  checked={resources[option.name] === null ? '' : resources[option.name]}
                  onChange={handleChange}
                />
              </TableCell>
              <TableCell>
                <Radio
                  name={option.name}
                  value="nao"
                  checked={resources[option.name] === null ? '' : !resources[option.name]}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

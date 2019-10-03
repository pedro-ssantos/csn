import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Radio, RadioGroup } from '@material-ui/core';

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

const recursosAcessabilidade = {
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

export default function TableYesNo(props) {
  const classes = useStyles();
  const { tableLabel } = props;
  const [resources, setResources] = useState(recursosAcessabilidade);

  const handleChange = e => {
    setResources({
      ...resources,
      [e.target.name]: e.target.checked,
    });
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
          <TableRow>
            <TableCell>Material em braille</TableCell>
            <TableCell>
              <Radio checked={resources.braile} value="sim" />
            </TableCell>
            <TableCell>
              <Radio value="nao" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

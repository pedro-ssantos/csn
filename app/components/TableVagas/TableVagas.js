import React, { useEffect, useState } from 'react';
import { Table as TableMaterial } from '@material-ui/core';
import TextField from '../TextField';
import {
  Checkbox,
  FormControlLabel,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1150,
  },
}));

export default function TableVagas(props) {
  const classes = useStyles();

  const [vagas, setVagas] = useState([
    {
      turno: 'matutino',
      status: true,
      vagasNovas: 0,
      vagasRemanecentes: 0,
      vagasProgramasEspeciais: 0,
      inscritosVagasNovas: 0,
      inscritosVagasRemanecentes: 0,
      inscritosVagasProgramasEspeciais: 0,
    },
    {
      turno: 'vespertino',
      status: false,
      vagasNovas: 0,
      vagasRemanecentes: 0,
      vagasProgramasEspeciais: 0,
      inscritosVagasNovas: 0,
      inscritosVagasRemanecentes: 0,
      inscritosVagasProgramasEspeciais: 0,
    },
    {
      turno: 'noturno',
      status: false,
      vagasNovas: 0,
      vagasRemanecentes: 0,
      vagasProgramasEspeciais: 0,
      inscritosVagasNovas: 0,
      inscritosVagasRemanecentes: 0,
      inscritosVagasProgramasEspeciais: 0,
    },
    {
      turno: 'integral',
      status: false,
      vagasNovas: 0,
      vagasRemanecentes: 0,
      vagasProgramasEspeciais: 0,
      inscritosVagasNovas: 0,
      inscritosVagasRemanecentes: 0,
      inscritosVagasProgramasEspeciais: 0,
    },
  ]);

  const updateField = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      console.log(e.target.name)

    setVagas({
      ...vagas,
      [e.target.name]: value,
    });
  };

  return (
    <Paper className={classes.root}>
      <TableMaterial className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Turno</TableCell>
            <TableCell>Vagas novas oferecidas </TableCell>
            <TableCell>Vagas remanescentes oferecidas</TableCell>
            <TableCell>Vagas oferecidas de programas especiais</TableCell>
            <TableCell>Inscritos Vagas novas oferecidas</TableCell>
            <TableCell>Inscritos Vagas remanescentes oferecidas</TableCell>
            <TableCell>
              Inscritos Vagas oferecidas de programas especiais
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vagas.map(option => (
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.status}
                      name={option.turno}
                      value={option.value}
                      onChange={updateField}
                    />
                  }
                  label={option.name}
                  style={{ width: 120 }}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  name="a"
                  id="outlined-number"
                  //value={shift.a}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  onChange={updateField}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  name="b"
                  id="outlined-number"
                  //value={shift.b}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  onChange={updateField}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  id="outlined-number"
                  value="1000000"
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  id="outlined-number"
                  value="1000"
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  id="outlined-number"
                  value="1000"
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  //disabled={!shift.matutino}
                  id="outlined-number"
                  value="1000"
                  type="number"
                  margin="normal"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMaterial>
    </Paper>
  );
}

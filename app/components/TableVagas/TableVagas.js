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
  let [vagas, setVagas] = useState([
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
    let turno = {...vagas.find(option => option.turno === e.target.name)};
    turno[e.target.id] = value;
    turno[e.target.vagasNovas] = 10;
    console.log(turno);
    setVagas({...vagas, turno});
    console.log(...vagas);
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
              <TableCell key={option.turno}>
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
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'vagasNovas'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="vagasNovas"
                  value={option.vagasNovas}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'vagasRemanecentes'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="vagasRemanecentes"
                  value={option.vagasRemanecentes}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'vagasProgramasEspeciais'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="vagasProgramasEspeciais"
                  value={option.vagasProgramasEspeciais}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'inscritosVagasNovas'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="inscritosVagasNovas"
                  value={option.inscritosVagasNovas}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'inscritosVagasRemanecentes'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="inscritosVagasRemanecentes"
                  value={option.inscritosVagasRemanecentes}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
              <TableCell
                align="right"
                size="small"
                key={option.turno + 'inscritosVagasProgramasEspeciais'}
              >
                <TextField
                  disabled={!option.status}
                  name={option.turno}
                  id="inscritosVagasProgramasEspeciais"
                  value={option.inscritosVagasProgramasEspeciais}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  handleChange={updateField}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMaterial>
    </Paper>
  );
}

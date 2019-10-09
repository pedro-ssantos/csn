import React, { useEffect, useState } from 'react';
import { Table as TableMaterial } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
  const {
    vagas,
    handleChangeMatutino,
    handleChangeVespertino,
    handleChangeNoturno,
    handleChangeIntegral,
   } = props;

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
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vagas.matutino.status}
                    name="status"
                    value={vagas.matutino.value}
                    onChange={handleChangeMatutino}
                  />
                }
                label="Matutino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasNovas"
                value={vagas.matutino.vagasNovas}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasRemanecentes"
                value={vagas.matutino.vagasRemanecentes}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasProgramasEspeciais"
                value={vagas.matutino.vagasProgramasEspeciais}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasNovas"
                value={vagas.matutino.inscritosVagasNovas}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasRemanecentes"
                value={vagas.matutino.inscritosVagasRemanecentes}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.matutino.inscritosVagasProgramasEspeciais}
                onChange={handleChangeMatutino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vagas.vespertino.status}
                    name="status"
                    value={vagas.vespertino.value}
                    onChange={handleChangeVespertino}
                  />
                }
                label="Vespertino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasNovas"
                value={vagas.vespertino.vagasNovas}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasRemanecentes"
                value={vagas.vespertino.vagasRemanecentes}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasProgramasEspeciais"
                value={vagas.vespertino.vagasProgramasEspeciais}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasNovas"
                value={vagas.vespertino.inscritosVagasNovas}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasRemanecentes"
                value={vagas.vespertino.inscritosVagasRemanecentes}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.vespertino.inscritosVagasProgramasEspeciais}
                onChange={handleChangeVespertino}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vagas.noturno.status}
                    name="status"
                    value={vagas.noturno.value}
                    onChange={handleChangeNoturno}
                  />
                }
                label="Noturno"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasNovas"
                value={vagas.noturno.vagasNovas}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasRemanecentes"
                value={vagas.noturno.vagasRemanecentes}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasProgramasEspeciais"
                value={vagas.noturno.vagasProgramasEspeciais}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasNovas"
                value={vagas.noturno.inscritosVagasNovas}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasRemanecentes"
                value={vagas.noturno.inscritosVagasRemanecentes}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.noturno.inscritosVagasProgramasEspeciais}
                onChange={handleChangeNoturno}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={vagas.integral.status}
                    name="status"
                    value={vagas.integral.value}
                    onChange={handleChangeIntegral}
                  />
                }
                label="Integral"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasNovas"
                value={vagas.integral.vagasNovas}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasRemanecentes"
                value={vagas.integral.vagasRemanecentes}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasProgramasEspeciais"
                value={vagas.integral.vagasProgramasEspeciais}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasNovas"
                value={vagas.integral.inscritosVagasNovas}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasRemanecentes"
                value={vagas.integral.inscritosVagasRemanecentes}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.integral.inscritosVagasProgramasEspeciais}
                onChange={handleChangeIntegral}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </TableMaterial>
    </Paper>
  );
}

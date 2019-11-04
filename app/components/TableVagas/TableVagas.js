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
  paper: {
    padding: theme.spacing(3, 2),
  },
}));

const vagasDefault = {
  matutino: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: ''
  },
  vespertino: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: ''
  },
  noturno: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: ''
  },
  integral: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: ''
  }
};

export default function TableVagas(props) {
  const classes = useStyles();

  const [vagas, setVagas] = useState(vagasDefault);
  const { handleChangeVagas, canSee } = props;

  useEffect(() => {
    if (props.vagas) {
      setVagas(props.vagas);
    }

  }, [props.vagas]);

  const handleChange = (e, turno) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    const name = e.target.name;
    let obj = JSON.parse(JSON.stringify(vagas));
    obj[turno][name] = value;

    if(e.target.type === 'checkbox' && value === false){
      obj[turno] = vagasDefault[turno];
    }
    setVagas(obj);
    handleChangeVagas(obj);
  };

  return (   
    <Paper className={classes.root}>
       { vagas && vagas.matutino && (
      <TableMaterial className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Turno</TableCell>
            <TableCell>Prazo mínimo integralização</TableCell>
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
                    value={vagas.matutino.status}
                    onChange={(e) => {handleChange(e, 'matutino')}}
                  />
                }
                label="Matutino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="prazoMinimoIntregralizacao"
                value={vagas.matutino.prazoMinimoIntregralizacao}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasNovas"
                value={vagas.matutino.vagasNovas}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasRemanecentes"
                value={vagas.matutino.vagasRemanecentes}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="vagasProgramasEspeciais"
                value={vagas.matutino.vagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasNovas"
                value={vagas.matutino.inscritosVagasNovas}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasRemanecentes"
                value={vagas.matutino.inscritosVagasRemanecentes}
                onChange={(e) => {handleChange(e, 'matutino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.matutino.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.matutino.inscritosVagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'matutino')}}
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
                    onChange={(e) => {handleChange(e, 'vespertino')}}
                  />
                }
                label="Vespertino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="prazoMinimoIntregralizacao"
                value={vagas.vespertino.prazoMinimoIntregralizacao}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasNovas"
                value={vagas.vespertino.vagasNovas}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasRemanecentes"
                value={vagas.vespertino.vagasRemanecentes}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="vagasProgramasEspeciais"
                value={vagas.vespertino.vagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasNovas"
                value={vagas.vespertino.inscritosVagasNovas}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasRemanecentes"
                value={vagas.vespertino.inscritosVagasRemanecentes}
                onChange={(e) => {handleChange(e, 'vespertino')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.vespertino.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.vespertino.inscritosVagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'vespertino')}}
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
                    onChange={(e) => {handleChange(e, 'noturno')}}
                  />
                }
                label="Noturno"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="prazoMinimoIntregralizacao"
                value={vagas.noturno.prazoMinimoIntregralizacao}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasNovas"
                value={vagas.noturno.vagasNovas}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasRemanecentes"
                value={vagas.noturno.vagasRemanecentes}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="vagasProgramasEspeciais"
                value={vagas.noturno.vagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasNovas"
                value={vagas.noturno.inscritosVagasNovas}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasRemanecentes"
                value={vagas.noturno.inscritosVagasRemanecentes}
                onChange={(e) => {handleChange(e, 'noturno')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.noturno.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.noturno.inscritosVagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'noturno')}}
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
                    onChange={(e) => {handleChange(e, 'integral')}}
                  />
                }
                label="Integral"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="prazoMinimoIntregralizacao"
                value={vagas.integral.prazoMinimoIntregralizacao}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasNovas"
                value={vagas.integral.vagasNovas}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasRemanecentes"
                value={vagas.integral.vagasRemanecentes}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="vagasProgramasEspeciais"
                value={vagas.integral.vagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasNovas"
                value={vagas.integral.inscritosVagasNovas}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasRemanecentes"
                value={vagas.integral.inscritosVagasRemanecentes}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!vagas.integral.status}
                name="inscritosVagasProgramasEspeciais"
                value={vagas.integral.inscritosVagasProgramasEspeciais}
                onChange={(e) => {handleChange(e, 'integral')}}
                margin="normal"
                variant="outlined"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </TableMaterial>
       )}
    </Paper>
  );
}

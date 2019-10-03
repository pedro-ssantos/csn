import React, { useEffect, useState } from 'react';
import { Table as TableMaterial } from '@material-ui/core';
import TextField from './../TextField';
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

export default function Table(props) {
  const classes = useStyles();
  const [shift, setShift] = useState({
    matutino: false,
    vespertino: false,
    noturno: false,
    integral: false,

    a: '5000',
    b: '4000',
    c: '3000',
    d: '2000',
    e: '1000',
  });

  useEffect(() => {
    if (shift.checkedA) {
      console.log('FAZFUNFAR');
    }
  });

  const updateField = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setShift({
      ...shift,
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
          <TableRow>
            <TableCell>
              <FormControlLabel
                control={
                  <Checkbox
                    name="matutino"
                    value="SomeValue"
                    onChange={updateField}
                  />
                }
                label="Matutino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                name="a"
                id="outlined-number"
                value={shift.a}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                name="b"
                id="outlined-number"
                value={shift.b}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                id="outlined-number"
                value="1000000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.matutino}
                id="outlined-number"
                value="1000"
                type="number"
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
                    name="vespertino"
                    value="SomeValue"
                    onChange={updateField}
                  />
                }
                label="Vespertino"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                name="a"
                id="outlined-number"
                value={shift.a}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                name="b"
                id="outlined-number"
                value={shift.b}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                id="outlined-number"
                value="1000000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.vespertino}
                id="outlined-number"
                value="1000"
                type="number"
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
                    name="noturno"
                    value="SomeValue"
                    onChange={updateField}
                  />
                }
                label="Noturno"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                name="a"
                id="outlined-number"
                value={shift.a}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                name="b"
                id="outlined-number"
                value={shift.b}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                id="outlined-number"
                value="1000000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.noturno}
                id="outlined-number"
                value="1000"
                type="number"
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
                    name="integral"
                    value="SomeValue"
                    onChange={updateField}
                  />
                }
                label="Integral"
                style={{ width: 120 }}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                name="a"
                id="outlined-number"
                value={shift.a}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                name="b"
                id="outlined-number"
                value={shift.b}
                type="number"
                margin="normal"
                variant="outlined"
                onChange={updateField}
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                id="outlined-number"
                value="1000000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                id="outlined-number"
                value="1000"
                type="number"
                margin="normal"
                variant="outlined"
              />
            </TableCell>
            <TableCell align="right" size="small">
              <TextField
                disabled={!shift.integral}
                id="outlined-number"
                value="1000"
                type="number"
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
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import './style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const formDefault = {
  codigoMec: '',
  nome: '',
  nivelAcademico: '',
}

export default function CursoPage () {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [form, setFormValues] = useState(formDefault);

  const updateField = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value
    })
  }

  const handleChange = name => event => {
    setFormValues({ ...form, [name]: event.target.value });
  };

  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <div className="page">
      <Helmet>
        <title>Curso</title>

        <meta
          name="description"
          content="Curso page of React.js Boilerplate application"
        />
      </Helmet>
      <h1>Curso</h1>

      <form className={classes.root} autoComplete="off">

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            value={form.codigoMec}
            onChange={handleChange('codigoMec')}
            id="outlined-name"
            label="Código e-MEC"
            margin="normal"
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            value={form.nome}
            onChange={handleChange('nome')}
            id="outlined-name"
            label="Nome do curso"
            margin="normal"
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl required variant="outlined" className={classes.formControl}>
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Nível Acadêmico
          </InputLabel>
          <Select
            value={form.nivelAcademico}
            onChange={handleChange('nivelAcademico')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>

      </form>

    </div>
  );
}

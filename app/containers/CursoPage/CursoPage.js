import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import './style.scss';

class CampoTexto extends React.Component {
  render() {
    return (
      <TextField
        value={this.props.codigoMec}
        label={this.props.label}
        margin="normal"
        variant="outlined"
        required
      />
    );
  }
}

class CampoSelect extends React.Component {
  render() {
    return (
      //TODO:  className faz falta?
      <FormControl required variant="outlined">
        <InputLabel>
          Nível Acadêmico
        </InputLabel>
        <Select
          value={this.props.nivelAcademico}
          //onChange={handleChange('nivelAcademico')}
          //labelWidth={labelWidth}
        >
          <MenuItem value="graduacao">Graduação</MenuItem>
          <MenuItem value="formespec">Sequencia de formação específica</MenuItem>
        </Select>
      </FormControl>
    );
  }
}

export default class CursoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoMec: '',
      nome: '',
      nivelAcademico: '',
      grauAcademico: '',
      atributoDeIngresso: '',
      modalidadeDeEnsino: '',
      CursoAlunoVinc: '',
      situacaoFuncionamto: '',
      tipoDeOferta: '',
      CursoAlunoVinc2019: '',
      turno: '',
      prazoMin: '',
      vagasNovas: '',
      vagasRemanescentes: '',
      vagasOferecidasProgEspec: '',
      inscVagasNovas: '',
      inscVagasRemanescententes: '',
      inscVagasOferecidasProgEspec: '',
      turnoExtra: '',
    };
  }

  updateField(e) {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value,
    });
  }

  handleChange(name) {
    event => {
      setFormValues({ ...form, [name]: event.target.value });
    };
  }

  render() {
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

        <form autoComplete="off">
          <div>
            <CampoTexto value={this.state.codigoMec} label="Código e-MEC" />
          </div>
          
          <div>
           <CampoSelect/>
          </div>

          {/*           <TextField
            value={form.codigoMec}
            onChange={handleChange('codigoMec')}
            id="outlined-name"
            label="Código e-MEC"
            margin="normal"
            variant="outlined"
            required
          />

          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
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
              <MenuItem value={10}>Graduação</MenuItem>
              <MenuItem value={20}>Sequencia de formação específica</MenuItem>
            </Select>
          </FormControl> */}
        </form>
      </div>
    );
  }
}

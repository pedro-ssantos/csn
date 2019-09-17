import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
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

export default function CursoPage() {
  const classes = useStyles();
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  const [form, setFormValues] = useState(formDefault);

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
        <TextField
          value={form.codigoMec}
          onChange={handleChange('codigoMec')}
          id="outlined-name"
          label="Código e-MEC"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.nome}
          onChange={handleChange('nome')}
          id="outlined-name"
          label="Nome do curso"
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
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Grau Acadêmico
          </InputLabel>
          <Select
            value={form.grauAcademico}
            onChange={handleChange('grauAcademico')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Bacharelado</MenuItem>
            <MenuItem value={20}>Licenciatura</MenuItem>
            <MenuItem value={20}>Tecnológico</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Atributo de ingresso
          </InputLabel>
          <Select
            value={form.atributoDeIngresso}
            onChange={handleChange('atributoDeIngresso')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Normal</MenuItem>
            <MenuItem value={20}>Área Básica</MenuItem>
            <MenuItem value={20}>Bacharelado Interdisciplinar</MenuItem>
            <MenuItem value={20}>Licenciatura Interdisciplinar</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Modalidade de ensino
          </InputLabel>
          <Select
            value={form.modalidadeDeEnsino}
            onChange={handleChange('modalidadeDeEnsino')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Presencial</MenuItem>
            <MenuItem value={20}>Curso a distância</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Curso com Aluno vinculado
          </InputLabel>
          <Select
            value={form.CursoAlunoVinc}
            onChange={handleChange('CursoAlunoVinc')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sim</MenuItem>
            <MenuItem value={20}>Não</MenuItem>
            <MenuItem value={20}>Não Atualizado</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Situação de Funcionamento
          </InputLabel>
          <Select
            value={form.situacaoFuncionamto}
            onChange={handleChange('situacaoFuncionamto')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Extinto</MenuItem>
            <MenuItem value={20}>Em atividade</MenuItem>
            <MenuItem value={20}>Em extinção</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Tipo de oferta
          </InputLabel>
          <Select
            value={form.tipoDeOferta}
            onChange={handleChange('tipoDeOferta')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Regular</MenuItem>
            <MenuItem value={20}>Especial</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Curso teve aluno vinculado em 2019?
          </InputLabel>
          <Select
            value={form.CursoAlunoVinc2019}
            onChange={handleChange('CursoAlunoVinc2019')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Sim</MenuItem>
            <MenuItem value={20}>Não</MenuItem>
          </Select>
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={classes.formControl}
        >
          <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
            Turno
          </InputLabel>
          <Select
            value={form.turno}
            onChange={handleChange('turno')}
            labelWidth={labelWidth}
            inputProps={{
              name: 'age',
              id: 'outlined-age-simple',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Matutino</MenuItem>
            <MenuItem value={20}>Vespertino</MenuItem>
            <MenuItem value={20}>Noturno</MenuItem>
            <MenuItem value={20}>Integral</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={form.prazoMin}
          onChange={handleChange('prazoMin')}
          id="outlined-name"
          label="Prazo mínimo para integralização em anos letivos"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.vagasNovas}
          onChange={handleChange('vagasNovas')}
          id="outlined-name"
          label="Vagas novas oferecidas"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.vagasNvagasRemanescentesovas}
          onChange={handleChange('vagasRemanescentes')}
          id="outlined-name"
          label="Vagas remanescentes oferecidas"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.vagasOferecidasProgEspec}
          onChange={handleChange('vagasOferecidasProgEspec')}
          id="outlined-name"
          label="Vagas oferecidas de programas especiais"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.inscVagasNovas}
          onChange={handleChange('inscVagasNovas')}
          id="outlined-name"
          label="Inscritos Vagas novas oferecidas "
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.inscVagasRemanescententes}
          onChange={handleChange('inscVagasRemanescententes')}
          id="outlined-name"
          label="Inscritos Vagas remanescentes oferecidas"
          margin="normal"
          variant="outlined"
          required
        />

        <TextField
          value={form.inscVagasOferecidasProgEspec}
          onChange={handleChange('inscVagasOferecidasProgEspec')}
          id="outlined-name"
          label="Inscritos Vagas oferecidas de programas especiais"
          margin="normal"
          variant="outlined"
          required
        />

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Possui mais algum turno?</FormLabel>
          <RadioGroup
            aria-label="turnoExtra"
            name="turnoExtra"
            value={form.turnoExtra}
            onChange={handleChange('turnoExtra')}
          >
            <FormControlLabel value="Sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      </form>
    </div>
  );
}

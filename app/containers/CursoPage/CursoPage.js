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
import { makeStyles } from '@material-ui/core/styles';
import CampoSelect from './Components/CampoSelect';
import CampoTexto from './Components/CampoTexto';


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
  const [form, setFormValues] = useState(formDefault);

  const updateField = (e) => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value,
    });
  };

  const handleChange = name => {
    event => {
      setFormValues({ ...form, [name]: event.target.value });
    };
  };

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
          <CampoTexto
            value={form.nome}
            handleChange={handleChange('nome')}
            label="nome do curso"
          />
        </div>
        <div>
          <CampoSelect
            value={form.codigoMec}
            onChange={handleChange('codigoMec')}
            label="Código e-MEC"
            categorias={['Graduação', 'Sequencia de formação específica']}
          />
        </div>
      </form>
    </div>
  );
}

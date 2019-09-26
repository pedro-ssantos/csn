import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import CampoSelect from './Components/CampoSelect';
import CampoTexto from './Components/CampoTexto';
import {TextField} from '@material-ui/core';
import apiService from './../../services/apiService';

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

  const updateField = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value
    })
  }

  useEffect(() => {
    async function getForm() {
      try {
        const formPermissionId = window.location.pathname.split('/')[2];
        const resFormPermission = await apiService.request('get', 'formPermission/'+formPermissionId);
        const resForm = await apiService.request('get', 'form/'+resFormPermission.data.formId);
        const formDb = resForm.data;
        let formDefaultNew = JSON.parse(JSON.stringify(formDefault));
        formDefaultNew.nome = formDb.nome;
        setFormValues(formDefaultNew)
      } catch (error) {
        alert('Formulário desconhecido')
      }
    }
    getForm();
  }, [])

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
            name="nome"
            value={form.nome}
            onChange={updateField}
            label="Nome do curso"
          />
        </div>
        <div>
          <CampoSelect
            name="codigoMec"
            value={form.codigoMec}
            onChange={updateField}
            label="Código e-MEC"
            categorias={['Graduação', 'Sequencia de formação específica']}
          />
        </div>
      </form>
    </div>
  );
}

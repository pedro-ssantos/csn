import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Select from './../../components/Select';
import TextField from './../../components/TextField';
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
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    async function getForm() {
      try {
        const formPermissionId = window.location.pathname.split('/')[2];
        const resFormPermission = await apiService.request(
          'get',
          'formPermission/' + formPermissionId,
        );
        const resForm = await apiService.request(
          'get',
          'form/' + resFormPermission.data.formId,
        );
        const formDb = resForm.data;
        let formDefaultNew = JSON.parse(JSON.stringify(formDefault));
        formDefaultNew.nome = formDb.nome;
        setFormValues(formDefaultNew);
      } catch (error) {
        alert('Formulário desconhecido');
      }
    }
    getForm();
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

      <form autoComplete="off">
        <div>
          <TextField
            name="nome"
            value={form.nome}
            onChange={updateField}
            label="Nome do curso"
          />
        </div>
        <div>
          <TextField
            name="codigoMec"
            value={form.codigoMec}
            onChange={updateField}
            label="Código do curso e-MEC"
          />
        </div>
        <div>
          <Select
            name="nivelAcademico"
            value={form.nivelAcademico}
            onChange={updateField}
            label="Nível acadêmico"
            options={[
              {key: 'Graduação', label:'Graduação'},
              {key: 'Sequencia de formação específica', label:'Sequencia de formação específica'}
            ]}
          />
        </div>
        <div>
          <Select
            name="grauAcademico"
            value={form.grauAcademico}
            onChange={updateField}
            label="Grau acadêmico"
            options={[
              {key: 'Bacharelado', label:'Bacharelado'},
              {key: 'Licenciatura', label:'Licenciatura'},
              {key: 'Tecnológo', label:'Tecnológo'},
            ]}
          />
        </div>
        <div>
          <Select
            name="atributoDeIngresso"
            value={form.atributoDeIngresso}
            onChange={updateField}
            label="Atributo de ingresso"
            options={[
              {key: 'Normal', label:'Normal'},
              {key: 'Área Básica', label:'Área Básica'},
              {key: 'Bacharelado Interdisciplinar', label:'Bacharelado Interdisciplinar'},
              {key: 'Licenciatura Interdisciplinar', label:'Licenciatura Interdisciplinar'},
            ]}
          />
        </div>
        <div>
          <Select
            name="modalidadeDeEnsino"
            value={form.modalidadeDeEnsino}
            onChange={updateField}
            label="Modalidade de ensino"
            options={[
              {key: 'Presencial', label:'Presencial'},
              {key: 'Curso a distância', label:'Curso a distância'},
            ]}
          />
        </div>
        <div>
          <Select
            name="CursoAlunoVinc"
            value={form.CursoAlunoVinc}
            onChange={updateField}
            label="Curso com Aluno vinculado"
            options={[
              {key: 'Sim', label:'Sim'},
              {key: 'Não', label:'Não'},
              {key: 'Não Atualizado', label:'Não Atualizado'},
            ]}
          />
        </div>
        <div>
          <Select
            name="situacaoFuncionamto"
            value={form.situacaoFuncionamto}
            onChange={updateField}
            label="Situação de Funcionamento"
            options={[
              {key: 'Extinto', label:'Extinto'},
              {key: 'Em atividade', label:'Em atividade'},
              {key: 'Em extinção', label:'Em extinção'},
            ]}
          />
        </div>
        <div>
          <Select
            name="tipoDeOferta"
            value={form.tipoDeOferta}
            onChange={updateField}
            label="Tipo de oferta"
            options={[
              {key: 'Regular', label:'Regular'},
              {key: 'Especial', label:'Especial'},
            ]}
          />
        </div>
        <div>
          <Select
            name="CursoAlunoVinc2019"
            value={form.CursoAlunoVinc2019}
            onChange={updateField}
            label="Curso teve aluno vinculado em 2019?"
            options={[
              {key: 'Sim', label:'Sim'},
              {key: 'Não', label:'Não'},
            ]}
          />
        </div>
      </form>
    </div>
  );
}

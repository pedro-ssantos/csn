import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import CampoSelect from './Components/CampoSelect';
import CampoTexto from './Components/CampoTexto';
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
          <CampoTexto
            name="nome"
            value={form.nome}
            onChange={updateField}
            label="Nome do curso"
          />
        </div>
        <div>
          <CampoTexto
            name="codigoMec"
            value={form.codigoMec}
            onChange={updateField}
            label="Código do curso e-MEC"
          />
        </div>
        <div>
          <CampoSelect
            name="nivelAcademico"
            value={form.nivelAcademico}
            onChange={updateField}
            label="Nível acadêmico"
            categorias={['Graduação', 'Sequencia de formação específica']}
          />
        </div>
        <div>
          <CampoSelect
            name="grauAcademico"
            value={form.grauAcademico}
            onChange={updateField}
            label="Grau acadêmico"
            categorias={['Bacharelado', 'Licenciatura', 'Tecnológo']}
          />
        </div>
        <div>
          <CampoSelect
            name="atributoDeIngresso"
            value={form.atributoDeIngresso}
            onChange={updateField}
            label="Atributo de ingresso"
            categorias={[
              'Normal',
              'Área Básica',
              'Bacharelado Interdisciplinar',
              'Licenciatura Interdisciplinar',
            ]}
          />
        </div>
        <div>
          <CampoSelect
            name="modalidadeDeEnsino"
            value={form.modalidadeDeEnsino}
            onChange={updateField}
            label="Modalidade de ensino"
            categorias={['Presencial', 'Curso a distância']}
          />
        </div>
        <div>
          <CampoSelect
            name="CursoAlunoVinc"
            value={form.CursoAlunoVinc}
            onChange={updateField}
            label="Curso com Aluno vinculado"
            categorias={['Sim', ' Não', 'Não Atualizado']}
          />
        </div>
        <div>
          <CampoSelect
            name="situacaoFuncionamto"
            value={form.situacaoFuncionamto}
            onChange={updateField}
            label="Situação de Funcionamento"
            categorias={['Extinto', 'Em atividade', 'Em extinção']}
          />
        </div>
        <div>
          <CampoSelect
            name="tipoDeOferta"
            value={form.tipoDeOferta}
            onChange={updateField}
            label="Tipo de oferta"
            categorias={['Regular', 'Especial']}
          />
        </div>
        <div>
          <CampoSelect
            name="CursoAlunoVinc2019"
            value={form.CursoAlunoVinc2019}
            onChange={updateField}
            label="Curso teve aluno vinculado em 2019?"
            categorias={['Sim', 'Não']}
          />
        </div>


      </form>
    </div>
  );
}

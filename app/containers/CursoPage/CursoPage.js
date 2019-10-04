import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import Button from '@material-ui/core/Button';
import TableVagas from './../../components/TableVagas';
import ChipSelect from './../../components/ChipSelect';
import TableAccessibilityResources from './../../components/TableAccessibilityResources';
import apiService from './../../services/apiService';
import FormCursoDetails from './FormCursoDetails';

const formDefault = {
  codigoeMec: '',
  nome: '',
  nivelAcademico: '',
  grauAcademico: '',
  atributoIngresso: '',
  modalidadeEnsino: '',
  alunoVinculado: '',
  situacaoFuncionamento: '',
  tipoOferta: '',
  teveAlunoVinculado: '',
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

const accessibilityResourcesDefault = {
  braile: false,
  informaticaAcessivel: false,
  materialTatil: false,
  tradutorSinais: false,
  materialSinais: false,
  materialImpressoAcessivel: false,
  materialAudio: false,
  materialCaractereAmpliado: false,
  recursoAcessComunicacao: false,
  guiaInterprete: false,
  insercaoDisciplinaSinais: false,
  materialDigitalAcessivel: false,
};

export default function CursoPage() {
  const [form, setFormValues] = useState(formDefault);
  const [accessibilityResources, setAccessibilityResources] = useState(accessibilityResourcesDefault);
  const [laboratorios, setLaboratorios] = React.useState([]);

  const [step, setStep] = useState(1);

  const updateField = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value,
    });
  };

  const save = async () => {
    console.log('form', form)
    try {
      const formConfigId = window.location.pathname.split('/')[2];
      const res = await apiService.request(
        'put',
        'form/'+formConfigId,
        {
          data: form
        }
      );
    } catch (error) {
      alert('Erro ao salvar formulário');
    }
  }

  const nextStep = () => {
    const step = this.step;
    setStep({ step: step + 1 });
  };

  const prevStep = () => {
    const step = this.step;
    setStep({ step: step - 1 });
  };

  useEffect(() => {
    async function getForm() {
      try {
        const formConfigId = window.location.pathname.split('/')[2];
        const resFormConfig = await apiService.request(
          'get',
          'formConfig/' + formConfigId,
        );
        const resForm = await apiService.request(
          'get',
          'form/' + resFormConfig.data.formId,
        );
        const formDb = resForm.data;
        let formDefaultNew = JSON.parse(JSON.stringify(formDefault));
        formDefaultNew.nome = formDb.nome;
        formDefaultNew.codigoeMec = formDb.codigoeMec;
        formDefaultNew.nivelAcademico = formDb.nivelAcademico;
        formDefaultNew.grauAcademico = formDb.grauAcademico;
        formDefaultNew.atributoIngresso = formDb.atributoIngresso;
        formDefaultNew.modalidadeEnsino = formDb.modalidadeEnsino;
        formDefaultNew.situacaoFuncionamento = formDb.situacaoFuncionamento;
        formDefaultNew.alunoVinculado = formDb.alunoVinculado;
        formDefaultNew.tipoOferta = formDb.tipoOferta;
        formDefaultNew.tipoOfertaQual = formDb.tipoOfertaQual;
        formDefaultNew.teveAlunoVinculado = formDb.teveAlunoVinculado;
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

        <Button variant="contained" color="primary" onClick={save}>
          Salvar
        </Button>

        <FormCursoDetails
          form={form}
          handleChange={updateField}
          nextStep={nextStep}
        />

        <div>
          <TableVagas form={form} handleChange={updateField} />
        </div>

        <div>
          <ChipSelect
            laboratorios={laboratorios}
            setLaboratorios={setLaboratorios}
            label="Laboratórios"
            options={[
              {
                key: 'labhard',
                value: 'labhard',
                label: 'Laboratório de Hardware',
              },
              {
                key: 'fislab',
                value: 'fislab',
                label: 'Laboratório de Física',
              },
            ]}
          />
        </div>
        <div>
          <TableAccessibilityResources 
          tableLabel="Recursos de tecnologia assistiva disponíveis às pessoas com deficiência "
          resources={accessibilityResources}
          setResources={setAccessibilityResources}
          />
        </div>
      </form>
    </div>
  );
}

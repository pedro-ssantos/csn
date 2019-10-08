import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { Button, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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

const vagasFormDefault = {
  matutino: {
    status: true,
    vagasNovas: '1',
    vagasRemanecentes: '2',
    vagasProgramasEspeciais: '3',
    inscritosVagasNovas: '4',
    inscritosVagasRemanecentes: '5',
    inscritosVagasProgramasEspeciais: '6',
  },
  vespertino: {
    status: false,
    vagasNovas: '22',
    vagasRemanecentes: '23',
    vagasProgramasEspeciais: '24',
    inscritosVagasNovas: '25',
    inscritosVagasRemanecentes: '26',
    inscritosVagasProgramasEspeciais: '27',
  },
  noturno: {
    status: false,
    vagasNovas: 0,
    vagasRemanecentes: 0,
    vagasProgramasEspeciais: 0,
    inscritosVagasNovas: 0,
    inscritosVagasRemanecentes: 0,
    inscritosVagasProgramasEspeciais: 0,
  },
  integral: {
    status: false,
    vagasNovas: 0,
    vagasRemanecentes: 0,
    vagasProgramasEspeciais: 0,
    inscritosVagasNovas: 0,
    inscritosVagasRemanecentes: 0,
    inscritosVagasProgramasEspeciais: 0,
  },
};

const useStyles = makeStyles({
  buttonsSteps: {
    padding: '10px 0 10px',
  },
  buttonStep: {
    marginRight: '10px',
  },
});

export default function CursoPage() {
  const classes = useStyles();
  const [form, setFormValues] = useState(formDefault);
  const [accessibilityResources, setAccessibilityResources] = useState(
    accessibilityResourcesDefault,
  );
  const [laboratorios, setLaboratorios] = React.useState([]);
  const [vagas, setVagas] = React.useState(vagasFormDefault);
  const [checked, setChecked] = React.useState(false);
  const [step, setStep] = useState(1);
  const stepMax = 4;

  const updateField = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  };

  const save = async () => {
    try {
      const formConfigId = window.location.pathname.split('/')[2];
      const res = await apiService.request('put', 'form/' + formConfigId, {
        data: form,
      });
    } catch (error) {
      alert('Erro ao salvar formulário');
    }
  };

  const nextStep = () => {
    setStep(step < stepMax - 1 ? step + 1 : stepMax);
  };

  const prevStep = () => {
    setStep(step > 1 ? step - 1 : step);
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

  const handleChangeMatutino = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    name = e.target.name;
    setVagas(prevState => ({
      ...prevState,
      matutino: {
        ...vagas.matutino,
        [name]: value,
      },
    }));
  };

  const handleChangeVespertino = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    name = e.target.name;
    setVagas(prevState => ({
      ...prevState,
      vespertino: {
        ...vagas.vespertino,
        [name]: value,
      },
    }));
  };

  const handleChangeNoturno = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    name = e.target.name;
    setVagas(prevState => ({
      ...prevState,
      noturno: {
        ...vagas.noturno,
        [name]: value,
      },
    }));
  };

  const handleChangeIntegral = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    name = e.target.name;
    setVagas(prevState => ({
      ...prevState,
      integral: {
        ...vagas.integral,
        [name]: value,
      },
    }));
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
        <Fade in={step === 1 ? true : false}>
          <div>
            {step === 1 && (
              <FormCursoDetails
                form={form}
                handleChange={updateField}
                nextStep={nextStep}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 2 ? true : false}>
          <div>
            {step === 2 && (
              <TableVagas
                vagas={vagas}
                setVagas={setVagas}
                handleChangeMatutino={handleChangeMatutino}
                handleChangeVespertino={handleChangeVespertino}
                handleChangeNoturno={handleChangeNoturno}
                handleChangeIntegral={handleChangeIntegral}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 3 ? true : false}>
          <div>
            {step === 3 && (
              <TableAccessibilityResources
                tableLabel="Recursos de tecnologia assistiva disponíveis às pessoas com deficiência "
                resources={accessibilityResources}
                setResources={setAccessibilityResources}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 4 ? true : false}>
          <div>
            {step === 4 && (
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
            )}
          </div>
        </Fade>
      </form>

      <div className={classes.buttonsSteps}>
        <Button
          variant="contained"
          onClick={prevStep}
          disabled={step <= 1}
          className={classes.buttonStep}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={nextStep}
          disabled={step == stepMax}
          className={classes.buttonStep}
        >
          Próximo
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={save}
          disabled={step != stepMax}
          className={classes.buttonStep}
        >
          Salvar
        </Button>
      </div>
    </div>
  );
}

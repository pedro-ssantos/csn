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
  nome: '',
  codigoeMec: '',
  nivelAcademico: '',
  grauAcademico: '',
  atributoIngresso: '',
  modalidadeEnsino: '',
  alunoVinculado: '',
  situacaoFuncionamento: '',
  tipoOferta: '',
  teveAlunoVinculado: '',
  vagas: {},
  recursosAcessibilidade: {},
  laboratorios: [],
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
  const [step, setStep] = useState(1);
  const stepMax = 4;

  const updateField = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormValues({
      ...form,
      [e.target.name]: value,
    });
  };

  const save = async () => {
    try {
      const formConfigId = window.location.pathname.split('/')[2];
      console.log('Se garantir condições para pessoas com deficiencias, validar os radios')
      console.log('Se não garantir condições para pessoas com deficiencias, limpar os radios')
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
        console.log('formDb', formDb)
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
        formDefaultNew.vagas = formDb.vagas;
        formDefaultNew.laboratorios = formDb.laboratorios;
        setFormValues(formDefaultNew);
        console.log('formDefaultNew', formDefaultNew)
      } catch (error) {
        alert('Formulário desconhecido');
      }
    }
    getForm();
  }, []);

  const handleChangeVagas = vagas => {
    setFormValues(prevState => ({
      ...prevState,
      ['vagas']: vagas,
    }));
  };

  const handleChangeRecursosAcessibilidade = recursos => {
    setFormValues(prevState => ({
      ...prevState,
      ['recursosAcessibilidade']: recursos,
    }));
  };

  const handleChangeLaboratorio = e => {
    const value = e.target.value;
    name = e.target.name;
    setFormValues(prevState => ({
      ...prevState,
      laboratorios: value,
    }));
  };

  const printForm = e => {
    console.log(form);
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
                vagas={form.vagas}
                handleChangeVagas={handleChangeVagas}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 3 ? true : false}>
          <div>
            {step === 3 && (
              <TableAccessibilityResources
                tableLabel="Recursos de tecnologia assistiva disponíveis às pessoas com deficiência "
                recursosAcessibilidade={form.recursosAcessibilidade}
                handleChangeRecursosAcessibilidade={handleChangeRecursosAcessibilidade}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 4 ? true : false}>
          <div>
            {step === 4 && (
              <ChipSelect
                laboratorios={form.laboratorios}
                handleChange={handleChangeLaboratorio}
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

        <Button
          variant="contained"
          color="primary"
          onClick={printForm}
          className={classes.buttonStep}
        >
          Form
        </Button>
      </div>
    </div>
  );
}
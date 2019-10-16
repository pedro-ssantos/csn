import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './style.scss';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Fade 
} from '@material-ui/core';
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
  const [dialogErrors, setDialogErrors] = useState([]);
  const [dialogErrorsOpen, setDialogErrorsOpen] = useState(false);
  const stepMax = 4;
  const resourcesOptions = [
    { name: 'braile', label: 'Material em braille' },
    { name: 'informaticaAcessivel', label: 'Recursos de informática acessível' },
    { name: 'materialTatil', label: 'Material pedagógico tátil' },
    { name: 'tradutorSinais', label: 'Tradutor e intérprete de língua brasileira de sinais' },
    { name: 'materialSinais', label: 'Material didático em língua brasileira de sinais' },
    { name: 'materialImpressoAcessivel', label: 'Material didático em formato impresso acessível' },
    { name: 'materialAudio', label: 'Material em áudio' },
    { name: 'materialCaractereAmpliado', label: 'Material em formato impresso em caractere ampliado' },
    { name: 'recursoAcessComunicacao', label: 'Recursos de acessibilidade à comunicação' },
    { name: 'guiaInterprete', label: 'Guia intérprete' },
    { name: 'insercaoDisciplinaSinais', label: 'Inserção da disciplina de língua brasileira de sinais no curso' },
    { name: 'materialDigitalAcessivel', label: 'Material didático digital acessível' },
  ];

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
      adjustForm(form);
      const formConfigId = window.location.pathname.split('/')[2];
      const res = await apiService.request('put', 'form/' + formConfigId, {
        data: form,
      });
    } catch (errors) {
      // console.log(errors);
      setDialogErrors(errors);
      setDialogErrorsOpen(true);
      // alert('Erro ao salvar formulário');
    }
  };

  const adjustForm = (obj) => {
    let errors = [];

    // Deficiencia
    if (obj.recursosAcessibilidade.possui == 'Sim') {
      for (const [field, value] of Object.entries(obj.recursosAcessibilidade)) {
        if (field != 'possui' && value == null) {
          for (let option of resourcesOptions) {
            if (field == option.name) {
              errors.push('Campo '+option.label+' não preenchido');
            }
          }
        }
      }
    } else {
      console.log('Se não garantir condições para pessoas com deficiencias, limpar os radios')
    }
    if (errors.length > 0) {
      throw errors;
    }
  }

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
        formDefaultNew.vagas = formDb.vagas;
        formDefaultNew.laboratorios = formDb.laboratorios;
        setFormValues(formDefaultNew);
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
                options={resourcesOptions}
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

      <Dialog
        open={dialogErrorsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'md'}
      >
        <DialogTitle id="alert-dialog-title">Ops... encontramos os seguintes erros:</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogErrors.map(error => (
              <div>{error}</div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogErrorsOpen(false)} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
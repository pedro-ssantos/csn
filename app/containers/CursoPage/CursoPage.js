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
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TableVagas from './../../components/TableVagas';
import ChipSelect from './../../components/ChipSelect';
import Snackbar from './../../components/Snackbar';
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
  const [profile, setProfile] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [saveDialog, setSaveDialog] = useState(false);
  const stepMax = 4;
  const reNum = /^[0-9\b]+$/;
  const resourcesOptions = [
    { name: 'braile', label: 'Material em braille' },
    {
      name: 'informaticaAcessivel',
      label: 'Recursos de informática acessível',
    },
    { name: 'materialTatil', label: 'Material pedagógico tátil' },
    {
      name: 'tradutorSinais',
      label: 'Tradutor e intérprete de língua brasileira de sinais',
    },
    {
      name: 'materialSinais',
      label: 'Material didático em língua brasileira de sinais',
    },
    {
      name: 'materialImpressoAcessivel',
      label: 'Material didático em formato impresso acessível',
    },
    { name: 'materialAudio', label: 'Material em áudio' },
    {
      name: 'materialCaractereAmpliado',
      label: 'Material em formato impresso em caractere ampliado',
    },
    {
      name: 'recursoAcessComunicacao',
      label: 'Recursos de acessibilidade à comunicação',
    },
    { name: 'guiaInterprete', label: 'Guia intérprete' },
    {
      name: 'insercaoDisciplinaSinais',
      label: 'Inserção da disciplina de língua brasileira de sinais no curso',
    },
    {
      name: 'materialDigitalAcessivel',
      label: 'Material didático digital acessível',
    },
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

      if (res.status === 200) {
        console.log('Salvando ...');
        setSaveDialog(true);
        console.log('Salvo com sucesso.');
      }
    } catch (errors) {
      setDialogErrors(errors);
      setDialogErrorsOpen(true);
      // alert('Erro ao salvar formulário');
    }
  };

  const adjustForm = (obj = form) => {
    let errors = [];

    //Vagas por Turnos
    obj = form;
    if (obj.vagas) {
      for (let [turno, campos] of Object.entries(obj.vagas)) {
        if (campos.status === true) {
          for (let [campo, value] of Object.entries(campos)) {
            if (value == '') {
              //console.log('Campo ' + campo + ' Turno: ' + turno + ' não preeenchido');
              errors.push(
                'Campo ' + campo + ' ,Turno: ' + turno + ' não preenchido!',
              );
            }
          }
        }
      }
    }

    // Acessibilidade
    if (obj.recursosAcessibilidade.possui == 'Sim') {
      for (const [field, value] of Object.entries(obj.recursosAcessibilidade)) {
        if (field != 'possui' && value == null) {
          for (let option of resourcesOptions) {
            if (field == option.name) {
              errors.push('Campo ' + option.label + ' não preenchido');
            }
          }
        }
      }
    } else {
      console.log(
        'Se não garantir condições para pessoas com deficiencias, limpar os radios',
      );
    }
    if (errors.length > 0) {
      throw errors;
    }
  };

  const nextStep = () => {
    switch (step) {
      case 1:
        if (canSee('tableVagas')) {          
          setStep(2);
          break;
        } else if (canSee('acessibilityResources')) {
          setStep(3);
          break;
        } else if (canSee('laboratorios')) {
          setStep(4);
          break;
        }
      case 2:
        if (canSee('acessibilityResources')) {
          setStep(3);
          break;
        } else if (canSee('laboratorios')) {
          setStep(4);
          break;
        }
      case 3:
        if (canSee('laboratorios')) {
          setStep(4);
        }
      default:
        break;
    }
  };

  const prevStep = () => {
    switch (step) {
      case 4:
        if (canSee('acessibilityResources')) {
          setStep(3);
          break;
        } else if (canSee('tableVagas')) {
          setStep(2);
          break;
        } else {
          setStep(1);
          break;
        }
      case 3:
        if (canSee('tableVagas')) {
          setStep(2);
          break;
        } else {
          setStep(1);
          break;
        }
      default:
        setStep(step > 1 ? step - 1 : step);
    }
  };

  /**
   * É a última aba do cliente.
   */
  const isLast = () => {
    switch (step) {
      case 1:
        if (
          !canSee('tableVagas') &&
          !canSee('acessibilityResources') &&
          !canSee('laboratorios')
        ) {
          return true;
        }
        return false;
      case 2:
        if (!canSee('acessibilityResources') && !canSee('laboratorios')) {
          return true;
        }
        return false;
      case 3:
        if (!canSee('laboratorios')) {
          return true;
        }
        return false;
      default:
        return false;
    }
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
        let perm = resFormConfig.data.fields;
        let prof = resFormConfig.data.responsible;
        setProfile(prof);
        setPermissions(perm);

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
        formDefaultNew.recursosAcessibilidade = formDb.recursosAcessibilidade;
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

  const canSee = fieldId => {
    if (profile === 'pei' || permissions.map(arr => arr.id).includes(fieldId)) {
      return true;
    }
    return false;
  };

  const canEdit = fieldId => {
    if (
      profile === 'pei' ||
      permissions
        .filter(arr => arr.permission === 'update')
        .map(arr => arr.id)
        .includes(fieldId)
    ) {
      return 'update';
    }
    return 'read';
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
                hasPermission={canSee}
                canEdit={canEdit}
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
                hasPermission={canSee}
                canEdit={canEdit}
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
                handleChangeRecursosAcessibilidade={
                  handleChangeRecursosAcessibilidade
                }
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
          disabled={step == stepMax || isLast()}
          className={classes.buttonStep}
        >
          Próximo
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={step != stepMax && !isLast()}
          className={classes.buttonStep}
          onClick={save}
        >
          Salvar
        </Button>

        <Snackbar
          open={saveDialog}
          message={"Informações gravadas com sucesso!"}
        />

      </div>

      <Dialog
        open={dialogErrorsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">
          Ops... encontramos os seguintes erros:
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogErrors.map(error => (
              <div>{error}</div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDialogErrorsOpen(false)}
            color="primary"
            autoFocus
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

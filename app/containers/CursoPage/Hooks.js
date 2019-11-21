import { useEffect, useState } from 'react';
import './style.scss';
import apiService from './../../services/apiService';

const useForm = formDefault => {
  const [profile, setProfile] = useState('');
  const [permissions, setPermissions] = useState([]);
  const [form, setFormValues] = useState(formDefault);
  const [step, setStep] = useState(1);
  const stepMax = 4;
  const [dialogErrors, setDialogErrors] = useState([]);
  const [dialogErrorsOpen, setDialogErrorsOpen] = useState(false);

  //Fetch data from server and set profile and permissions.
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
  }, [formDefault]);

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
        setSnackbar(true);
        setStep(1);
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
        if (canSee('accessibilityResources')) {
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

  return {
    profile,
    setProfile,
    permissions,
    setPermissions,
    form,
    setFormValues,
    updateField,
    save,
    adjustForm,
    nextStep,
    prevStep,
    isLast,
    handleChangeVagas,
    handleChangeLaboratorio,
    handleChangeRecursosAcessibilidade,
    canSee,
    canEdit,
    step,
    stepMax,
    dialogErrors,
    setDialogErrors,
    dialogErrorsOpen,
    setDialogErrorsOpen,
  };
};

export default useForm;

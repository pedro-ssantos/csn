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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CustomizedSnackbars from './../../components/CustomizedSnackbars';
import apiService from './../../services/apiService';
import CursoForm from './CursoForm';
import ButtonsGroup from './ButtonsGroup';

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
  const [snackbar, setSnackbar] = useState(false);
  const stepMax = 4;
  const resourcesOptions = [
    {
      name: 'braile',
      label: 'Material em braille',
      instrucoes:
        'Material didático com características de fonte, corpo, número de caracteres, entrelinhas, espaços entre as palavras e as letras, cor do papel e da tinta, opacidade do papel e das ilustrações que viabilizem sua utilização com autonomia por parte da pessoa com baixa visão.',
    },
    {
      name: 'informaticaAcessivel',
      label: 'Recursos de informática acessível',
      instrucoes:
        'Recursos que permitam adaptações com a finalidade de possibilitar a interação, no computador, de alunos com diferentes graus de comprometimento motor e/ou de comunicação e linguagem, em processos de ensino e aprendizagem. Exemplos: tela sensível ao toque, ou ao sopro, detector de ruídos, programas especiais de computador, etc.',
    },
    {
      name: 'materialTatil',
      label: 'Material pedagógico tátil',
      instrucoes:
        'Recursos pedagógicos que permitem ou facilitam o aprendizado de pessoas com deficiencia visual.',
    },
    {
      name: 'tradutorSinais',
      label: 'Tradutor e intérprete de língua brasileira de sinais',
      instrucoes:
        'Profissional especializado em serviços de tradução/ interpretação, que possam intermediar informações, com qualidade e profissionalismo, entre surdos e ouvintes.',
    },
    {
      name: 'materialSinais',
      label: 'Material didático em língua brasileira de sinais',
      instrucoes:
        'Material didático elaborado em língua brasileira de sinais para o ensino de surdos.',
    },
    {
      name: 'materialImpressoAcessivel',
      label: 'Material didático em formato impresso acessível',
      instrucoes:
        'Material didático com características de fonte, corpo, número de caracteres, entrelinhas, espaços entre as palavras e as letras, cor do papel e da tinta, opacidade do papel e das ilustrações que viabilizem sua utilização com autonomia por parte da pessoa com baixa visão.',
    },
    {
      name: 'materialAudio',
      label: 'Material em áudio',
      instrucoes:
        'Materiais gravados com voz humana em diferentes mídias que amplia às pessoas cegas e com baixa visão as possibilidades de acesso a diversos conteúdos. Exemplo: áudio livro.',
    },
    {
      name: 'materialCaractereAmpliado',
      label: 'Material em formato impresso em caractere ampliado',
      instrucoes:
        'Material impresso em caracteres maiores que o usual a fim de possibilitar o acesso a pessoas com deficiências visuais.',
    },
    {
      name: 'recursoAcessComunicacao',
      label: 'Recursos de acessibilidade à comunicação',
      instrucoes:
        'Compreendem recursos que possibilitem a eliminação de barreiras na disponibilidade de comunicação, tanto de conteúdo quanto de apresentação da informação, possibilitando que o aluno tenha acesso à informação e ao conhecimento, independentemente de sua limitação. Exemplo: acervo bibliográfico em formato acessível ao estudante com deficiência (caracteres em Braille ou em formatos alternativos),  tais como lupas, prancha de comunicação, presença de intérprete de Libras, softwares de leitura, teclado virtual, dentre outros.',
    },
    {
      name: 'guiaInterprete',
      label: 'Guia intérprete',
      instrucoes:
        'Profissional que domina diversas formas de comunicação utilizadas pelas pessoas com surdocegueira, podendo fazer interpretação ou transliteração.',
    },
    {
      name: 'insercaoDisciplinaSinais',
      label: 'Inserção da disciplina de língua brasileira de sinais no curso',
      instrucoes:
        'Oferecimento da matéria língua brasileira de sinais pelo curso.',
    },
    {
      name: 'materialDigitalAcessivel',
      label: 'Material didático digital acessível',
      instrucoes:
        'Compreende o uso de computador com programas e aplicativos que auxiliem o aluno no acesso ao material didático, bem como ao acervo bibliográfico referente ao projeto pedagógico do curso, tais como aplicações que leiam textos e utilizem sintetizadores de voz para o acesso aos conteúdos didáticos, bem como softwares de leitura para pessoas com baixa visão, teclado virtual, dentre outros.',
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

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar(false);
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

      <CursoForm
        step={step}
        form={form}
        updateField={updateField}
        nextStep={nextStep}
        canSee={canSee}
        canEdit={canEdit}
        handleChangeVagas={handleChangeVagas}
        resourcesOptions={resourcesOptions}
        handleChangeRecursosAcessibilidade={handleChangeRecursosAcessibilidade}
        handleChangeLaboratorio={handleChangeLaboratorio}
      />

      <div className={classes.buttonsSteps}>
        <ButtonsGroup
          prevStep={prevStep}
          nextStep={nextStep}
          step={step}
          stepMax={stepMax}
          save={save}
          isLast={isLast}
        />
      </div>

      <CustomizedSnackbars
        open={snackbar}
        message={'Informações gravadas com sucesso!'}
        variant="success"
        handleClose={handleSnackbarClose}
      />

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
